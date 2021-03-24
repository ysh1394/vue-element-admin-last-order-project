<template>
  <div>
    <!-- '삭제테스트','추가테스트' >> API 변경 후, 삭제 예정 -->
    <!-- <button @click="deleteData">삭제 테스트</button> -->
    <!-- <button @click="addData">추가 테스트</button> -->
    <div class="app-container">
      <div class="section">
        <el-form class="filter-container">
          <div>
            <el-input
              v-model="listQuery.s"
              type="text"
              class="filter-item search-input input-with-select"
              placeholder="검색어를 입력해주세요"
            >
              <el-button
                slot="append"
                class="barcode-check-btn"
                icon="el-icon-search"
                type="primary"
                @click="handleSearch"
              >
                검색
              </el-button>
            </el-input>
          </div>
          <router-link
            :to="{ name: 'create' }"
            exact
          >
            <el-button>
              <i class=" el-icon-circle-plus-outline" />
              글쓰기
            </el-button>
          </router-link>
        </el-form>
      </div>
      <div class="section table-area">
        <el-table
          ref="multipleTable"
          v-loading="listLoading"
          :data="list"
          fit
          stripe
          highlight-current-row
          style="width: 100%;"
          @sort-change="sortChange"
        >
          <el-table-column
            label="No"
            prop="id"
            align="center"
            :min-width="5"
            sortable="custom"
            :class-name="getSortClass('id')"
          >
            <template slot-scope="{ row }">
              <router-link
                :to="{ name: 'detail', params: { contentId: row.id }}"
                exact
              >{{ row.id }}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            label="작성일"
            prop="date"
            align="center"
            :min-width="10"
          >
            <template slot-scope="{ row }">
              <router-link
                :to="{ name: 'detail', params: { contentId: row.id }}"
                exact
              >{{ row.display_time }}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="제목" :min-width="30" align="center">
            <template slot-scope="{ row }">
              <router-link
                :to="{ name: 'detail', params: { contentId: row.id }}"
                exact
              >{{ row.title }}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="작성자" align="center" :min-width="10">
            <template slot-scope="{ row }">
              <router-link
                :to="{ name: 'detail', params: { contentId: row.id }}"
                exact
              >{{ row.author }}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="파일명" align="center" :min-width="15">
            <template slot-scope="{ row }">
              <router-link
                :to="{ name: 'detail', params: { contentId: row.id }}"
                exact
              >{{ row.content }}</router-link>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <pagination
            v-show="total>0"
            layout="prev, pager, next"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Notices',
  components: { Pagination },

  data() {
    console.log("**index.vue** data 안쪽 this.list >>>>", this.list)
    return {
    }
  },

  computed: {
    ...mapState('notices', [
      'list',
      'searchList',
      'listLoading',
      'total',
      'tableKey',
      'listQuery',
      'sortOptions'
    ])
  },

  created() {
    console.log("**index.vue** created 안쪽 위 this.list >>>>", this.list)
    this.getList()
    console.log("**index.vue** created 안쪽 아래 this.list >>>>", this.list)
  },

  methods: {

    ...mapActions('notices', [
      'getList',
      'handleSearch',
      'sortChange',
      'setLocalStorage'
    ]),

    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },

    deleteData() {
      // 테스트 용 함수 (테스트 완료 후 삭제 예정)
      this.$store.state.notices.list.splice(this.index, 1)
      console.log("delete 후 this.list >>>>", this.$store.state.notices.list)
      console.log("delete 후 this.total >>>>", this.$store.state.notices.total)
    },

    addData() {
      // 테스트 용 함수 (테스트 완료 후 삭제 예정)
      this.$store.state.notices.list.unshift(
        {
          id: "test",
          author: "author test"
        }
      )
      this.setLocalStorage()
      console.log("add 후 this.list >>>>", this.$store.state.notices.list)
      console.log("add 후 this.total >>>>", this.$store.state.notices.total)
    }

    // getList() {
    //   this.$store.dispatch('notices/getList')
    // },

    // getList() {
    //   this.$store.state.notices.listLoading = false
    //   fetchList(this.$store.state.notices.listQuery).then(response => {
    //     this.$store.state.notices.list = response.data.items
    //     this.$store.state.notices.total = response.data.total
    //     this.$store.state.notices.listLoading = true
    //     console.log("메인 화면 this.$store.state.notices.list >>>", this.$store.state.notices.list)
    //   })
    //   setTimeout(() => {
    //     this.$store.state.notices.listLoading = false
    //   }, 1.5 * 1000)
    // },

    // handleSearch() {
    //   if (this.$store.state.notices.listQuery.s) {
    //     this.$store.state.notices.searchList = this.$store.state.notices.list.filter((data) => {
    //       return data.title.toLowerCase().includes(this.$store.state.notices.listQuery.s)
    //     })
    //     this.$store.state.notices.listQuery.s = ""
    //     this.$store.state.notices.list = this.$store.state.notices.searchList
    //   } else {
    //     return this.getList()
    //   }
    // },
    // handleFilter() {
    //   this.$store.state.notices.listQuery.page = 1
    //   this.getList()
    // },
    // sortChange(data) {
    //   const { prop, order } = data
    //   if (prop === 'id') {
    //     this.sortByID(order)
    //   }
    // },
    // sortByID(order) {
    //   if (order === 'ascending') {
    //     this.$store.state.notices.listQuery.sort = '+id'
    //   } else {
    //     this.$store.state.notices.listQuery.sort = '-id'
    //   }
    //   this.handleFilter()
    // },
  }
}
</script>

<style>

*{
  border: 0;
  margin: 0;
  padding: 0;
}

div.cell {
  overflow: hidden;
  height: 25px;
}

/* 글쓰기 버튼 */
button.el-button.el-button--default {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
}

/* 검색 부분 최상위 */
div.section form.el-form.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 50px 0px;
  padding: 0;
}

/* 검색 부분 최상위 다음 */
div.section form.el-form.filter-container div{
  width: 70%;
  margin: 0;
}

/* 검색 부분 최상위 다음 다음 */
div.filter-item.search-input.input-with-select.el-input.el-input-group.el-input-group--append {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.el-input-group__append {
  background-color: transparent;
  border: transparent;
}

input.el-input__inner{
  max-width: 100%;
  min-width: 100px;
  height: 35px;
  display: none;
}

button.el-button.barcode-check-btn.el-button--primary {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 35px;
  margin-left: 5px;
  background-color: white;
  border : #e3e3e3 solid 1px;
}

div.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
}

</style>
