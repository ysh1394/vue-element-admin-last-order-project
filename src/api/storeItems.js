import request from "@/utils/request";

/**
 * 모상품목록 가져오기
 * @param {*} query
 */
export function fetchStoreItems(query) {
  return request({
    url: "/franchisee/fms/storeitems/",
    method: "get",
    params: query
  });
}

/**
 * 모상품 생성하기
 * @param {*} query
 */
export function createStoreItem(query) {
  return request({
    url: "/franchisee/fms/storeitems/",
    method: "post",
    params: query
  });
}

/**
 * 모상품 대량 등록하기 step1(등록)
 * @param {*} query
 */
export function bulkCreateStoreItem(query) {
  return request({
    url: "/franchisee/fms/storeitems/register_task/",
    method: "post",
    params: query
  });
}

/**
 * 모상품 대량 등록하기 step2(실행)
 * @param {*} query
 */
export function RunBulkCreateStoreItem(query) {
  return request({
    url: "/franchisee/fms/storeitems/bulk/",
    method: "post",
    params: query
  });
}

/**
 * 모상품상세 가져오기
 * @param {*} query
 */
// export function fetchStoreItemDetail(query) {
//     return request({
//         url: `/franchisee/fms/storeitems/${id}/`,
//         method: 'get',
//         params: query,
//     })
// }

export function fetchStoreItemDetail(query, id) {
  return request({
    url: `/franchisee/fms/storeitems/${id}`,
    method: "get",
    params: query
  });
}

/**
 * 모상품 수정하기
 * @param {*} query
 */
export function updateStoreItem(query, id) {
  return request({
    url: `/franchisee/fms/storeitems/${id}/`,
    method: "put",
    params: query
  });
}

/**
 * 모상품 삭제하기
 * @param {*} query
 */
export function deleteStoreItem(query) {
  return request({
    url: "/franchisee/fms/storeitems/delete_selected/",
    method: "post",
    params: query
  });
}

// export function getItemList(query) {
//   return request({
//     url: "/franchisee/fms/items/",
//     method: "get",
//     params: query
//   });
// }

// export function fetchCategoryList(query) {
//   return request({
//     url: "/categories/",
//     method: "get",
//     params: query
//   });
// }
