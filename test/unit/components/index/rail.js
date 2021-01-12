import { mount, RouterLinkStub } from '@vue/test-utils'
import rail from '@/components/index/rail'

describe('test rail component', () => {
  it('test with default data', () => {
    const wrapper = mount(rail, {
      stubs: {
        'nuxt-link': RouterLinkStub
      }
    })

    expect(() => wrapper.get('.popular-article')).toThrow()
    const ul = wrapper.vm.$el.querySelector('.index-about-me > ul')
    expect(ul.innerHTML).toContain('文章: 0篇')
    expect(ul.innerHTML).toContain('留言: 0')
  })

  it('test with custom props data', () => {
    const popArticles = [
      {
        title: 'pop article 1',
        identity: 12
      },
      {
        title: 'pop article 1',
        identity: 12
      }
    ]

    const wrapper = mount(rail, {
      stubs: {
        NuxtLink: RouterLinkStub
      },
      propsData: {
        articleNum: 10,
        messageNum: 12,
        popArticles
      }
    })

    expect(wrapper.get('.popular-article')).toBeTruthy()
    const ul = wrapper.vm.$el.querySelector('.index-about-me > ul')
    expect(ul.innerHTML).toContain('文章: 10篇')
    expect(ul.innerHTML).toContain('留言: 12')

    // 期望渲染两个nuxt link
    const nuxtLink = wrapper.findAllComponents(RouterLinkStub)

    // 获取文章列表
    const lis = wrapper.vm.$el.querySelectorAll('.popular-article > li')
    expect(nuxtLink.length).toBe(2)
    for (let i = 1, len = lis.length; i < len; i++) {
      const a = lis[i].querySelector('a')
      expect(a.innerHTML).toContain(popArticles[i - 1].title)
      expect(nuxtLink.at(i - 1).vm.to).toBe(`/article/${popArticles[i - 1].identity}`)
    }
  })
})
