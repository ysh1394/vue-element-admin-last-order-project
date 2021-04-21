<template>
  <div>
    <!-- https://jsonplaceholder.typicode.com/posts/ -->
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
      accept=".xlsx, .csv"
      :on-change="onUploadChange"
    >
      <el-button size="small" type="primary">Click to upload</el-button>
      <div slot="tip" class="el-upload__tip">
        excel files(.xlsx, .csv) with a size less than 4mb
      </div>

    </el-upload>

  </div>
</template>

<script>

export default {
  name: "SimpleUpload",

  data() {
    return {
      excelData: []
    }
  },

  methods: {

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
    },

    onUploadChange(file) {
      const isEXCEL = (file.raw.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.raw.type === 'text/csv');
      const isLt4M = file.size / 4096 / 4096 < 1;

      console.log("file.raw.type >>>", file.raw.type)
      console.log("file.raw.size >>>", file.raw.size)
      console.log("file.raw >>>", file.raw)
      if (!isEXCEL) {
        this.$message.error('Only upload .xlsx, .csv!');
        return false;
      }
      if (!isLt4M) {
        this.$message.error('Upload file size cannot exceed 4 MB!');
        return false;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        console.log(this.result)// base64 data for pictures
      }
    }

  }
}
</script>

