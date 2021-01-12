import Vuex from 'vuex'
import { state, namespaced, mutations, actions } from '~/store/user'

const store = new Vuex.Store({ actions, state, namespaced, mutations })

store.$axios = {
  post: jest.fn()
    .mockReturnValueOnce(Promise.resolve({ data: { data: { id: 1, name: 'xy' } } }))
    .mockRejectedValue(new Error('fail'))
}
describe('test user store', () => {
  it('test getCurrentUser actions', async () => {
    await store.dispatch('getCurrentUser')
    expect(store.state).toEqual({ id: 1, name: 'xy', initialized: true })
    await store.dispatch('getCurrentUser')
    expect(store.$axios.post.mock.calls.length).toBe(1)
  })
  it('test clearUserInfo mutations', async () => {
    store.commit('clearUserInfo')
    expect(store.state).toEqual({})
    await store.dispatch('getCurrentUser')
    expect(store.state).toEqual({ id: '', name: '', initialized: true })
  })
})
