import Vuex from 'vuex'
import { namespaced, mutations, state } from '~/store/reportIllegalInfo'

const store = new Vuex.Store({ namespaced, mutations, state })

describe('test report illegal info store', () => {
  it('test mutations', () => {
    expect(store.state.for).toBe('article')
    expect(store.state.reportedId).toBe(0)
    expect(store.state.preDefinedContent).toBe('')

    // mock default station
    store.commit('reportComment', { })
    expect(store.state.for).toBe('comment')

    // mock with specified data
    store.commit('reportComment', { preDefinedContent: 'preDefinedContent', reportedId: 'reportedId' })
    expect(store.state.preDefinedContent).toBe('preDefinedContent')
    expect(store.state.reportedId).toBe('reportedId')

    store.commit('reportArticle', { })
    expect(store.state.for).toBe('article')

    store.commit('reportArticle', { preDefinedContent: 'preDefinedContent2', reportedId: 'reportedId2' })
    // mock store.state.for === article station
    expect(store.state.reportedId).toBe('reportedId2')
    expect(store.state.preDefinedContent).toBe('preDefinedContent2')
  })
})
