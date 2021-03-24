const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
  // date: state => state.notices.date
  // getListById: state => id => {
  //   return state.notices.list.find(list => list.id === id);
  // },
  // getNowDate: state => {
  //   state.notice.nowDate = new Date();
  //   const year = new Date().getFullYear().toString();
  //   const month = (new Date().getMonth() + 1).toString();
  //   const day = new Date().getDate().toString();
  //   const hour = new Date().getHours().toString();
  //   const Minute = new Date().getMinutes().toString();
  //   const second = new Date().getSeconds().toString();

  //   return `${year}-${month[1] ? month : "0" + month[0]}-${
  //     day[1] ? day : "0" + day[0]
  //   } ${hour[1] ? hour : "0" + hour[0]}:${
  //     Minute[1] ? Minute : "0" + Minute[0]
  //   }:${second[1] ? second : "0" + second[0]}`;
  // }
  // list: state => state.list // notices list
};
export default getters;
