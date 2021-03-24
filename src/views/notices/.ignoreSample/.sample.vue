<template>
    <div class="app-container">
        <div class="section">
            <el-form class="filter-container">
                <el-input
                    type="text"
                    class='filter-item search-input input-with-select'
                    placeholder="검색어를 입력해주세요"
                    v-model="listQuery.s"
                >
                <el-button
                    slot="append"
                    class="barcode-check-btn"
                    icon="el-icon-search"
                    type="primary"
                    @click="handleSearch()"
                >테스트</el-button>
                </el-input>
                <el-button @click="$router.push('/items/create')">
                    <i class="el-icon-circle-plus-outline"></i>
                    하나씩 추가
                </el-button>
                <el-button @click="$router.push('/items/csv')">
                    <i class="el-icon-upload"></i>
                    여러개 추가
                </el-button>
            </el-form>
        </div>

        <div class="section table-area">
            <el-table
                ref="multipleTable"
                :key="tableKey"
                :data="list"
                v-loading="listLoading"
                fit
                stripe
                highlight-current-row
                style="width: 100%;"
            >
                <el-table-column label="상품번호" align="center" :min-width="15">
                    <template slot-scope="{ row }">
                        <router-link :to="{ name: 'ItemsUpdate', params: { id: row.id }}" exact>{{ row.id }}</router-link>
                    </template>
                </el-table-column>
                <el-table-column label="분류" align="center" :min-width="10" sortable>
                    <template slot-scope="{ row }">
                        <span>{{ row.franchisee_category_id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="상품명" :min-width="30">
                    <template slot-scope="{ row }">
                        <span>{{ row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="기본가" align="center" :min-width="10" sortable>
                    <template slot-scope="{ row }">
                        <span style="color: red;">
                            {{ row.original_price | numberFormat }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="판매가" align="center" :min-width="10" sortable>
                    <template slot-scope="{ row }">
                        <span style="color: red;">{{ row.price | numberFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="할인율" align="center" :min-width="10">
                    <template slot-scope="{ row }">
                        <span>{{ row.original_price | discountRate(row.price) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="상품삭제/복구"
                    align="center"
                    :min-width="15"
                >
                    <template slot-scope="{ row }">
                        <el-button
                            v-show="row.deleted_at == null" type="danger" round size="mini"
                            @click="handleDelete(row)"
                        >
                            삭제
                        </el-button>
                        <el-button
                            v-show="row.deleted_at != null" size="mini" round
                            @click="handleRestore(row)"
                        >
                            복구
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="handleGetList"
                    :current-page.sync="listQuery.page"
                    :page-size="20"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchList, fetchExport, fetchImport, fetchDelete, fetchRestore, fetchCategoryList } from '@/api/items'
import { getItemList } from '@/api/items'

import { mapGetters } from 'vuex'
import { baseException } from '@/utils/exception'
import { Message } from 'element-ui'
// import ListItem from './components/ListItem';

export default {
    data() {
        return {
            period: '',
            tableKey: 0,
            list: [],
            total: 0,
            listLoading: false,
            listQuery: {
                page: 1,
                limit: 20,
                // importance: undefined,
                s: ''
                // type: undefined,
                // sort: '+id'
            }
        }
    },
    components: {
        // ListItem,
    },
    filters: {
        numberFormat(value) {
            const num = new Number(value)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
        },
        discountRate(value, p) {
            const oo = new Number(value)
            const pp = new Number(p)
            // return pp/oo
            return (100 - (pp / oo) * 100).toFixed(1)
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
        // this.$EventBus.$emit('on:loading')

        // Get List
        this.handleGetList()
    },
    mounted() {
        // // TODO
        // this.handleGetCategory()

        // window.addEventListener('scroll', this.onScroll);
        // this.$EventBus.$emit('off:loading')
    },
    destroyed() {
        // window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
        handleGetCategory(e) {
            fetchCategoryList().then((response) => {
                console.log(response)
                this.categories = response.data
            })
        },
        async handleGetList() {
            this.listLoading = true
            const result = await getItemList(this.listQuery)
            console.log('getItemList result', result)
            if (result) {
                this.list = result.data.items
                this.total = result.data.pagination.total
            }

            // Just to simulate the time of the request
            setTimeout(() => {
                this.listLoading = false
            }, 1.5 * 1000)
        },
        handleSearch() {
            this.handleGetList()
        },
        handleDelete(item) {
            if (item.deleted_at) {
                Message.error('이미 삭제된 상품')
                return
            }

            const $this = this
            fetchDelete(item.id).then((response) => {
                console.log(response)

                if (response.code != 'S0000') {
                    Message.error('삭제할 수 없습니다.')
                    return
                }

                console.log(this.list)

                // let k = null
                this.list.forEach((it, i) => {
                    if (it.id == item.id) {
                        it.deleted_at = new Date().getTime
                        Message.success('삭제되었습니다')
                    }
                })
            })
        },
        handleRestore(item) {
            if (!item.deleted_at) {
                Message.error('이미 복구된 상품')
                return
            }

            // TODO : 복구
            fetchRestore(item.id).then((response) => {
                console.log(response)

                if (response.code != 'S0000') {
                    Message.error('복구할 수 없습니다.')
                    return
                }

                this.list.map((it) => {
                    if (it.id == item.id) {
                        it.deleted_at = null
                        Message.success('복구되었습니다')
                    }
                })
            })
        },
        allCheck(args) {
            this.allCheckBtn = this.allCheckBtn == false
            this.storeItems.forEach((item) => {
                item.selected = this.allCheckBtn
            })
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