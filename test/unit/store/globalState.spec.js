import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { state, actions, namespaced, mutations } from '~/store/globalState'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({ state, actions, namespaced, mutations })

store.$axios = {
  get: jest.fn()
    .mockReturnValueOnce(Promise.resolve({ data: { data: [1, 3] } }))
}

describe('test global state store', () => {
  it('test mutations', async () => {
    expect(store.state.prompt).toEqual([])

    // 测试prompt message
    // ------------------ 测试 set prompt message
    store.commit('setPromptMessage', { msg: 'msg', status: false })
    expect(store.state.prompt).toEqual(expect.arrayContaining([{ message: 'msg', status: false, symbol: store.state.prompt[0].symbol }]))
    store.commit('setPromptMessage', { msg: 'msg', status: false })
    // ------------------ 测试 shiftPromptMessage
    expect(store.state.prompt.length).toBe(2)
    store.commit('shiftPromptMessage')
    expect(store.state.prompt.length).toBe(1)
    store.commit('shiftPromptMessage')
    expect(store.state.prompt.length).toBe(0)
    store.commit('shiftPromptMessage')

    // 测试 visibleBackDrop
    expect(store.state.visibleBackDrop).toEqual([])
    // -------------------- 测试pushVisibleBackDrop
    store.commit('pushVisibleBackDrop', 1)
    expect(store.state.visibleBackDrop).toEqual(expect.arrayContaining([1]))
    store.commit('pushVisibleBackDrop', 1)
    expect(store.state.visibleBackDrop.length).toBe(1)
    // -------------------- 测试clearVisibleBackDrop
    store.commit('clearVisibleBackDrop', 1)
    expect(store.state.visibleBackDrop.length).toBe(0)

    // mock msg === state.prompt.message
    store.commit('setPromptMessage', { msg: 'msg1', status: false })
    // mock status !== state.prompt.status
    store.commit('setPromptMessage', { msg: 'msg1', status: true })

    expect(store.state.waiting).toBe(false)
    store.commit('setWaitingState', true)
    expect(store.state.waiting).toBe(true)

    expect(store.state.showLogin).toBe(false)
    store.commit('setShowLogin', true)
    expect(store.state.showLogin).toBe(true)

    expect(store.state.showLogin).toBe(true)
    store.commit('setShowLogin', false)
    expect(store.state.showLogin).toBe(false)

    expect(store.state.showDialog).toBe(false)
    store.commit('showDialog')
    expect(store.state.showDialog).toBe(true)
    store.commit('hidDialog')
    expect(store.state.showDialog).toBe(false)

    expect(store.state.canUseWebp).toBe(true)
    store.commit('setCanUseWebp', false)
    expect(store.state.canUseWebp).toBe(false)

    expect(store.state.friendLinkList.length).toBe(0)
    await store.dispatch('getFriendLink')
    expect(store.state.friendLinkList).toEqual(expect.arrayContaining([1, 3]))
  })
})
