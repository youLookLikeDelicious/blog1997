import Vuex from 'vuex'
import clearState from '~/middleware/base'

/**
 * mock store
 */
const search = {
  namespaced: true,
  mutations: {
    setSearchConfig: jest.fn()
  }
}
const globalState = {
  namespaced: true,
  mutations: {
    hidDialog: jest.fn(),
    clearVisibleBackDrop: jest.fn()
  }
}
const store = new Vuex.Store({
  modules: {
    search,
    globalState
  }
})
describe('test clear state middleware', () => {
  it('test', () => {
    const route = {
      name: 'search'
    }

    clearState({ store, route })
    expect(globalState.mutations.hidDialog).toHaveBeenCalled()
    expect(globalState.mutations.clearVisibleBackDrop).toHaveBeenCalled()
    expect(search.mutations.setSearchConfig).not.toHaveBeenCalled()

    route.name = 'index'

    clearState({ store, route })
    expect(globalState.mutations.hidDialog.mock.calls.length).toBe(2)
    expect(search.mutations.setSearchConfig).toHaveBeenCalled()
  })
})
