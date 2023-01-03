import { mount, createLocalVue, RouterLinkStub, shallowMount } from '@vue/test-utils'
import newArticle from '@/components/index/new-article'

const localVue = createLocalVue()
localVue.component('backDrop', {
  render (h) {
    return h('div')
  }
})

const dateFormat = jest.fn()
localVue.filter('dateFormat', dateFormat)

localVue.use({
  install (vue) {
    vue.prototype.$initHTML = a => a.summary
    vue.component('avatar', {
      render (h) {
        return h('img')
      }
    })
  }
})

describe('test new article component', () => {
  it('test with default data', () => {
    const wrapper = shallowMount(newArticle, {
      mocks: {
      }
    })
    expect(wrapper.vm.$el.nodeType).toBe(8)
  })
  it('test with predefined data', async () => {
    const article = {
      title: 'title',
      commented: 3,
      author: {
        name: 'user name',
        id: 1,
        avatar: 'user/avatar'
      },
      summary: 'summary',
      gallery: {
        id: '1',
        url: 'gallery url'
      },
      tags: [],
      identity: '1',
      is_origin: 'yes',
      keywords: 'tag,keywords',
      updated_at: '12312312'
    }

    const reload = jest.fn()
    const wrapper = mount(newArticle, { localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      propsData: {
        article
      },
      provide: {
        reload
      }
    })

    await localVue.nextTick()
    const $el = wrapper.vm.$el
    // 期望摘要的内容和提供的数据一致
    expect(wrapper.get('.article-summary').text()).toBe(article.summary)
    // 期望标题
    expect($el.querySelector('h1').innerHTML).toContain(article.title)
    // 期望作者名被 加载
    expect($el.querySelector('.user-name').innerHTML).toContain(article.author.name)
    // 期望 dateFormat filter被调用
    expect(dateFormat).toHaveBeenCalled()
    // 期望keyword组件被渲染
    expect(wrapper.findComponent({ name: 'keywords' })).toBeTruthy()
  })
})
