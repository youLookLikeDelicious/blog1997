import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
// import { resolve } from 'core-js/fn/promise'
import Search from '~/pages/search/index'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use({
  install (vue) {
    vue.prototype.$axios = {
      post: jest.fn(() => Promise.resolve({ data: { data: '' } }))
    }

    vue.filter('filterSearchType', a => a)
  }
})

/**
 * mock store
 */
const setSearchConfig = jest.fn()
const store = new Vuex.Store({
  modules: {
    search: {
      state: {
        keyword: 'keyword'
      },
      namespaced: true,
      mutations: {
        setSearchConfig
      }
    },
    globalState: {
      mutations: {
        clearVisibleBackDrop: jest.fn()
      }
    }
  }
})

/**
 * 测试 search组件
 */
describe('test search page', () => {
  it('test without data', () => {
    const get = jest.fn()
    const wrapper = shallowMount(Search, {
      localVue,
      store,
      mocks: {
        $route: {
          query: {
            keyword: 'keyword'
          }
        }
      }
    })

    // 默认情况下，不期望waiting in progress组件被加载
    expect(wrapper.findComponent({ name: 'WaitingInProgress' }).exists()).toBeFalsy()
    // 默认请胯下，不期望articleList组件被加载
    expect(wrapper.findComponent({ name: 'ArticleList' }).exists()).toBeFalsy()
    // 希望渲染相关的元素
    expect(() => wrapper.get('.search-header')).not.toThrow()
    expect(() => wrapper.get('.search-not-fond')).not.toThrow()

    // 测试 computed 值
    expect(wrapper.vm.currentKeyword).toBe('keyword')
    expect(wrapper.vm.getMoreCondition).toBe('keyword=keyword&orderBy=mixed')

    // 测试查询事件, 路由参数和store参数匹配，不进行任何操作
    wrapper.vm.search()
    expect(get).not.toHaveBeenCalled()
  })

  it('test with predefined data', async (done) => {
    const wrapper = shallowMount(Search, {
      localVue,
      store,
      mocks: {
        $route: {
          query: {
            keyword: 'query keyword'
          },
          path: 'route-path'
        }
      },
      data () {
        return {
          articles: [{}, {}, {}],
          total: 100,
          pages: 12
        }
      }
    })

    await localVue.nextTick()

    // 期望waiting in progress组件被加载
    expect(wrapper.findComponent({ name: 'WaitingInProgress' }).exists()).toBeFalsy()
    // 期望articleList组件被加载
    expect(wrapper.findComponent({ name: 'ArticleList' }).exists()).toBeTruthy()
    // 希望渲染相关的元素
    expect(() => wrapper.get('.search-header')).not.toThrow()
    // 查询未果 提示不期望 被渲染
    expect(() => wrapper.get('.search-not-fond')).toThrow()

    // 测试 computed 值
    expect(wrapper.vm.getMoreUrl).toBe('route-path')
    expect(wrapper.vm.currentKeyword).toBe('keyword')
    expect(wrapper.vm.getMoreCondition).toBe('keyword=keyword&orderBy=mixed')

    // 因为 search组件在mounted中使用了setTimeout方法
    // 测试查询事件, 路由参数和store参数不匹配，进行相关操作
    window.setTimeout(() => {
      expect(wrapper.vm.$axios.post).toHaveBeenCalledWith('article/search', {
        keyword: 'query keyword',
        orderBy: 'mixed'
      })
      wrapper.vm.searchInProgress = true
      wrapper.vm.search()
      expect(wrapper.vm.$axios.post).toHaveBeenCalledTimes(1)
      done()
    }, 0)
  })
})
