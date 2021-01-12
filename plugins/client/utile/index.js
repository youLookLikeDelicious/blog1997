// 兼容处理 阻止event默认事件
export default {
  install (Vue) {
    // 阻止默认的行为
    Vue.prototype.$preventEvent = function (event) {
      if (event.preventDefault) {
        event.preventDefault()
      } else {
        event.returnValue = false
      }
    }
    /**
     * 判断用户是否登陆
     */
    Vue.prototype.$userHasSignedIn = function () {
      const state = this.$store.state.user.id
      if (!state) {
        this.$store.commit('globalState/setShowLogin', true)
      }
      return state
    }
  }
}
