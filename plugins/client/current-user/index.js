/**
 * 检查当前的用户
 * 如果用户没有登陆，返回null
 * 如果用户已经登陆，返回Object
 */
export default {
  install (Vue) {
    Vue.prototype.$currentUser = function () {
      return this.$store.state.user.id ? this.$store.state.user : ''
    }
  }
}
