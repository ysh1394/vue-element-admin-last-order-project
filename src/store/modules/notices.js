// import {
//   // fetchList,
//   fetchArticle,
//   updateArticle,
//   createArticle
// } from "@/api/article";
import {
  fetchNoticeList,
  fetchNoticeDetail,
  updateNotice,
  createNotice
} from "@/api/notice";
// import { getNowDate } from "@/views/notices/components/detail.vue";
import router from "@/router";
// import route from "@/router";

const STORAGE_KEY = "notices";

export default {
  namespaced: true,
  state: () => ({
    // index
    list: null,
    searchList: [],
    listLoading: false,
    total: 0,
    tableKey: 0,
    listQuery: {
      page: 1,
      limit: 20,
      s: "",
      sort: "+id"
    },
    sortOptions: [
      { label: "ID Ascending", key: "+id" },
      { label: "ID Descending", key: "-id" }
    ],
    // detail && create
    data: null,
    nowDate: "",
    postForm: {
      id: "",
      author: "로그인 토큰",
      title: "",
      content: "",
      display_time: ""
    },
    html: "",
    languageTypeList: {
      en: "en_US",
      zh: "zh_CN",
      es: "es_ES"
    }
  }),

  mutations: {
    assignList(state, mutationList) {
      state.list = mutationList;
    },

    assignPage(state, mutationPage) {
      state.total = mutationPage;
    },

    assignLoading(state, loading) {
      state.listLoading = loading;
    },

    assignSearch(state, listFilter) {
      state.searchList = listFilter;
    },

    assignClear(state, clear) {
      state.listQuery.s = clear;
    },

    assignSearchResult(state, result) {
      state.list = result;
    },

    assignHandleFilter(state, page) {
      state.listQuery.page = page;
    },

    assignSort(state, sort) {
      state.listQuery.sort = sort;
    },

    assignDetailData(state, detailData) {
      state.data = detailData;
    },

    updateTitle(state, title) {
      state.data.title = title;
    },

    updateContent(state, content) {
      state.data.content = content;
    },

    updateTime(state, display_time) {
      state.data.display_time = display_time;
    },

    fetchId(state, add) {
      state.postForm.id = add;
    },

    resetPostFormTitle(state, reset) {
      state.postForm.title = reset;
    },

    resetPostFormContent(state, reset) {
      state.postForm.content = reset;
    },

    deleteData(state) {
      state.list.splice(state.data.id, 1);
      alert(`${state.data.id}번 글이 삭제 되었습니다.`);
      router.push({
        path: "/notices"
      });
    },

    nowDate(state) {
      const nowDate = new Date();
      const year = nowDate.getFullYear().toString();
      const month = (nowDate.getMonth() + 1).toString();
      const day = nowDate.getDate().toString();
      const hour = nowDate.getHours().toString();
      const Minute = nowDate.getMinutes().toString();
      const second = nowDate.getSeconds().toString();

      state.nowDate = `${year}-${month[1] ? month : "0" + month[0]}-${
        day[1] ? day : "0" + day[0]
      } ${hour[1] ? hour : "0" + hour[0]}:${
        Minute[1] ? Minute : "0" + Minute[0]
      }:${second[1] ? second : "0" + second[0]}`;

      state.postForm.display_time = `${year}-${
        month[1] ? month : "0" + month[0]
      }-${day[1] ? day : "0" + day[0]} ${hour[1] ? hour : "0" + hour[0]}:${
        Minute[1] ? Minute : "0" + Minute[0]
      }:${second[1] ? second : "0" + second[0]}`;
    }
    // assignListById: state => id => {
    //   return state.list.find(list => list.id === id);
    // }
  },

  actions: {
    setLocalStorage({ state }) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.list));
    },

    getList({ state, commit }) {
      console.log(
        "**index.vue** actions -> getList 의 state.list >>>>",
        state.list
      );
      commit("assignLoading", false);
      fetchNoticeList(state.listQuery).then(response => {
        commit("assignList", response.data.items);
        commit("assignPage", response.data.total);
        commit("assignLoading", true);
        console.log(
          "**index.vue** actions -> getList -> fetch 의 state.list >>>>",
          state.list
        );
        console.log(
          "**index.vue** actions -> getList -> fetch 의 response.data >>>>",
          response.data
        );
      });
      setTimeout(() => {
        commit("assignLoading", false);
      }, 1.5 * 1000);
    },

    handleSearch({ state, commit, dispatch }) {
      if (state.listQuery.s) {
        commit(
          "assignSearch",
          state.list.filter(data => {
            return data.title.toLowerCase().includes(state.listQuery.s);
          })
        );
        commit("assignClear", "");
        commit("assignSearchResult", state.searchList);
      } else {
        return dispatch("getList");
      }
    },

    handleFilter({ commit, dispatch }) {
      commit("assignHandleFilter", 1);
      dispatch("getList");
    },

    sortByID({ commit, dispatch }, order) {
      if (order === "ascending") {
        commit("assignSort", "+id");
      } else {
        commit("assignSort", "-id");
      }
      dispatch("handleFilter");
    },

    sortChange({ dispatch }, { prop, order }) {
      if (prop === "id") {
        dispatch("sortByID", order);
      }
    },

    // getSortClass: function({ state }, key) {
    //   const sort = state.listQuery.sort;
    //   return sort === `+${key}` ? "ascending" : "descending";
    // }

    handleGetData({ state, commit }, id) {
      console.log("handleGetData의 id >>>>>>", id);
      console.log("handleGetData의 state.data >>>>>>", state.data);
      fetchNoticeDetail(id).then(response => {
        console.log("fetchArticle의 response.data >>>>>>", response.data);
        commit("assignDetailData", response.data);
        commit("nowDate");
        console.log("handleGetData의 response.data >>>>>>", response.data);
      });
    },

    updateData({ state, commit, dispatch }) {
      updateNotice(state.data).then(response => {
        console.log("state.data >>>>", state.data);
        console.log("state.list >>>>", state.list);
        console.log("state.list >>>>", response.data);
        console.log("this.$router.params >>>>", router.history.current.params);
        if (
          response.data === "success" &&
          state.data.title &&
          state.data.content
        ) {
          console.log("state.data.title >>>>", state.data.title);
          commit("updateTitle", state.data.title);
          commit("updateContent", state.data.content);
          commit("updateTime", "nowDate");

          alert("업데이트 되었습니다.");
          dispatch("setLocalStorage");

          router.push({
            path: "/notices"
          });
        } else {
          alert("제목 및 내용을 입력해주세요.");
        }
      });
    },

    getIdLength({ state, commit }) {
      fetchNoticeList(state.listQuery).then(response => {
        commit("fetchId", response.data.newId);
        commit("nowDate");
        console.log("response >>>>", response);
      });
    },

    handleCreateNotice({ state, commit, dispatch }) {
      createNotice(state.postForm).then(response => {
        console.log(
          "createArticle if문 실행 전 state.postForm >>>>",
          state.postForm
        );
        if (
          response.data === "success" &&
          state.postForm.title &&
          state.postForm.content
        ) {
          state.list.unshift(state.postForm);
          console.log(
            "createArticle if문 실행 후, localStorager담기기 전 state.postForm >>>>",
            state.postForm
          );
          dispatch("setLocalStorage");
          alert("업데이트 되었습니다.");
          commit("fetchId", response.data.newId);
          commit("resetPostFormTitle", "");
          commit("resetPostFormContent", "");
          router.push({
            path: "/notices"
          });

          console.log("createArticle의 state.list >>>>", state.list);
          console.log("createArticle의 state.total >>>>", state.total);
        } else {
          alert("제목 및 내용을 입력해주세요.");
        }
      });
    }
  }
};
