import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Dialog from '~/slot/dialog/dialog'

const localVue = createLocalVue()
localVue.use(Vuex)

localVue.prototype.$animate = jest.fn((a, b, c) => c())
/**
 * mock store
 */
const hidDialog = jest.fn()

const store = new Vuex.Store({
  modules: {
    globalState: {
      namespaced: true,
      mutations: {
        hidDialog
      },
      state: {
        showDialog: false
      }
    }
  }
})

/**
 * 测试dialog slot
 */

describe('test dialog slot', () => {
  it('test with default data', async () => {
    // mock setTimeout
    const setTimeout = window.setTimeout
    window.setTimeout = jest.fn((fn) => { fn() })
    const wrapper = shallowMount(Dialog, { localVue, store })

    const vm = wrapper.vm
    // 测试数据默认的状态
    expect(vm.title).toBe('title')
    expect(vm.width).toBe('52rem')
    expect(vm.height).toBe('16rem')
    expect(vm.computedWidth).toBe('26rem')
    expect(vm.computedHeight).toBe('8rem')

    // 测试close方法
    // 1、获取按钮
    const closeBtn = wrapper.find('.dialog > header > a')
    expect(closeBtn.exists()).toBeTruthy()
    // 2、触发 点击 事件
    await closeBtn.trigger('click')
    // 3、测试状态
    expect(vm.showDialog).toBe(true)
    expect(hidDialog).toHaveBeenCalled()
    expect(wrapper.emitted().close).toBeTruthy()

    // 测试leave和entry方法
    const el = vm.$el.querySelector('.dialog')
    vm.enter(el, () => {})
    vm.leave(el, () => {})
    vm.leaveCallback(el, () => {})

    window.setTimeout = setTimeout
  })
})
