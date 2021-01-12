const state = function () {
  return {
    id: '',
    initialized: false
  }
}

const mutations = {
  /**
   * 设置用户的信息
   * @param state
   * @param user
   */
  setUser (state, user) {
    Object.assign(state, user)
  },
  /**
   * 清空用户的信息
   * @param state
   */
  clearUserInfo (state) {
    for (const i in state) {
      state[i] = undefined
    }
  },
  stateHaveInitialized (state) {
    state.initialized = true
  }
}

const actions = {
  getCurrentUser ({ commit, state }) {
    if (state.id || state.initialized) {
      return
    }
    commit('stateHaveInitialized')
    this.$axios.post('/oauth/currentUser')
      .then((response) => {
        commit('setUser', response.data.data)
      }).catch((e) => {
        commit('setUser', { id: '', name: '' })
      })
  }
}

const namespaced = true
export {
  state,
  namespaced,
  mutations,
  actions
}
