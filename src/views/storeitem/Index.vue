
<template>
  <div class="app-container">
    <!-- TODO: 검색기능 API 및 필터 추가 -->
    <search-bar
      :searching="listLoading"
      :franchisee-category-options="franchiseeCategoryOptions"
      @search="submitSearch"
    />

    <!-- TODO: 내용 필요한지 확인 -->
    <el-card class="box-card">
      <el-row type="flex" justify="end">
        <el-button
          class="filter-item mg-left-10"
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="$router.push({ name: 'StoreItemsCreate' })"
        >
          등록
        </el-button>

        <el-button
          class="filter-item mg-left-10"
          size="small"
          icon="el-icon-upload2"
          @click="$router.push({ name: 'StoreItemsCsv'})"
        >
          여러개 추가
        </el-button>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <!-- TODO: select action -->
      <!-- <select-action v-if="onlyDelete" :select-actions="restoreActions" @select="handleSelectAction" />
            <select-action v-else :select-actions="selectActions" @select="handleSelectAction" /> -->

      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        fit
        class="width-100"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="45" fixed />

        <el-table-column prop="id" label="상품번호" sortable="custom" align="center" width="100">
          <template slot-scope="{row}">
            <router-link
              :to="{ name: 'StoreItemsUpdate', params: { id: row.id }}"
              class="link-type"
            >
              {{ row.id }}
            </router-link>
          </template>
        </el-table-column>

        <el-table-column prop="franchisee_category_id" label="분류" align="center" width="120">
          <template slot-scope="{row}">
            <span v-if="row.franchisee_category_id">{{ franchiseeCategoryLabel[row.franchisee_category_id] }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="supplier_code" label="바코드" align="center" width="140" />

        <!-- TODO: 이미지 컬럼 추가 -->

        <el-table-column label="상품명" header-align="center" align="left" min-width="220">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="original_price" label="원가" align="center" width="100">
          <template slot-scope="{row}">
            <span class="font-r14">{{ row.original_price | numberFormat }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="price" label="판매가" align="center" width="100">
          <template slot-scope="{row}">
            <span class="font-r14">{{ row.price | numberFormat }}</span>
          </template>
        </el-table-column>

        <el-table-column label="할인율" align="center" width="100">
          <template slot-scope="{row}">
            <span>{{ row.original_price | discountRate(row.price) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="등록일" align="center" width="160">
          <template slot-scope="{row}">
            <span>{{ $moment(row.created_at).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="onlyDelete" label="삭제일" align="center" width="160">
          <template slot-scope="{row}">
            <span>{{ $moment(row.deleted_at).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="20"
          :current-page.sync="listQuery.page"
          @current-change="getList"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import waves from '@/directive/waves'
// import { fetchList, fetchExport, fetchImport, fetchDelete, fetchRestore, fetchCategoryList } from '@/api/items'
import { fetchStoreItems } from '@/api/storeItems.js'
// import { mapGetters } from 'vuex'
// import { baseException } from '@/utils/exception'
// import { Message } from 'element-ui'
import SearchBar from './SearchBar'

export default {
  components: {
    SearchBar
  },
  directives: { waves },
  filters: {
    numberFormat(value) {
      // eslint-disable-next-line no-new-wrappers
      const num = new Number(value)
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    },
    discountRate(original_price, price) {
      let discountRate = 0
      if (original_price > 0) {
        discountRate = Number.isInteger(((original_price - price) / original_price * 100))
          ? ((original_price - price) / original_price * 100)
          : ((original_price - price) / original_price * 100).toFixed(2)
      }

      return discountRate
    }
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      franchiseeOptions: [],
      franchiseeLabel: {},
      franchiseeCategoryOptions: [],
      franchiseeCategoryLabel: {},
      total: 0,
      listLoading: false,
      onlyDelete: false,
      listQuery: {
        page: 1,
        limit: 25,
        sort: ''
      },
      editAll: false,
      postForm: [],
      multipleSelectionId: [],
      selectActions: [
        {
          label: '삭제',
          value: 'delete',
          confirm: true
        }
      ],
      restoreActions: [
        {
          label: '삭제복구',
          value: 'restore',
          confirm: true,
          confirm_message: '삭제복구를 진행할까요?'
        }
      ]
    }
  },
  computed: {
    // ...mapGetters({
    //     getList: 'getList'
    // })
  },
  watch: {
    allCheckBtn(val) {
      this.allCheckBtn = val
      this.list.forEach((item) => {
        item.selected = val
      })
    }
  },
  created() {
    // Get List Data
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const result = await fetchStoreItems(this.listQuery)
      if (result) {
        console.log('fetchStoreItems result', result)
        this.list = result.data
        this.total = result.count
        // this.franchiseeCategoryOptions = result.data.franchisee_categories

        // result.data.franchisee_categories.forEach((item) => {
        //     let label = item.category_a_name
        //     if (item.category_b_name) {
        //         label += `/${item.category_b_name}`
        //     }
        //     this.franchiseeCategoryLabel[item.id] = label
        // })
      }

      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectionChange(val) {
      const selectionId = []
      val.forEach((element) => selectionId.push(element.id))
      this.multipleSelectionId = selectionId
    },
    handleSelectAction(data) {
      const action = data.action
      if (this.multipleSelectionId.length) {
        if (action === 'delete') {
          this.deleteSelection()
        } else if (action === 'restore') {
          // eslint-disable-next-line camelcase
          this.updateSelection({ item_status: 'restore' })
        }
      }
    },
    async deleteSelection() {
      // TODO: api
      this.listLoading = true
      // await api.destroy({ id: this.multipleSelectionId })
      this.listLoading = false

      await this.getList()
    },
    async updateSelection(update) {
      // TODO: api
      this.listLoading = true
      // await api.updateAll({
      //     id: this.multipleSelectionId,
      //     ...update
      // })
      this.listLoading = false

      await this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (order === 'ascending') {
        this.listQuery.sort = `+${prop}`
      } else {
        this.listQuery.sort = `-${prop}`
      }

      this.handleFilter()
    },
    submitSearch(searchData) {
      this.onlyDelete = searchData.only_delete === 1
      this.listQuery = {
        ...this.listQuery,
        ...searchData
      }
      this.handleFilter()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
    .search-input {
        width: 30%;
    }
}
</style>
