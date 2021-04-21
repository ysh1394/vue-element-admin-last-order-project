<template>
  <div class="mixin-components-container">
    <el-card v-loading="loading" class="box-card">
      <el-row slot="header" type="flex" align="middle" class="clearfix">
        <el-col :span="12">
          <el-tag v-if="isDeletedData" type="danger">삭제 데이터</el-tag>
          <span v-else class="font-20">{{ $route.meta.title }}</span>
        </el-col>
        <el-col :span="12" class="text-right">
          <el-button v-if="!isDeletedData" type="primary" @click="onSubmit">
            저장
          </el-button>
          <el-button @click="onCancel">
            취소
          </el-button>
        </el-col>
      </el-row>
      <el-form ref="postForm" :model="postForm" :rules="rules" label-position="top" :disabled="isDeletedData" class="overflow-y pd-right-5">
        <el-form-item label="분류" prop="franchisee_category">
          <el-select
            v-model="postForm.franchisee_category"
            filterable
            class="width-100"
            placeholder="선택해주세요"
            @change="selectFranchiseeCategory"
          >
            <!-- 아직 el-option 데이터 없음 -->
            <el-option
              v-for="item in franchisee_categories"
              :key="item.id"
              :label="`${item.franchisee_code} ${item.category_a_name}${item.category_b_name ? `/${item.category_b_name}` : ''}`"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="상품명" prop="name">
          <el-input
            v-model="postForm.name"
            placeholder="상품명을 입력해주세요"
          />
        </el-form-item>

        <el-form-item label="바코드" prop="supplier_code">
          <el-input
            v-model="postForm.supplier_code"
            placeholder="바코드를 입력해주세요"
          />
        </el-form-item>

        <el-form-item label="프랜차이즈 상품코드" prop="franchisee_goods_code">
          <el-input
            v-model="postForm.franchisee_goods_code"
            placeholder="프랜차이즈 상품코드를 입력해주세요"
          />
        </el-form-item>

        <el-form-item label="성인용 상품여부" prop="name">
          <el-radio-group v-model="postForm.is_adult">
            <el-radio :label="false">아니오</el-radio>
            <el-radio :label="true">예(19세 이상)</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="과세여부" prop="name">
          <el-radio-group v-model="postForm.is_tax">
            <el-radio :label="false">비과세</el-radio>
            <el-radio :label="true">과세</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-row>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="원래가격(원)" prop="original_price">
              <el-input-number
                v-model="postForm.original_price"
                controls-position="right"
                :min="0"
                :step="100"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="판매가격(원)" prop="price">
              <el-input-number
                v-model="postForm.price"
                controls-position="right"
                :min="0"
                :step="100"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="주문수량 제한 (1주문당)">
          <el-row>
            <el-col :xs="24" :sm="12" :md="8">
              <el-form-item label="최소수량" prop="min_sell_limit">
                <el-input-number
                  v-model="postForm.min_sell_limit"
                  controls-position="right"
                  :min="1"
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
              <el-form-item label="최대수량" prop="max_sell_limit">
                <el-input-number
                  v-model="postForm.max_sell_limit"
                  controls-position="right"
                  :min="1"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="상품 대표이미지">
          <img v-if="postForm.franchisee_code !== null" alt="상품 이미지" :src="images">
          <div v-else class="font-p12" style="line-height: 1rem">
            분류를 먼저 선택해야 업로드 가능합니다.<br>
          </div>

          <!-- <div v-if="postForm.franchisee_code === null" class="font-p12" style="line-height: 1rem">
                        분류를 먼저 선택해야 업로드 가능합니다.<br>
                    </div>
                    <img v-else alt="상품 이미지" src="postForm.thumbnail"/> -->
          <!-- <img v-else alt="상품 이미지" src="https://i.lastorder.in/franchisee/k7/items/211525.jpg"/> -->
          <!-- <bo-dropzone
                        :disabled="postForm.franchisee_code === null || isDeletedData"
                        id="storeItemImage"
                        :max-count="1"
                        :data-loaded="dataLoaded"
                        :images.sync="images"
                        :path="`franchisee/${postForm.franchisee_code}/items/`"
                    /> -->
        </el-form-item>

        <el-form-item label="상품 소개제목(선택입력)">
          <el-input
            v-model="postForm.description_title"
            placeholder="제목을 입력해주세요"
          />
        </el-form-item>

        <el-form-item label="상품 소개내용(선택입력)">
          <el-input
            v-model="postForm.description"
            type="textarea"
            :rows="4"
            placeholder="내용을 입력하세요"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { fetchStoreItemDetail, updateStoreItem } from '@/api/storeItems'
import FormRules from '@/rules/storeitem/index'
import { mapState } from 'vuex'
// import BoDropzone from '@/components/BoDropZone/DropZone'

export default {
  name: 'StoreItemForm',
  components: {
    // BoDropzone
  },
  mixins: [FormRules],
  props: {
    isEdit: {
      type: Boolean,
      'default': false
    }
  },
  data() {
    return {
      itemId: 0,
      isDeletedData: false,
      postForm: {
        franchisee_code: null,
        franchisee_goods_code: null,
        supplier_code: null,
        franchisee_category: null,
        tag: null,
        name: null,
        thumbnail: null,
        original_price: 0,
        price: 0,
        min_sell_limit: 1,
        max_sell_limit: 1,
        description_title: null,
        description: null,
        is_adult: false,
        is_tax: true
      },
      loading: true,
      dataLoaded: false,
      images: [],
      franchisee_categories: []
    }
  },
  computed: {
    ...mapState('storeitems', [
      'list',
      'listQuery'
    ])
  },
  watch: {
    images(value) {
      if (value && value.length > 0) {
        this.postForm.thumbnail = value[0].full_url
      } else {
        this.postForm.thumbnail = ''
      }
    }
  },
  created() {
    console.log(this.list)
    this.itemId = this.$route.params.id || 0
    this.getItem(this.itemId)
  },
  methods: {

    async getItem(id) {
      this.loading = true
      const { data } = await fetchStoreItemDetail(id)
      console.log('fetchStoreItemDetail data', data)

      // 입력/수정할 메인 데이터
      if (this.itemId > 0) {
        this.postForm = Object.assign(this.postForm, data)
        // this.selectFranchiseeCategory(this.postForm.franchisee_category)
        if (data.thumbnail) {
          this.images.push(data.thumbnail)
        }
        this.isDeletedData = data.deleted_at !== null
      } else {
        this.isDeletedData = true
      }
      this.loading = false
      this.dataLoaded = true
    },

    async postItem(id) {
      // // TODO: 수정또는 생성
      // return this.itemId ? await api.update(this.itemId, this.postForm) : await api.store(this.postForm)
      return this.itemId ? await updateStoreItem(id).update(this.itemId, this.postForm) : await updateStoreItem(id).store(this.postForm)
      // const {updateData} = await updateStoreItem(id)
    },

    onSubmit() {
      this.$refs.postForm.validate((success) => {
        console.log("this.$refs.postForm >>>", this.$refs.postForm)
        if (!success) {
          return /* console.log('failed') */
        }

        // this.loading = true
        updateStoreItem(this.itemId).then((res) => {
          // console.log("업데이트 전, this.postForm>>>", this.postForm)
          if (res.code === 'S0000') {
            fetchStoreItemDetail(this.itemId).then((response) => {
              response = this.postForm
              console.log("response >>>", response)
              console.log("업데이트 후, this.postForm>>>", this.postForm)
            })

            this.$message('데이터 변경 완료')
            if (!this.isEdit) {
              this.$router.push(this.$route.matched.pop().parent.path)
            }
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            })
          }

          this.loading = false
        })
      })
    },

    // onSubmit() {
    //     this.$refs.postForm.validate((success) => {
    //         if (!success) {
    //             return console.log('fail')
    //         }

    //         // this.loading = true
    //         this.postItem(this.itemId).then((res) => {
    //             if (res.code === 'S0000') {
    //                 this.$message('데이터 변경 완료')

    //                 if (!this.isEdit) {
    //                     this.$router.push(this.$route.matched.pop().parent.path)
    //                 }
    //             } else {
    //                 this.$message({
    //                     message: res.msg,
    //                     type: 'warning',
    //                 })
    //             }

    //             this.loading = false
    //         })
    //     })
    // },

    onCancel() {
      this.$router.push(this.$route.matched.pop().parent.path)
    },

    selectFranchiseeCategory(value) {
      const findFranchiseeCategory = this.franchisee_categories.find((category) => category.id === value)
      this.postForm.franchisee_code = findFranchiseeCategory.franchisee_code
      this.postForm.tag = findFranchiseeCategory.tag
    }

    // async getItem(id) {
    //     this.loading = true
    //     const { data } = await fetchStoreItemDetail(id)
    //     console.log('fetchStoreItemDetail data', data)

    //     this.franchisee_categories = data.franchisee_categories

    //     // 입력/수정할 메인 데이터
    //     if (this.itemId > 0) {
    //         if (data.store_item) {
    //             this.postForm = Object.assign(this.postForm, data.store_item)
    //             this.selectFranchiseeCategory(this.postForm.franchisee_category)
    //             if (data.store_item.thumbnail) {
    //                 this.images.push(data.store_item.thumbnail)
    //             }
    //             this.isDeletedData = data.store_item.deleted_at !== null
    //         } else {
    //             this.isDeletedData = true
    //         }
    //     }

    //     this.loading = false
    //     this.dataLoaded = true
    // },
    // async postItem() {
    //   // // TODO: 수정또는 생성
    //   return this.itemId ? await updateStoreItem(this.itemId).update(this.itemId, this.postForm) : await updateStoreItem(this.itemId).store(this.postForm)
    // },
    // onSubmit() {
    //   this.$refs.postForm.validate((success) => {
    //     if (!success) {
    //       return
    //     }

    //     this.loading = true
    //     this.postItem().then((res) => {
    //       if (res.code === 'S0000') {
    //         this.$message('데이터 변경 완료')

    //         if (!this.isEdit) {
    //           this.$router.push(this.$route.matched.pop().parent.path)
    //         }
    //       } else {
    //         this.$message({
    //           message: res.msg,
    //           type: 'warning'
    //         })
    //       }

    //       this.loading = false
    //     })
    //   })
    // }
    //     onCancel() {
    //         this.$router.push(this.$route.matched.pop().parent.path)
    //     },
    //     selectFranchiseeCategory(value) {
    //         const findFranchiseeCategory = this.franchisee_categories.find((category) => category.id === value)
    //         this.postForm.franchisee_code = findFranchiseeCategory.franchisee_code
    //         this.postForm.tag = findFranchiseeCategory.tag
    //     }
  }
}
</script>
