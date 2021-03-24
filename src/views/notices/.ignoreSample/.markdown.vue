<template>
  <div class="components-container">

    <div class="editor-container">
      <el-tag class="tag-title">
        작성자 : {{ this.writer }}
      </el-tag>
      <el-tag class="tag-title">
        제목 : {{ this.title }}
      </el-tag>
      <markdown-editor ref="markdownEditor" v-model="content" :options="{hideModeSwitch:true,previewStyle:'none'}" height="500px" />
    </div>
    <input v-model="title" placeholder="제목">
    <input v-model="content" placeholder="내용">
    <button @click="index !== undefined ? update() : write()">{{ index !== undefined ? '수정' : '작성' }}</button>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import data from '@/views/notices/data/data.js'

export default {
  name: 'MarkdownDemo',
  components: { MarkdownEditor },
  data() {
    const index = this.$route.params.contentId
    return {
      data: data.data,
      writer: '로그인 한 사람',
      title: index !== undefined ? data.data[index].title : '',
      content: index !== undefined ? data.data[index].content : '',
      // content1: content,
      // content2: content,
      // content3: content,
      // content4: content,
      html: '',
      languageTypeList: {
        en: 'en_US',
        zh: 'zh_CN',
        es: 'es_ES'
      }
    }
  },
  computed: {
    language() {
      return this.languageTypeList.en
    }
  },
  methods: {
    write() {
      this.data.data.push({
        writer: this.writer,
        title: this.title,
        content: this.content
      })
      this.$router.push({
        path: '/notices'
      })
    },
    update() {
      data.data[this.index].title = this.title
      data.data[this.index].content = this.content
      this.$router.push({
        path: '/notices'
      })
    }
  }
}
</script>

<style scoped>
.editor-container{
  margin-bottom: 30px;
}
.tag-title{
  margin-bottom: 5px;
}
</style>
