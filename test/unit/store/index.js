import Vuex from 'vuex'
import index from '~/store'

const reportArticle = jest.fn()
const reportIllegalInfo = {
  namespaced: true,
  mutations: {
    reportArticle
  }
}
const showDialog = jest.fn()
const globalState = {
  namespaced: true,
  mutations: {
    showDialog
  }
}

const store = new Vuex.Store({
  modules: {
    index,
    reportIllegalInfo,
    globalState
  },
  plugins: index.plugins
})

describe('test index store', () => {
  it('test plugins', () => {
    store.commit('reportIllegalInfo/reportArticle')
    expect(reportArticle).toHaveBeenCalled()
    expect(showDialog).toHaveBeenCalled()
  })
})
