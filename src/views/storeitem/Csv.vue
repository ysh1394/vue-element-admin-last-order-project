<template>
  <div class="app-container">
    <el-row>
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" :is-loading="isLoading" />
      <el-button v-show="isUploaded" type="success" :disabled="isLoading" @click="handleSave">저장</el-button>
      <el-button v-show="isUploaded" :disabled="isLoading" @click="handleReset">리셋</el-button>
      <el-button @click="handleBack">취소</el-button>
    </el-row>

    <el-table v-loading="isLoading" :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
// import { fetchCreateMany, fetchCategoryList } from '@/api/storeItems'
// import { Message } from 'element-ui'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      categories: [],
      isLoading: false,
      isUploaded: false,
      tableData: [],
      tableHeader: []
    }
  },
  mounted() {
    // this.handleGetCategory()
    // window.addEventListener('scroll', this.onScroll);
    // this.$EventBus.$emit('off:loading')
  },
  methods: {
    // handleGetCategory(e) {
    //   fetchCategoryList().then((response) => {
    //     console.log(response)
    //     this.categories = response.data
    //   })
    // },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.isUploaded = true
      this.tableData = results
      this.tableHeader = header
    },
    handleReset() {
      this.isUploaded = false
      this.isLoading = false
      this.tableData = []
      this.tableHeader = []
    },
    handleSave() {
      console.log("펫치 다시")
    },
    // handleSave() {
    //   this.isLoading = true
    //   fetchCreateMany(this.tableData)
    //     .then((response) => {
    //       console.log(response)
    //       if (response.code !== 'S0000') {
    //         return
    //       }

    //       Message.success(
    //         `전체:${response.data.count
    //         } / 생성:${response.data.creates
    //         } / 수정:${response.data.updates
    //         } / 실패:${response.data.fails}`)

    //       setTimeout(() => {
    //         this.isUploaded = false
    //         this.isLoading = false
    //       }, 3 * 1000)
    //     })
    // },
    handleBack() {
      // this.$router.push("/?#/items/index");
      this.$router.go(-1)
    }
  }
}
</script>
