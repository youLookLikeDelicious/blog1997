export default {
  user: state => state.user,
  visibleBackDrop: state => state.globalState.visibleBackDrop,
  waiting: state => state.globalState.waiting,
  friendLinkList: state => state.globalState.friendLinkList, // 友链
  searchKeyword: state => state.search.keyword, // 搜索关键字
  showLogin: state => state.globalState.showLogin // 显示登录
}
