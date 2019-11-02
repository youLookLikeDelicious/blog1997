import namespaced from './namespaced'
// 全局组件 promptMessage的状态
const state = function () {
  return {
    prompt: {
      'message': '',
      'status': true
    },
    waitting: false
  }
}

const mutations = {
  // 设置数据的状态
  setPromptMessage (state, { msg, status }) {
    if (state.prompt.message === msg) {
      return
    }

    if (state.prompt.status !== status) {
      state.prompt.status = status
    }

    state.prompt.message = msg
  },
  // 设置等待的状态
  setWaitingState (state, flag) {
    if (state.waitting === flag) {
      return
    }
    state.waitting = flag
  }
}

export {
  state,
  namespaced,
  mutations
}
