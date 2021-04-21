const Mock = require("mockjs");

const List = [];
const count = 204;

// const baseContent = "hello world";
const image_uri =
  "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3";
// const excelData = `${Math.random().toString(13)}.xls`;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      created_at: +Mock.Random.date("T"),
      deleted_at: null,
      discount_rate: 70,
      franchisee_code: "K7",
      franchisee_goods_code: "999999",
      id: "@INCREMENT",
      name: "@title(5, 10)",
      original_price: 1000,
      price: 700,
      supplier_code: "@INCREMENT",
      tag: null,
      thumbnail: image_uri,
      importance: "@integer(1, 3)",
      title: "@title(5, 10)",
      "type|1": ["CN", "US", "JP", "EU"],

      // 아래는 디테일(중복되는거 삭제할 것)
      //   created_at: "2020-09-21 11:47:59",
      //   deleted_at: null,
      description: "해태)부라보샌드180ml",
      //   discount_rate: 70,
      //   franchisee_category: 67,
      //   franchisee_code: "K7",
      //   franchisee_goods_code: "211525",
      //   id: 20890,
      is_adult: false,
      is_optional: false,
      is_tax: true,
      max_sell_limit: 1,
      member_id: 1,
      min_sell_limit: 1,
      //   name: "해태)부라보샌드180ml",
      //   original_price: 1800,
      //   price: 1260,
      //   supplier_code: "8809713220284",
      //   tag: {
      //     id: 417,
      //     name: "빙과류-d"
      //   },
      //   thumbnail: "https://i.lastorder.in/franchisee/k7/items/211525.jpg",
      thumbnail_path: "/franchisee/k7/items/211525.jpg",
      updated_at: "2020-10-21 14:17:42"
    })
  );
}

module.exports = [
  {
    url: "/franchisee/fms/storeitems/",
    type: "get",
    response: config => {
      const {
        importance,
        type,
        title,
        page = 1,
        limit = 20,
        sort
      } = config.query;

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false;
        if (type && item.type !== type) return false;
        if (title && item.title.indexOf(title) < 0) return false;
        return true;
      });

      if (sort === "-id") {
        mockList = mockList.reverse();
      }

      const pageList = mockList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      );

      const createNewId = List[0].id + mockList.length;

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList,
          newId: createNewId
        }
      };
    }
  },

  {
    url: "/franchisee/fms/storeitems/:id",
    type: "get",
    response: config => {
      const { id } = config.query;
      for (const storeitems of List) {
        if (storeitems.id === +id) {
          return {
            code: 20000,
            data: storeitems
          };
        }
      }
    }
  }

  //   {
  //     url: "/vue-element-admin/notice/pv",
  //     type: "get",
  //     response: _ => {
  //       return {
  //         code: 20000,
  //         data: {
  //           pvData: [
  //             { key: "PC", pv: 1024 },
  //             { key: "mobile", pv: 1024 },
  //             { key: "ios", pv: 1024 },
  //             { key: "android", pv: 1024 }
  //           ]
  //         }
  //       };
  //     }
  //   },

  //   {
  //     url: "/vue-element-admin/notice/create",
  //     type: "post",
  //     response: _ => {
  //       return {
  //         code: 20000,
  //         data: "success"
  //       };
  //     }
  //   },

  //   {
  //     url: "/vue-element-admin/notice/update",
  //     type: "post",
  //     response: _ => {
  //       return {
  //         code: 20000,
  //         data: "success"
  //       };
  //     }
  //   }
];
