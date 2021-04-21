import request from "@/utils/request";

export function fetchNoticeList(query) {
  return request({
    url: "/vue-element-admin/notice/list",
    // url: "http://localhost:3000/get",
    method: "get",
    params: query
  });
}

// export function fetchNoticeDetail(id, query) {
//   return request({
//     url: `/vue-element-admin/notice/detail/${id}`,
//     method: "get",
//     params: query
//   });
// }

export function fetchNoticeDetail(id) {
  return request({
    url: "/vue-element-admin/notice/detail",
    method: "get",
    params: { id }
  });
}

export function fetchNoticePv(pv) {
  return request({
    url: "/vue-element-admin/notice/pv",
    method: "get",
    params: { pv }
  });
}

export function createNotice(data) {
  return request({
    url: "/vue-element-admin/notice/create",
    method: "post",
    data
  });
}

// export function updateNotice(data) {
//   return request({
//     url: "/vue-element-admin/notice/update",
//     method: "post",
//     data
//   });
// }

export function updateNotice(id, query) {
  return request({
    url: `/vue-element-admin/notice/detail/${id}`,
    method: "put",
    params: query
  });
}
