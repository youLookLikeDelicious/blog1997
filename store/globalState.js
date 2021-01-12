// 全局组件 promptMessage的状态
const state = function () {
  return {
    prompt: [], // { 'message': '', 'status': true }
    friendLinkList: [],
    waiting: false,
    showLogin: false,
    showDialog: false, // 是否显示对话框
    canUseWebp: true,
    visibleBackDrop: []
    // backDrop: []
  }
}

const actions = {
  async getFriendLink ({ commit }, req) {
    const data = await this.$axios.get('friend-link', req)
      .then((response) => {
        return response.data.data
      })
    commit('setFriendLink', data)
  }
}
const mutations = {
  /**
   * 设置提示信息
   * @param state
   * @param msg
   * @param status
   */
  setPromptMessage (state, { msg, status = true }) {
    state.prompt.push({
      message: msg,
      status,
      symbol: Symbol('prompt')
    })
  },
  /**
   * 移除第一消息
   * @param {json} state
   */
  shiftPromptMessage (state) {
    if (state.prompt.length) {
      state.prompt.shift()
    }
  },
  /**
   * 设置等待的状态
   * @param state
   * @param flag
   */
  setWaitingState (state, flag) {
    state.waiting = flag
  },
  /**
   * 登陆窗口的关闭|打开
   * @param state
   * @param flag 窗口的状态
   */
  setShowLogin (state, flag) {
    state.showLogin = flag
  },
  /**
   * 设置友链信息
   */
  setFriendLink (state, linkList) {
    state.friendLinkList = linkList
  },
  /**
   * 设置是否支持webp的状态
   */
  setCanUseWebp (state, canUseWebp) {
    state.canUseWebp = canUseWebp
  },
  /**
   * 隐藏对话框
   */
  hidDialog (state) {
    state.showDialog = false
  },
  /**
   * 显示对话框
   */
  showDialog (state) {
    state.showDialog = true
  },
  /**
   * 添加要显示的背景
   *
   * @param {int} index
   */
  pushVisibleBackDrop (state, index) {
    index = parseInt(index)
    if (state.visibleBackDrop.includes(index)) {
      return
    }
    state.visibleBackDrop.push(parseInt(index))
  },
  /**
   * 清除背景列表的状态
   */
  clearVisibleBackDrop (state) {
    state.visibleBackDrop = []
  }
}
const namespaced = true
export {
  state,
  actions,
  namespaced,
  mutations
}
