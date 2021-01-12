import { shallowMount, createLocalVue } from '@vue/test-utils'
import nuxtLink from '~/.nuxt/components/nuxt-link.client.js'

import Tag from '~/pages/tag/_id'

const localVue = createLocalVue()

localVue.component('nuxt-link', nuxtLink)

describe('test tag page', () => {
  it('test', async () => {
    const wrapper = shallowMount(Tag, { localVue })
    // 期望articleList不会被渲染
    expect(wrapper.findComponent({ name: 'articleList' }).exists()).toBeFalsy()
    // 不会渲染列表
    expect(() => wrapper.get('.tag-list > ul')).toThrow()
    let currentTag = wrapper.vm.$el.querySelector('.current-tag')
    // 期望当前的标签名称为空
    expect(currentTag.innerHTML).toBe('')
    // 期望标签数量被正确的渲染
    expect(currentTag.nextElementSibling.innerHTML).toBe('该标签共收录 0 篇文章')
    // 测试 computed。getMoreCondition
    expect(wrapper.vm.getMoreCondition).toBe('')

    wrapper.setData({
      articles: [{}, {}],
      tags: [{ name: 'tags1', id: 1 }, { name: 'tags2', id: 2 }],
      currentTagId: 2,
      articleNum: 5
    })

    await wrapper.vm.$nextTick()

    // tags不为空，会渲染列表
    const tagList = wrapper.vm.$el.querySelectorAll('.tag-list > ul li')
    expect(tagList.length).toBe(2)
    currentTag = wrapper.vm.$el.querySelector('.current-tag')
    // 期望当前标签的名称是 tags2
    expect(currentTag.innerHTML).toBe('tags2')
    expect(wrapper.vm.currentTag).toEqual({ name: 'tags2', id: 2 })
    // 期望标签数量被正确的渲染
    expect(currentTag.nextElementSibling.innerHTML).toBe('该标签共收录 5 篇文章')
    // 期望渲染 articleList组件
    expect(wrapper.findComponent({ name: 'articleList' }).exists()).toBeTruthy()
    // 测试 computed。getMoreCondition
    expect(wrapper.vm.getMoreCondition).toBe('tagId=2')
  })

  /**
   * 测试nuxt的 asyncData方法
   */
  it('test async data', async () => {
    const error = new Error('error')
    /**
     * mock axios
     */
    const $axios = {
      get: jest.fn()
        .mockReturnValueOnce(Promise.resolve('resolve'))
        .mockReturnValueOnce(Promise.resolve('resolve'))
        .mockReturnValueOnce(Promise.reject(error))
    }

    /**
     * mock $responseHandler
     */
    const $responseHandler = jest.fn(() => 'return value')
    const params = {
      id: ''
    }

    let data = await Tag.asyncData({ $responseHandler, app: { $axios }, params, res: 'res', req: 'req' })
    expect($axios.get).toHaveBeenCalledWith('/article/tags', 'req')
    expect(data).toBe('return value')
    expect($responseHandler).toHaveBeenCalledWith('resolve', 'res')

    params.id = 2
    await Tag.asyncData({ $responseHandler, app: { $axios }, params, res: 'res', req: 'req' })
    expect($axios.get).toHaveBeenCalledWith('/article/tags?tag_id=2', 'req')

    data = await Tag.asyncData({ $responseHandler, $axios, res: 'res', params, app: { $axios }, req: 'req' })
    expect($responseHandler.mock.calls.length).toBe(2)
    expect(data).not.toBe('return value')
  })
})
