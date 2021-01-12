import { shallowMount, createLocalVue } from '@vue/test-utils'
import waiting from '@/components/common/waiting.vue'
import Vuex from 'vuex'
import animate from '@blog1997/animate'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use({
  install (vue) {
    vue.prototype.$animate = animate
  }
})
/**
 * mock vuex
 */
const store = new Vuex.Store({
  modules: {
    globalState: {
      namespaced: true,
      state: {
        waiting: false
      },
      mutations: {
        showWaiting (state) {
          state.waiting = true
        }
      }
    }
  }
})

describe('test waiting component', () => {
  // 测试isShow为null的状态
  test('test not show state', function () {
    // 挂载组件
    const wrapper = shallowMount(waiting, { store, localVue })
    expect(wrapper.vm.show).toBeFalsy()
    // 表明是注释节点
    expect(wrapper.vm.$el.nodeType).toEqual(8)

    store.commit('globalState/showWaiting')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.show).toBeTruthy()
      expect(wrapper.element.className).toEqual('waiting')
    })
    expect(() => wrapper.vm.waitingAnimate()).not.toThrow()

    // 测试动画的回调
    expect(() => wrapper.vm.animateCallBack()).not.toThrow()
  }, 6000)
})
