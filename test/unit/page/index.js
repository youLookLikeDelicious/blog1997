import { shallowMount } from '@vue/test-utils'

import Index from '~/pages/index'

/**
 * 测试首页
 */

describe('test index page', () => {
  it('test whit empty data', () => {
    const wrapper = shallowMount(Index)
    expect(wrapper.vm.articles.length).toBe(0)
    expect(wrapper.findComponent({ name: 'NewArticle' }).exists()).toBeFalsy()
    expect(wrapper.findComponent({ name: 'Rail' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'ArticleList' }).exists()).toBeFalsy()

    // 测试head方法
    expect(Index.head()).toEqual({
      title: 'Blog1997',
      meta: [
        { name: 'keywords', content: 'blog1997,个人博客', hid: 'keywords' },
        { name: 'description', content: 'PHP,JavaScript,Docker,Linux', hid: 'description' }
      ]
    })
  })

  it('test with predefined data', () => {
    const wrapper = shallowMount(Index)

    wrapper.setData({
      articles: [
        {
          commented: 0,
          created_at: 1587385196,
          gallery: {
            id: 'gallery id',
            url: 'gallery url'
          },
          gallery_id: 3,
          id: 'NA==',
          is_origin: 'yes',
          keywords: '1',
          summary: '...</pre>',
          thumbs: [],
          title: 'test',
          updated_at: 1594171203,
          user: { id: 1, name: 'chaos' },
          user_id: 1,
          visited: 28
        },
        {

        }
      ],
      popArticles: [{}, {}],
      articleNum: 10,
      messageNum: 12
    })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.articles.length).toBe(2)
      expect(wrapper.findComponent({ name: 'NewArticle' }).exists()).toBeTruthy()
      expect(wrapper.findComponent({ name: 'Rail' }).exists()).toBeTruthy()
      expect(wrapper.findComponent({ name: 'ArticleList' }).exists()).toBeTruthy()
    })

    // 测试 watch user方法
  })

  it('test async data', async () => {
    const error = new Error('error')
    /**
     * mock axios
     */
    const $axios = {
      get: jest.fn()
        .mockReturnValueOnce(Promise.resolve('resolve'))
        .mockReturnValueOnce(Promise.reject(error))
    }

    /**
     * mock $responseHandler
     */
    const $responseHandler = jest.fn(() => 'return value')

    let data = await Index.asyncData({ $responseHandler, app: { $axios }, res: 'res', req: 'req' })
    expect($axios.get).toHaveBeenCalledWith('', 'req')
    expect(data).toBe('return value')
    expect($responseHandler).toHaveBeenCalledWith('resolve', 'res')

    data = await Index.asyncData({ $responseHandler, $axios, res: 'res', app: { $axios }, req: 'req' })
    expect($responseHandler.mock.calls.length).toBe(1)
    expect(data).not.toBe('return value')
  })
})
