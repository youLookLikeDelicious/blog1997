import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import promptMessage from '@bit/blog1997.vue-collection.prompt-message/prompt-message.vue'
import layout from '~/layouts/default'
import Waiting from '~/components/common/waiting'
import reportIllegalInfo from '~/components/common/report-illegal-info'
import nuxt from '~/.nuxt/components/nuxt'

const localVue = createLocalVue()
localVue.component('waiting', Waiting)
localVue.component('reportIllegalInfo', reportIllegalInfo)
localVue.component('promptMessage', promptMessage)
localVue.component('nuxt', nuxt)

const getCurrentUser = jest.fn()

const store = new Vuex.Store({
  modules: {
    globalState: {
      state: {
        showDialog: false
      }
    },
    user: {
      namespaced: true,
      actions: {
        getCurrentUser
      }
    }
  }
})

const $animate = jest.fn()
localVue.use({
  install (vue) {
    vue.prototype.$animate = $animate
  }
})

localVue.use(Vuex)

const $canUseWebp = jest.fn()
window.$nuxt = {
  context: {
    app: {
      $canUseWebp
    }
  }
}
describe('Test layout', () => {
  it('test', async () => {
    document.addEventListener = jest.fn()
    const wrapper = shallowMount(layout, {
      localVue,
      store
    })

    expect(document.addEventListener).toHaveBeenCalledWith('scroll', wrapper.vm.scrollDocumentElement)
    // 测试挂载的组件
    expect(wrapper.findComponent({ name: 'Waiting' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'Navigate' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'Foot' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'Login' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'ReportIllegalInfo' }).exists()).toBeFalsy()
    expect($canUseWebp).toHaveBeenCalled()
    expect(getCurrentUser).toHaveBeenCalled()

    let scrollTopBtn = wrapper.find('.scroll-to-top')
    expect(scrollTopBtn.exists()).toBeFalsy()

    // mock scroll 重新获取按钮
    // 1、显示 滚动到顶部按钮
    document.documentElement.scrollTop = '700'
    wrapper.vm.scrollDocumentElement()
    await wrapper.vm.$nextTick()
    scrollTopBtn = wrapper.find('.scroll-to-top')
    expect(scrollTopBtn.exists()).toBeTruthy()

    // 触发按钮 click事件
    await scrollTopBtn.trigger('click')
    expect($animate).toHaveBeenCalledWith(document.documentElement, { 'scrollTop': 0, duration: 258 })
    // 2、不隐藏按钮
    document.documentElement.scrollTop = '0'
    wrapper.vm.showScrollToTop = false
    wrapper.vm.scrollDocumentElement()
    await wrapper.vm.$nextTick()
    scrollTopBtn = wrapper.find('.scroll-to-top')
    expect(scrollTopBtn.exists()).toBeFalsy()
    // 3、隐藏滚动到顶部按钮
    wrapper.vm.showScrollToTop = true
    document.documentElement.scrollTop = '0'
    wrapper.vm.scrollDocumentElement()
    await wrapper.vm.$nextTick()
    scrollTopBtn = wrapper.find('.scroll-to-top')
    expect(scrollTopBtn.exists()).toBeFalsy()

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.allowRenderMainPage).toBe(false)
    })
    wrapper.vm.reload()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.allowRenderMainPage).toBe(true)
    })

    // 测试destroy 事件
    document.removeEventListener = jest.fn()
    wrapper.vm.$destroy()
    expect(document.removeEventListener).toHaveBeenCalledWith('scroll', wrapper.vm.scrollDocumentElement)
  })
})
