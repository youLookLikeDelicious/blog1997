import Vuex from 'vuex'
import { state, namespaced, mutations } from '~/store/search'

const store = new Vuex.Store({ state, namespaced, mutations })

describe('test search store', () => {
  it('test', () => {
    expect(store.state.keyword).toBe('')
    expect(store.state.type).toBe('')

    store.commit('setSearchConfig', { keyword: 'keyword', type: 'type' })
    expect(store.state.keyword).toBe('keyword')
    expect(store.state.type).toBe('type')

    store.commit('setSearchConfig', { keyword: 'keyword', type: 'type' })
  })
})
