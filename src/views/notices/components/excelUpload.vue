<template>

  <div class="app-container">

    <div class="layoutBox">
      <el-form ref="form" :model="postForm" label-width="140px">
        <div class="contentInfoContainer">
          <div class="contentInfoSection">
            <MDinput v-model="postForm.id" :maxlength="100" name="name" required readonly>
              Title No.
            </MDinput>
          </div>
          <div class="contentInfoSection">
            <MDinput v-model="postForm.display_time" :maxlength="100" name="name" required readonly>
              Create Date.
            </MDinput>
          </div>
          <div class="contentInfoSection">
            <MDinput v-model="nowDate" :maxlength="100" name="name" required readonly>
              Now Date.
            </MDinput>
          </div>
          <div class="contentInfoSection">
            <MDinput v-model="postForm.author" :maxlength="100" name="name" required>
              Writer
            </MDinput>
          </div>

        </div>

        <div class="title">
          <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
            Title
          </MDinput>
        </div>
        <section class="excelUploadSection">
          <simpleUpload />
        </section>

        <markdown-editor
          ref="markdownEditor"
          v-model="postForm.content"
          :options="{hideModeSwitch:true,previewStyle:'none'}"
          height="500px"
        />

        <div class="BtnContainer">
          <el-button class="info-btn" disabled>삭제</el-button>
          <div>
            <el-button
              class="item-register green-btn"
              @click="handleCreateNotice"
            >게시글 등록</el-button>
            <router-link
              :to="{ name: 'notices' }"
              exact
            >
              <el-button class="info-btn">
                취소
              </el-button>
            </router-link>

          </div>
        </div>
      </el-form>
    </div>
  </div>
  <!-- <router-view :key="$route.fullPath" /> -->

</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import MDinput from '@/components/MDinput'
import { mapActions, mapState } from 'vuex'
import simpleUpload from './simpleUpload'

export default {
  name: 'ExcelUpload',
  components: { MarkdownEditor, MDinput/* , UploadExcelComponent  */, simpleUpload },
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },

  data() {
    return {
      tableData: [],
      tableHeader: [],
      noData: "No Data",
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },

  computed: {
    ...mapState('notices', [
      'postForm',
      'nowDate',
      'html',
      'languageTypeList'
    ]),
    language() {
      return this.languageTypeList.en
    }
  },

  created() {
    console.log("tableData>>>", this.tableData)
    this.getIdLength()
  },
  mounted() {
    // this.handleCreateNotice()
  },

  methods: {

    ...mapActions('notices', [
      'getIdLength',
      'handleCreateNotice'
    ])
  }
}
</script>

<style scoped>

div.app-container {
  width: 100%;
}
.layoutBox {
  width: 90%;
  max-width: 1000px;
  margin: auto;
}
.contentInfoContainer {
  margin: 100px 0px 50px 0px;
  /* display: flex;
  justify-content: space-between; */
  display: flex;
  flex-direction: column;
}

.contentInfoContainer .contentInfoSection {
  margin-top: 15px;
  width: 30%;
}

.contentInfoSection .material-input__component .material-input-bar[data-v-6bb35d14] {
  width: 100%;
}

.contentInfoSection .material-input__component .material-input-bar[data-v-6bb35d14]:after
.contentInfoSection .material-input__component .material-input-bar[data-v-6bb35d14]::before {
  width: 100%;
}

.contentInfoContainer .material-input__component .material-input[data-v-6bb35d14] {
  font-size: 16px;
  padding-top: 0px;
}

.contentInfoContainer .material-input__component .material-label[data-v-6bb35d14] {
  font-size: 16px;
}

.title .material-input__component {
margin: 100px 0px 50px 0px ;
}

.title .material-input__component .material-label[data-v-6bb35d14] {
  font-size : 16px;
}

.BtnContainer {
  display: flex;
  justify-content: space-between;
  margin: 20px 0px 80px 0px;
}

.BtnContainer div {
  display: flex;
  justify-content: space-between;
  width: 20%;
}

</style>
