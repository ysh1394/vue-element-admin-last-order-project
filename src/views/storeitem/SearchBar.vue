<template>
  <el-card class="box-card filter-container">
    <el-row :gutter="10">
      <el-col :xs="12" :sm="6" :lg="3" class="mg-bottom-10">
        <el-select
          v-model="searchData.status"
          size="small"
          class="width-100 select-box-scroll-30"
          filterable
          placeholder="상태"
        >
          <el-option
            v-for="item in statusFilter"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>

      <!-- <el-col :xs="12" :sm="6" :lg="3" class="mg-bottom-10">
        <el-select
          v-model="searchData.franchisee_categories"
          size="small"
          class="width-100 select-box-scroll-30"
          multiple
          filterable
          clearable
          placeholder="분류"
        >
          <el-option
            v-for="item in franchiseeCategoryOptions"
            :key="item.id"
            :label="item.category_b_name ? `${item.franchisee_code} ${item.category_a_name}/${item.category_b_name}` : `${item.franchisee_code} ${item.category_a_name}`"
            :value="item.id"
          />
        </el-select>
      </el-col> -->

      <!-- <el-col :xs="12" :sm="6" :lg="3" class="mg-bottom-10">
        <el-select
          v-model="searchData.date_filter"
          size="small"
          class="width-100"
          placeholder="기간조회조건"
        >
          <el-option
            v-for="item in dateFilter"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-model="searchData.start_at"
          size="small"
          type="datetime"
          placeholder="시작일"
          format="yyyy-MM-dd 00:00:00"
          value-format="yyyy-MM-dd 00:00:00"
          class="width-50"
        />
        <el-date-picker
          v-model="searchData.end_at"
          size="small"
          type="datetime"
          placeholder="종료일"
          format="yyyy-MM-dd 23:59:59"
          value-format="yyyy-MM-dd 23:59:59"
          class="width-50"
        />
      </el-col> -->

      <el-col :xs="12" :sm="6" :lg="3" class="mg-bottom-10">
        <el-row>
          <el-select
            v-model="searchData.search_filter"
            size="small"
            class="width-100"
          >
            <el-option
              v-for="item in searchFilter"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            v-model="searchData.search"
            size="small"
            placeholder="검색어를 입력하세요"
            class="filter-item"
            style="width: calc(100% - 40px); margin-right: 5px"
            @keyup.enter.native="submitSearch"
          />
          <el-button v-waves class="filter-item pd-left-10 pd-right-10 pd-top-8" type="primary" icon="el-icon-search" size="small" :disabled="searching" @click="submitSearch" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
// import waves from '@/directive/waves'

export default {
  props: {
    searching: {
      type: Boolean,
      'default': false
    },
    franchiseeCategoryOptions: {
      type: Array,
      'default': () => []
    }
  },
  //   directives: { waves },
  data() {
    return {
      searchData: {
        franchisee_categories: [],
        search_filter: 'store_items.name',
        search_operator: 'like',
        search: '',
        status: '',
        date_filter: 'store_items.created_at',
        start_at: null,
        end_at: null
      },
      statusFilter: [
        {
          label: '전체',
          value: 'all',
          operator: 'like'
        },
        {
          label: '운영중',
          value: 'ing',
          operator: 'equal'
        },
        {
          label: '삭제',
          value: 'deleted',
          operator: 'equal'
        }
      ],
      dateFilter: [
        {
          label: '등록일',
          value: 'store_items.created_at'
        }
      ],
      searchFilter: [
        {
          label: '상품명',
          value: 'store_items.name',
          operator: 'like'
        },
        {
          label: '상품번호',
          value: 'store_items.id',
          operator: 'equal'
        },
        {
          label: '바코드',
          value: 'store_items.supplier_code',
          operator: 'equal'
        }
      ]
    }
  },
  async created() {
    // TODO: vuex store 처리
    // const storageFilterData = this.getStorageFilterData()
    // if (storageFilterData) {
    //   this.objectMergeOnlyTargetAttributes(this.searchData, storageFilterData)
    // }
  },
  methods: {
    submitSearch() {
      if (!this.searching) {
        this.$emit('search', this.searchData)
      }
    }
  }
}
</script>
