import {
  mount,
  createLocalVue
} from '@vue/test-utils'
import Vuex from 'vuex'
import login from '@/components/login/login'

/**
 * 测试登陆组件
 */

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use({
  install (vue) {
    vue.component('v-input', {
      render (h) {
        return h('input')
      }
    })
    vue.component('v-helper', {
      render (h) {
        return h('span')
      }
    })
  }
})

/**
 * Declare vuex
 */
const globalState = {
  mutations: {
    setShowLogin: (state, flag) => { state.showLogin = flag },
    setPromptMessage: jest.fn()
  },
  state: {
    showLogin: false
  },
  namespaced: true
}
const store = new Vuex.Store({
  modules: {
    globalState,
    user: {
      mutations: {
        setUser: jest.fn()
      },
      namespaced: true
    }
  }
})

// 重写 transition组件
const transitionStub = () => ({
  render (h) {
    return this.$options._renderChildren
  }
})
const $axios = {
  post: jest.fn(() => Promise.resolve(Promise.resolve({ data: { data: {} } })))
}

let wrapper
beforeEach(() => {
  wrapper = mount(login, {
    localVue,
    store,
    stubs: {
      transition: transitionStub()
    },
    mocks: {
      $animate,
      $axios,
      $verify: jest.fn(() => true)
    }
  })
})

const $animate = jest.fn()

describe('test login component', () => {
  it('Tets when component when showLogin is false', () => {
    // 期望渲染注释节点
    expect(wrapper.vm.$el.nodeType).toBe(8)
    expect(wrapper.find('.git').exists()).toBeFalsy()
  })

  /**
   * 测试打开登陆对话框
   */
  it('Test when showLogin is true', async () => {
    store.commit('globalState/setShowLogin', true)
    await wrapper.vm.$nextTick()
    // 测试 enter事件
    wrapper.vm.enter({ querySelector () {} }, () => {})
    expect($animate).toHaveBeenCalled()
    wrapper.vm.leave({ querySelector () {} }, () => {})
    expect($animate.mock.calls.length).toBe(2)

    window.open = jest.fn()

    // 测试git登陆
    const gitBtn = wrapper.find('.git')
    expect(gitBtn.exists()).toBeTruthy()
    await gitBtn.trigger('click')

    // 测试微信登陆
    const weChatBtn = wrapper.find('.weichat')
    await weChatBtn.trigger('click')

    // 测试sign in 组件
    const signIn = wrapper.findComponent({ name: 'SignIn' })
    expect(signIn.exists()).toBe(true)
    // ---------测试使用邮箱登陆
    expect(signIn.vm.allowLoginByEmail).toBeFalsy()
    // 数据缺失的时候点击登陆
    await localVue.nextTick()
    // ---------设置登陆需要的数据
    signIn.setData({
      model: {
        email: '',
        password: 'password',
        captcha: 'captcha'
      }
    })
    await localVue.nextTick()
    await signIn.find('.login-btn').trigger('click')
    expect($axios.post).toHaveBeenCalledTimes(0)
    // ---------设置登陆需要的数据
    signIn.setData({
      model: {
        email: 'blog1997@qq.com',
        password: 'password',
        captcha: 'captcha'
      }
    })
    await localVue.nextTick()
    expect(signIn.vm.allowLoginByEmail).toBeTruthy()
    // --------点击登陆
    await signIn.find('.login-btn').trigger('click')
    expect($axios.post).toHaveBeenCalledWith('/auth/login', {
      email: 'blog1997@qq.com',
      password: 'password',
      captcha: 'captcha'
    })
    // 测试qq登陆
    // const qqBtn = wrapper.find('.qq')
    // expect(qqBtn.exists()).toBeTruthy()
    // await qqBtn.trigger('click')
    // expect(globalState.mutations.setPromptMessage).toHaveBeenCalledWith({ showLogin: true }, { msg: '马上就好', status: true })

    // mocks newWindow
    const close = jest.fn()
    window.newWindow = { close }
    const weichatBtn = wrapper.find('.weichat')
    expect(weichatBtn.exists()).toBeTruthy()
    await weichatBtn.trigger('click')
    expect(close).toHaveBeenCalled()

    // 测试 close事件
    wrapper.vm.close()
    expect(store.state.globalState.showLogin).toBe(false)
    delete window.open
    delete window.newWindow
  })

  /**
   * 测试忘记密码对话框
   */
  it('Test forgot password dialog', async () => {
    store.commit('globalState/setShowLogin', true)
    await wrapper.vm.$nextTick()

    // 切换忘记密码组件
    wrapper.get('.login-btns a').find('a').trigger('click')
    await localVue.nextTick()
    const forgotPassword = wrapper.findComponent({ name: 'ForgotPassword' })
    expect(forgotPassword.exists()).toBeTruthy()

    // -------设置邮箱数据
    expect(forgotPassword.vm.allowSubmit).toBeFalsy()
    forgotPassword.setData({
      model: {
        email: 'email@qq.com'
      }
    })
    expect(forgotPassword.vm.allowSubmit).toBeTruthy()
    // ------点击提交按钮
    forgotPassword.find('.login-btn').trigger('click')
    await localVue.nextTick()
    expect($axios.post).toHaveBeenCalledWith('/user/password/reset', {
      email: 'email@qq.com'
    })
  })

  /**
   * 测试注册组件
   */
  it('Test sign up dialog', async () => {
    store.commit('globalState/setShowLogin', true)
    await wrapper.vm.$nextTick()

    // 切换为注册组件
    await wrapper.get('.login-btns').findAll('a').at(1).trigger('click')
    await localVue.nextTick()

    const signUp = wrapper.findComponent({ name: 'SignUp' })
    expect(signUp.exists()).toBeTruthy()

    // ------------------ 测试注册部分
    // 设置数据缺失的情况
    signUp.setData({
      strength: 5,
      model: {
        email: '',
        password: 'password.qq.com@',
        password_confirmation: 'password.qq.com@',
        captcha: '123'
      }
    })
    expect(signUp.vm.allowSubmit).toBeFalsy()
    // 点击注册
    await signUp.find('.login-btn').trigger('click')

    expect(signUp.vm.allowSubmit).toBeFalsy()
    // 设置邮箱 密码 确认密码 验证码
    signUp.setData({
      strength: 5,
      model: {
        email: 'email@qq.com',
        password: 'password.qq.com@',
        password_confirmation: 'password.qq.com@',
        captcha: '123'
      }
    })
    expect(signUp.vm.allowSubmit).toBeTruthy()
    // 点击注册
    await signUp.find('.login-btn').trigger('click')
    expect($axios.post).toHaveBeenCalledWith('oauth/sign-up', {
      email: 'email@qq.com',
      password: 'password.qq.com@',
      password_confirmation: 'password.qq.com@',
      captcha: '123'
    })
  })
})
