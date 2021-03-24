<template>  
    <table>
      <tr>
        <td>No</td>
        <td>글쓴이</td>
        <td>제목</td>
        <td>내용</td>
        <td>작성일자</td>
      </tr>
      <tr  v-for="(value, idx) in jsData" v-bind:key="value.id" @click="detail(idx)">
        <td>{{value.id}}</td>
        <td>{{value.writer}}</td>
        <td>{{value.title}}</td>
        <td>{{value.content}}</td>
        <td>{{value.date}}</td>
      </tr>
      <button @click="write">글쓰기</button>
    </table>
</template>

    
    
<script>

import data from '@/views/notices/data/data.js'
import functionData from '@/views/notices/data/functionData.js'

// import Vue from 'vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios, axios)
export default {
  name: 'notices',
  data() {
    return {
      // jsonData: [] >> 목서버 데이터
      jsData: data,
      listQuery: {
        page: 1,
        limit: 20,
        s: ''
        },
      list: [],
      total: 0,
      tableKey: 0,
      listLoading: false
      }
    },

// UI 완성 후, 가상 데이터로 진행해 볼 예정입니다!
// mounted() {
//   const MockURL = 'http://localhost:8000/get'
//   Vue.axios.get(MockURL)
//   .then((res) => {
//     this.jsonData = res.data
//   })
// },

created() {
  this.handleGetList()
},

  methods: {
        write() {
      this.$router.push({
        path: 'create'
      })
    },
    detail(id) {
      console.log('id', id)
      console.log('contentId', this.$route.params.contentId)
      this.$router.push({
        name: `detail`,
        params: {
          contentId: id + 1
        }

      })
    },
  }
}

</script>