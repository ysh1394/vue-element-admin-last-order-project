<template>
  <div class="app-container">
    <div class="layoutBox">
      <el-form ref="form" :data="data" label-width="140px">
        <div class="contentInfoContainer">
          <div class="contentInfoSection">
            <MDinput v-model="data.id" :maxlength="100" name="name" required readonly>
              Title No.
            </MDinput>
          </div>
          <div class="contentInfoSection">
            <MDinput v-model="data.display_time" :maxlength="100" name="name" required readonly>
              Create Date.
            </MDinput>
          </div>
          <div class="contentInfoSection">
            <MDinput v-model="nowDate" :maxlength="100" name="name" required readonly>
              Now Date.
            </MDinput>
          </div>
          <div class="contentInfoSection">
            <MDinput v-model="data.author" :maxlength="100" name="name" required readonly>
              Writer
            </MDinput>
          </div>
        </div>
        <div class="title">
          <MDinput v-model="data.title" :maxlength="100" name="name" required>
            Title
          </MDinput>
        </div>
        <markdown-editor
          ref="markdownEditor"
          v-model="data.content"
          :options="{hideModeSwitch:true,previewStyle:'none'}"
          height="500px"
        />
        <div class="BtnContainer">
          <el-button class="info-btn" @click="deleteData">삭제</el-button>
          <div>
            <el-button
              class="item-register green-btn"
              @click="updateData"
            >
              게시글 수정
            </el-button>
            <router-link
              :to="{ name: 'notices' }"
              exact
            >
              <el-button class="info-btn">취소</el-button>
            </router-link>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<!-- <router-view :key="$route.fullPath" /> -->

<script>
// import { fetchArticle, updateArticle } from '@/api/article'
import MarkdownEditor from '@/components/MarkdownEditor'
import MDinput from '@/components/MDinput'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Detail',
  components: { MarkdownEditor, MDinput },

  data() {
    console.log("data 속 this.data >>>>", this.data)
    return {
    }
  },

  computed: {
    ...mapState('notices', [
      'data',
      'nowDate',
      'date',
      'html',
      'languageTypeList'
    ]),
    language() {
      return this.languageTypeList.en
    }
  },

  created() {
    if (this.$route.params.contentId) {
      this.handleGetData(this.$route.params.contentId)
      console.log("created 속 this.data >>>>", this.data)
    } else {
      this.$router.push({
        path: '/create'
      })
    }
  },

  mounted() {
  },

  methods: {

    ...mapMutations('notices', [
      'deleteData'
    ]),

    ...mapActions('notices', [
      'handleGetData',
      'updateData'
    ])

    // handleGetData(id) {
    //   console.log("methods에서 this.list >>>>", this.list.id)
    //   console.log("data >>>", this.data)
    //   fetchArticle(id).then((response) => {
    //     this.data = response.data
    //     console.log("response >>>>", response)
    //   })
    // },

    // updateData() {
    //   updateArticle(this.data).then((response) => {
    //     console.log("this.data >>>>", this.data)
    //     if (response.data === "success" /* && this.detailData.title && this.detailData.content */) {
    //       this.$store.state.notices.list[this.index].title = this.data.title
    //       this.$store.state.notices.list[this.index].content = this.data.content
    //       this.$store.state.notices.list[this.index].display_time = this.getNowDate()
    //       console.log("클릭 후 this.$store.state.notices.list[this.index].title >>>>", this.$store.state.notices.list[this.index].title)
    //       console.log("클릭 후 this.data.content >>>>", this.data.content)
    //       console.log("클릭 후 this.data.display_timet >>>>", this.getNowDate())
    //       alert('업데이트 되었습니다.')
    //       this.$router.push({
    //         path: '/notices'
    //       })
    //     } else {
    //       alert('제목 및 내용을 입력해주세요.')
    //     }
    //   })
    //   this.$router.push({
    //     path: '/notices'
    //   })
    // },

    // deleteData() {
    //   this.$store.state.notices.list.splice(this.index, 1)
    //   this.$router.push({
    //     path: '/notices'
    //   })
    // }
  }
}

</script>

<style>

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
