// 全局组件 promptMessage的状态
const state = function () {
  return {
    promptMessage: undefined
  }
}

const mutations = {
  // 设置数据的状态
  setPromptMessage (state, msg) {
    if( state.promptMessage === msg ){
      return
    }
    state.promptMessage = msg
  }
}

export{
  state,
  mutations
}
