const Mock = require("mockjs");

const List = [];
const count = 204;

const baseContent = "hello world";
const image_uri =
  "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3";
const excelData = `${Math.random().toString(13)}.xls`;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@INCREMENT",
      timestamp: +Mock.Random.date("T"),
      author: "@first",
      reviewer: "@first",
      title: "@title(5, 10)",
      content_short: "mock data",
      content: baseContent,
      forecast: "@float(0, 100, 2, 2)",
      importance: "@integer(1, 3)",
      "type|1": ["CN", "US", "JP", "EU"],
      "status|1": ["published", "draft"],
      display_time: "@datetime",
      comment_disabled: true,
      pageviews: "@integer(300, 5000)",
      image_uri,
      platforms: ["a-platform"],
      excelData: excelData
    })
  );
}

module.exports = [
  {
    url: "/vue-element-admin/notice/list",
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
    url: "/vue-element-admin/notice/detail",
    type: "get",
    response: config => {
      const { id } = config.query;
      for (const notice of List) {
        if (notice.id === +id) {
          return {
            code: 20000,
            data: notice
          };
        }
      }
    }
  },

  {
    url: "/vue-element-admin/notice/pv",
    type: "get",
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: "PC", pv: 1024 },
            { key: "mobile", pv: 1024 },
            { key: "ios", pv: 1024 },
            { key: "android", pv: 1024 }
          ]
        }
      };
    }
  },

  {
    url: "/vue-element-admin/notice/create",
    type: "post",
    response: _ => {
      return {
        code: 20000,
        data: "success"
      };
    }
  },

  {
    url: "/vue-element-admin/notice/update",
    type: "post",
    response: _ => {
      return {
        code: 20000,
        data: "success"
      };
    }
  }
];
