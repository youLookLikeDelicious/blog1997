const actions = {
  async nuxtServerInit ({ dispatch }, { req }) {
    await dispatch('globalState/getFriendLink', req)
    await dispatch('user/getCurrentUser')
  }
}

const namespaced = true

const reportIllegalInfoPlugin = (store) => {
  store.subscribe((mutation) => {
    if (mutation.type.split('/')[0] === 'reportIllegalInfo') {
      store.commit('globalState/showDialog')
    }
  })
}

const plugins = [reportIllegalInfoPlugin]

export default {
  actions,
  namespaced,
  plugins
}
