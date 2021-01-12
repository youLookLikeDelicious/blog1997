import { mount, shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import articleTags from '~/components/index/article-tags'

const localVue = createLocalVue()

localVue.use(Vuex)

const search = {
  state: {

  },
  namespaced: true,
  mutations: {
    setSearchConfig: jest.fn()
  }
}

const store = new Vuex.Store({ modules:
    { search }
})

const reload = jest.fn()
/**
 * 测试文章标签组件
 */
describe('test article tags component', () => {
  /**
   * 测试默认的状态
   */
  it('test default state', () => {
    const $router = {
      push: jest.fn()
    }
    const wrapper = shallowMount(articleTags, {
      localVue,
      stubs: { NuxtLink: RouterLinkStub },
      provide: {
        reload
      },
      mocks: {
        $router,
        $route: {
          fullPath: ''
        }
      }
    })
    // 没有关键词，不会显示标签
    expect(() => wrapper.get('.tag')).toThrow()
    // 默认会显示 阅读全文 按钮
    expect(wrapper.get('.read-more')).toBeTruthy()
  })

  /**
   * 测试 给定数据下的状态
   */
  it('test with predefined data', () => {
    const $router = {
      push: jest.fn()
    }
    const propsData = {
      tags: [ {
        name: 'keywords'
      }, {
        name: 'test'
      }],
      showReadMore: false
    }
    const wrapper = mount(articleTags, {
      localVue,
      propsData,
      stubs: { NuxtLink: RouterLinkStub },
      provide: {
        reload
      },
      mocks: {
        $router,
        $route: {
          fullPath: '/'
        }
      }
    })

    const a = wrapper.vm.$el.querySelectorAll('.tag > a')
    // 期望渲染两个标签
    expect(a.length).toBe(2)
    expect(a[0].innerHTML).toContain('keywords')
    expect(a[1].innerHTML).toContain('test')

    // 阅读更多期望不被渲染
    expect(() => wrapper.get('.read-more')).toThrow()
  })

  /**
   * 测试标签的点击事件
   */
  it('test tag click event', async (done) => {
    const $router = {
      push: jest.fn()
    }
    const wrapper = mount(articleTags, {
      store,
      localVue,
      propsData: { tags: [{
        name: 'tags',
        id: 12
      }] },
      stubs: { NuxtLink: RouterLinkStub },
      provide: {
        reload
      },
      mocks: {
        $router,
        $route: {
          fullPath: '/',
          name: ''
        }
      }
    })

    // 点击关键字标签
    const tag = wrapper.get('.tag > a')
    await tag.trigger('click')
    expect($router.push).toHaveBeenCalled()
    expect(reload).not.toHaveBeenCalled()

    // 点击标签
    wrapper.vm.$route.fullPath = ''
    await tag.trigger('click')
    await localVue.nextTick()
    expect($router.push).toHaveBeenCalledWith('/search?tag_id=12')
    expect(reload).not.toHaveBeenCalled()
    // 再次点击 tag_id没有改变, 期望不会触发push事件
    wrapper.setData({
      $route: {
        fullPath: '/search?tag_id=12'
      }
    })
    await tag.trigger('click')
    await localVue.nextTick()
    expect($router.push).toHaveBeenCalledTimes(2)

    wrapper.setData({
      $route: {
        name: 'search',
        fullPath: ''
      }
    })
    await localVue.nextTick()
    await tag.trigger('click')
    expect($router.push).toHaveBeenCalledWith('/search?tag_id=12')
    expect(reload).toHaveBeenCalled()
    done()
  })
})
