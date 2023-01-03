import {
  mount,
  createLocalVue
} from '@vue/test-utils'
import navigate from '@/components/layout/navigate'
import Vuex from 'vuex'
import animate from '@blog1997/animate'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use({
  install (vue) {
    vue.prototype.$animate = animate
    vue.component('avatar', {
      render () {
        return ''
      }
    })
  }
})
/**
 * mock reload provide
 */
const reload = jest.fn()

/**
 * mock $route
 */
const $route = {
  path: '/some/path',
  name: 'index'
}

/**
 * 测试导航栏
 */
describe('test navigate component', () => {
  it('test when user not login, search keyword is empty', async () => {
    /**
     * mock $router
     */
    const $router = {
      push: jest.fn()
    }

    const userStore = {
      state: {
        id: ''
      },
      mutations: {
        clearUserInfo: jest.fn()
      },
      namespaced: true
    }

    const search = {
      state: {
        keyword: ''
      },
      mutations: {
        setSearchType: jest.fn(),
        setKeyword: jest.fn()
      },
      namespaced: true
    }

    const globalState = {
      state: {

      },
      mutations: {
        setShowLogin: jest.fn()
      },
      namespaced: true
    }

    const store = new Vuex.Store({
      modules: {
        globalState,
        user: userStore,
        search
      }
    })

    const $preventEvent = jest.fn()
    const wrapper = mount(navigate, {
      provide: {
        reload
      },
      localVue,
      store,
      mocks: {
        $route,
        $router,
        $preventEvent
      }
    })

    // 期望默认不是手机适配模式
    expect(wrapper.vm.isMobileModel()).toBeFalsy()
    expect(wrapper.vm.routeName).toBe('index')
    // 期望用户数id为空
    expect(wrapper.vm.user.id).toBeFalsy()
    // 期望搜索的关键字为空
    expect(wrapper.vm.keyword).toBeFalsy()
    expect(wrapper.vm.$el.querySelector('.on').innerHTML).toContain('首页')

    /* *******************************  测试搜索  ******************************************** */
    // 获取搜索按钮
    const searchBtn = wrapper.get('.icofont-search-2')
    await searchBtn.trigger('click')
    expect($router.push).not.toHaveBeenCalled()

    // 获取input
    const input = wrapper.get('input')
    await input.setValue('search test')

    // 测试 computed属性 keyword，keyword 和 input双向绑定
    expect(wrapper.vm.keyword).toBe('search test')

    // 再次点击搜索
    // 1、假设当前路由就是要跳转的路由，不做任何操作
    wrapper.vm.$route.fullPath = '/search?keyword=search'
    wrapper.vm.keyword = 'search'
    await searchBtn.trigger('click')
    expect($router.push).not.toHaveBeenCalled()
    // 2、假设当前路由不是是要跳转的路由，进行$router.push操作
    wrapper.vm.$route.fullPath = '/'
    await searchBtn.trigger('click')
    expect($router.push).toHaveBeenCalled()
    expect(reload).not.toHaveBeenCalled()
    // 3、测试reload执行
    wrapper.setData({
      $route: {
        name: 'search'
      }
    })
    await localVue.nextTick()
    await searchBtn.trigger('click')
    expect($router.push.mock.calls.length).toBe(2)
    expect(reload).toHaveBeenCalled()

    // 因为用户没有登陆，不会渲染登出 按钮
    expect(() => wrapper.get('.user-info > div')).toThrow()
    const loginBtn = wrapper.get('.user-info > a')
    expect(loginBtn).toBeTruthy()

    // 点击登陆按钮
    await loginBtn.trigger('click')
    expect(globalState.mutations.setShowLogin).toHaveBeenCalledWith({}, true)
    expect($preventEvent).toHaveBeenCalled()

    // 测试手机适配的菜单
    const menu = wrapper.find('.nav-icon > a')
    expect(wrapper.vm.$refs.headerItem.style.height).not.toBe('0px')
    await menu.trigger('click')
    expect(wrapper.vm.$refs.headerItem.style.height).toBe('0px')

    // 获取所有导航菜单
    const links = wrapper.findAll('.menu > ul > li > a')
    expect(links.length).toBe(3)
    await links.at(1).trigger('click')
    expect($router.push).toHaveBeenCalledWith('/tag')
    wrapper.vm.isMobileModel = () => true
    await links.at(2).trigger('click')
    expect($router.push).toHaveBeenCalledWith('/leave-message')
  })

  const $axios = {
    post (url) {
      expect(url).toBe('oauth/logout')
      return Promise.resolve('success')
    }
  }
  it('test user have been logged and search keyword not empty', async () => {
    /**
     * mock $router
     */
    const $router = {
      push: jest.fn()
    }

    const userStore = {
      state: {
        id: 1
      },
      mutations: {
        clearUserInfo: jest.fn()
      },
      namespaced: true
    }

    const search = {
      state: {
        keyword: 'keyword'
      },
      mutations: {
        setSearchType: jest.fn(),
        setKeyword: jest.fn()
      },
      namespaced: true
    }

    const globalState = {
      state: {

      },
      mutations: {
        setShowLogin: jest.fn()
      },
      namespaced: true
    }

    const store = new Vuex.Store({
      modules: {
        globalState,
        user: userStore,
        search
      }
    })

    const $preventEvent = jest.fn()
    const wrapper = mount(navigate, {
      provide: {
        reload
      },
      localVue,
      store,
      mocks: {
        $route,
        $axios,
        $router,
        $preventEvent
      }
    })

    // 期望用户数id为空
    expect(wrapper.vm.user.id).toBe(1)
    // 期望搜索的关键字为空
    expect(wrapper.vm.keyword).toBe('keyword')

    // 用户登陆，期望渲染登出按钮
    const logoutBtn = wrapper.get('.icofont-logout')
    expect(logoutBtn).toBeTruthy()
    // 期望登陆按钮不被渲染
    expect(() => wrapper.get('.user-info > a')).toThrow()

    // 点击登出按钮
    await logoutBtn.trigger('click')
  })
})
