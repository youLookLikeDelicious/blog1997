import { shallowMount, createLocalVue } from '@vue/test-utils'
import thumbUp from '@/components/common/thumb-up'
import Vuex from 'vuex'
import animate from '~/test/util/animate'
import { state, namespaced, mutations } from '~/store/user'
import { state as globalState, namespaced as globalNamespaces, mutations as globalMutations } from '~/store/globalState'

/**
 * 测试点赞组件
 * @created_at 2020/7/24
 * @author chaos
 */

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(animate)
localVue.use({
  install (vue) {
    vue.prototype.$userHasSignedIn = jest.fn(() => true)
  }
})

const store = new Vuex.Store({
  modules: {
    user: { state, namespaced, mutations },
    globalState: { state: globalState, namespaced: globalNamespaces, mutations: globalMutations }
  }
})

/**
     * 模拟axios
     */
const post = jest.fn(() => Promise.resolve())

localVue.use({
  install (vue) {
    vue.prototype.$axios = {
      post
    }
  }
})

describe('test thumb up component', () => {
  /**
    * 测试点赞组件的大拇指样式
    */
  it('test comment thumb', () => {
    const wrapper = shallowMount(thumbUp, { localVue, store, propsData: {} })
    const vm = wrapper.vm
    const $el = vm.$el
    expect(vm.category).toBe('comment')
    expect(vm.id).toBe('')
    expect(vm.thumbs).toBe(false)
    // 期望渲染的的元素 是大拇指样式
    expect($el.querySelector('.thumb-up-wrap')).toBeTruthy()
    // 期望手掌样式 不被渲染
    expect($el.querySelector('.claps')).toBeFalsy()
    // 当点赞数为0的时候，span标签不被渲染
    expect($el.querySelector('span')).toBeFalsy()
    // 当前用户没有点赞，期望a标签没有.thumbs样式
    expect($el.querySelector('a.thumbs')).toBeFalsy()

    // 更改状态
    wrapper.setProps({
      liked: 5,
      thumbs: true
    })
    vm.$nextTick(() => {
      // 期望显示 '5 赞'信息
      expect($el.querySelector('span').innerHTML).toContain('5 赞')
      // 期望a标签包含类thumbs
      expect($el.querySelector('a.thumbs')).toBeTruthy()
    })
  })

  /**
   * 测试点赞组件的手掌样式
   */
  it('test article thumb', () => {
    const wrapper = shallowMount(thumbUp, {
      localVue,
      store,
      propsData: {
        category: 'article'
      }
    })
    const vm = wrapper.vm
    const $el = vm.$el

    // 用户没有登陆|当前用户没有点赞，期望a标签的title为 '点赞'
    expect($el.querySelector('a').title).toBe('点赞')
    // 点赞数量为0，期望span标签没有渲染
    expect($el.querySelector('span')).toBeFalsy()

    // 更改props，设置点赞数量为 7， 当前用户已点赞
    wrapper.setProps({
      liked: 7,
      thumbs: true
    })
    vm.$nextTick(() => {
      // 点赞数量为7，期望span标签的内容为 '7 赞'
      expect($el.querySelector('span').innerHTML).toBe('7 赞')
    })
  })

  /**
   * 测试用户未登录时点赞
   */
  it('test thumb event when user not login', async () => {
    const wrapper = shallowMount(thumbUp, {
      localVue,
      store,
      propsData: {
        category: 'article',
        id: 7
      }
    })

    wrapper.vm.$userHasSignedIn = () => false
    // 触发点赞的 a标签的 click事件
    const aElement = wrapper.get('a')
    // 1、用户未登录，不做任何操作
    await aElement.trigger('click')
    // emit thumbUp不会被触发
    expect(wrapper.emitted().thumbUp).toBeFalsy()
  })

  /**
   * 测试用户登陆时点赞
   */
  it('test thumb event when user login', async () => {
    store.commit('user/setUser', { id: 7 })
    const wrapper = shallowMount(thumbUp, {
      localVue,
      store,
      propsData: {
        category: 'article',
        id: 7
      }
    })

    const aElement = wrapper.get('a')
    wrapper.vm.isUploading = true
    await aElement.trigger('click')
    expect(wrapper.emitted().thumbUp).toBeFalsy()
    // 触发 emit thumbUp
    wrapper.vm.isUploading = false
    await aElement.trigger('click')
    expect(wrapper.emitted().thumbUp.length).toBe(1)
    expect(post).toHaveBeenCalledWith('thumb-up', { id: 7, category: 'article' })
  })
})
