import {
  mount,
  createLocalVue
} from '@vue/test-utils'
import friendLinkComponent from '@/components/layout/foot'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

/**
 * mock friend link store
 */
const globalState = {
  state: {
    friendLinkList: [
      {
        url: 'url',
        name: 'name'
      },
      {
        url: 'url2',
        name: 'name2'
      }
    ]
  },
  namespaced: true
}

const store = new Vuex.Store({
  modules: {
    globalState
  }
})

const storeWithoutData = new Vuex.Store({
  modules: {
    globalState: {
      state: {
        friendLinkList: ''
      },
      namespaced: true
    }
  }
})
/**
 * 测试foot组件
 */
describe('test foot component', () => {
  it('test there is no friend link', () => {
    const wrapper = mount(friendLinkComponent, { store: storeWithoutData, localVue })
    expect(() => wrapper.get('.friend-link')).toThrow()
  })
  it('test there is 2 friend link', () => {
    const wrapper = mount(friendLinkComponent, { localVue, store })

    // 获取所有的友链连接
    const links = wrapper.vm.$el.querySelectorAll('.friend-link > a')
    for (let i = 0, len = links.length; i < len; i++) {
      expect(links[i].href).toBe(globalState.state.friendLinkList[i].url)
      expect(links[i].innerHTML).toBe(globalState.state.friendLinkList.state[i].name)
    }
  })
})
