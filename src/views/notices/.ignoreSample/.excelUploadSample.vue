<template>
  <div>
    <!-- <form enctype="multipart/form-data" @submit.prevent="sendFile" /> -->
    <form enctype="multipart/form-data" />

    <div class="field">

      <label for="file" class="label" />

      <input
        ref="file"
        type="file"
        accept=".xlsx, .xls, .csv"
        @change="selectFile"
      >
      <div class="field">
        <button class="button is-info" @click="sendFile">Send</button>
        <button class="button is-info">Del</button>
      </div>
      <button class="button is-info" @click="exportExcel">엑셀 다운 테스트</button>
    </div>

    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      access-control-allow-origin="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="excelData"
      accept=".xlsx, .xls, .csv"
    >
      <el-button size="small" type="primary">Click to upload</el-button>
      <div slot="tip" class="el-upload__tip">excel files(.xlsx, .xls, .csv) with a size less than 500kb</div>
    </el-upload>

  </div>
</template>

<script>
import { createNotice } from "@/api/notice";
import { mapState } from 'vuex'
import XLSX from 'xlsx'

export default {
  name: "SimpleUpload",

  data() {
    return {
      excelData: [],
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
      // tableData: [{
      //   date: '2019-12-12',
      //   name: 'testData'
      // }]
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

  methods: {

    exportExcel() {
      const wb = XLSX.utils.book_new() // 엑셀 파일 생성 (workbook)
      const ws = XLSX.utils.json_to_sheet(this.tableData) // 시트 생성 (worksheet) 및 데이터 삽입

      XLSX.utils.book_append_sheet(wb, ws, 'sheet1') // 엑셀 파일에 시트 추가

      XLSX.writeFile(wb, 'result.xlsx') // 엑셀 다운로드
    },

    selectFile() {
      this.excelData = this.$refs.file.files[0]
      console.log("this.$refs.file >>>>", this.$refs.file)
      console.log("this.$refs.file.files[0] >>>>", this.$refs.file.files[0])
      console.log("this.file >>>>", this.file)
      console.log("this.excelData >>>>", this.excelData)
    },

    // async sendFile() {
    //   console.log("sendFile 상단 this.excelData >>>", this.excelData)
    //   const formData = new FormData();
    //   formData.append('excelData', this.excelData)
    //   console.log("formData >>>", formData)
    //   console.log("formData.append('excelData', this.excelData) >>>", formData.append('excelData', this.excelData))
    //   try {
    //     await axios.post(/* createNotice(formData) */'/vue-element-admin/notice/create', formData)
    //   } catch (err) {
    //     console.log("err로그 >>>", err)
    //   }
    // }

    sendFile() {
      const uploadFile = this.$refs.file.files[0]
      // const formData = new FormData();
      // formData.append('file', this.file)
      createNotice(uploadFile).then(res => {
        if (res.data === "success") {
          this.$notify({
            title: 'Success',
            message: '업로드 완료',
            type: 'success',
            duration: 2000
          })
          console.log("펫치 함수 안쪽 this.excelData >>>", this.excelData)
          console.log("펫치 함수 안쪽 res.data >>>", res.data)
          console.log("펫치 함수 안쪽 res >>>", res)
          console.log("펫치 함수 안쪽 uploadFile >>>", uploadFile)
          this.excelData = uploadFile
          this.list.unshift(this.excelData)
        } else {
          alert('Submit Failed')
        }
      })
    },

    handleRemove(file, fileList) {
      console.log("handleRemove(file, fileList) >>>>>", file, fileList);
    },
    handlePreview(file) {
      console.log("handlePreview(file) >>>>", file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`최대 3개 파일만 업로드 가능합니다.`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`${file.name}을 삭제 하시겠습니까?`);
    }

    // sendFile() {
    //   console.log("this.excelData >>>>", this.excelData)
    //   console.log("this.$refs.excelData >>>>", this.$refs.file.files[0])
    //   this.$refs.excelData
    // }
  }
}
</script>

