import { shallowMount, createLocalVue } from '@vue/test-utils'
import articleList from '@/components/common/article-list.vue'
import Vuex from 'vuex'
import nuxtLink from '~/.nuxt/components/nuxt-link.client'

const localVue = createLocalVue()

localVue.use(Vuex)

// 创建全局状态
const store = new Vuex.Store({
  modules: {
    globalState: {
      state: {
        visibleBackDrop: []
      },
      mutations: {
        clearVisibleBackDrop: jest.fn()
      }
    }
  }
})

// mock $initHTML
localVue.use({
  install (vue) {
    vue.prototype.$initHTML = content => content
    vue.component('avatar', {})
  }
})

const dateFormat = jest.fn()
// 将unix时间戳转为字符串
localVue.filter('dateFormat', dateFormat)

// mock plugins
localVue.use({
  install (vue) {
    vue.prototype.$initializeHTML = jest.fn()
  }
})

// mock backdrop component
localVue.component('backDrop', {
  template: '<div>backdrop</div>'
})

localVue.component('nuxt-link', nuxtLink)

/**
 * 测试 article list 组件
 */
describe('test article-list component', () => {
// 测试props.article 为 []的组件
  it('test there is no article', async function () {
    // 挂载组件
    const wrapper = shallowMount(articleList, {
      localVue,
      store
    })

    const $el = wrapper.vm.$el
    // 没有文章,article列表不会被渲染
    expect($el.querySelectorAll('article').length).toBe(0)

    await localVue.nextTick()
    // mounted 后 $initializeHTML被调用
    expect(localVue.prototype.$initializeHTML).toHaveBeenCalled()

    // 没有记录，出现暂无数据
    expect($el.querySelector('.there-is-no-more').innerHTML).toMatch(/.+?暂无数据.*/)
    expect(wrapper.vm.thereIsNoMoreData).toBe(' 暂无数据 |ω・）')
    // 阅读更多标签不会渲染
    expect($el.querySelector('.read-more-article')).toBeNull()
    // 没有调用filter
    expect(dateFormat.mock.calls.length).toBe(0)
  })

  // 测试props.articles不为空的状态
  it('test there is 3 articles', async function () {
    const articles = [
      {
        id: 1,
        title: 'test',
        created_at: '1582274433',
        commented: 12,
        summary: '摘要',
        tags: ['tags'],
        gallery_id: 1,
        gallery: {
          url: 'http://www.blog1997.com:88/image/gallery/2019-11-06/365.056133001575dc2d5150db4f0.52988517.jpg'
        },
        author: {
          avatar: '头像url',
          name: 'chaos'
        }
      },
      {
        id: 1,
        title: 'test',
        created_at: '1582274433',
        commented: 12,
        summary: '摘要',
        tags: ['tags'],
        gallery_id: 1,
        gallery: {
          url: 'http://www.blog1997.com:88/image/gallery/2019-11-06/365.056133001575dc2d5150db4f0.52988517.jpg'
        },
        author: {
          avatar: '头像url',
          name: 'chaos'
        }
      },
      {
        id: 1,
        title: 'test',
        created_at: '1582274433',
        commented: 12,
        summary: '摘要',
        tags: ['tags'],
        gallery_id: 1,
        gallery: {
          url: 'http://www.blog1997.com:88/image/gallery/2019-11-06/365.056133001575dc2d5150db4f0.52988517.jpg'
        },
        author: {
          avatar: '头像url',
          name: 'chaos'
        }
      }
    ]
    // 挂载组件
    const wrapper = shallowMount(articleList, {
      propsData: {
        articles,
        page: 1,
        pages: 1
      },
      store,
      localVue
    })

    const $el = wrapper.vm.$el
    // 没有文章,article列表不会被渲染
    expect($el.querySelectorAll('article').length).toBe(3)

    // 已显示全部记录
    expect(wrapper.vm.thereIsNoMoreData).toBe(' 已经是全部了 |ω・）')
    expect($el.querySelector('.there-is-no-more').innerHTML).toMatch(/.+?已经是全部了.*/)
    // 阅读更多标签不会渲染
    expect($el.querySelector('.read-more-article')).toBeNull()

    // 调用三次filter
    expect(dateFormat.mock.calls.length).toBe(articles.length)
    expect(dateFormat.mock.calls[0][0]).toBe(articles[0].created_at)

    // 更改数据
    wrapper.setProps({
      p: 1,
      pages: 2
    })

    await wrapper.vm.$nextTick()
    // 已显示部分数据
    expect(wrapper.vm.pages).toBe(2)

    // 期望渲染.read-more-article元素
    const readMoreBtn = wrapper.find('.read-more-article')
    expect(readMoreBtn.exists()).toBeTruthy()
    // 期望.read-more-article元素的内容包含内容: 阅读更更多
    expect(readMoreBtn.text()).toMatch(/阅读更多/)

    // 触发.read-more-article的点击事件
    await wrapper.find('.read-more-article>a').trigger('click')
    expect(wrapper.emitted().getMoreArticle).toBeTruthy()
  })
})
