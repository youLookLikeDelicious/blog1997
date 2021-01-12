const state = function () {
  return {
    keyword: '',
    type: ''
  }
}

const mutations = {
/**
 * 设置搜索的关键字
 * @param {Object} state
 * @param {String} keyword
 */
  setSearchConfig (state, { keyword = '', type = '' }) {
    if (state.keyword !== keyword) {
      state.keyword = keyword
    }
    if (state.type !== type) {
      state.type = type
    }
  }
}

const namespaced = true

export {
  state,
  namespaced,
  mutations
}
