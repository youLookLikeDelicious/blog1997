import { shallowMount } from '@vue/test-utils'
import loginCallback from '~/pages/login/callback/_type'

describe('test login callback page', () => {
  it('test use git login', () => {
    const post = jest.fn()
    const wrapper = shallowMount(loginCallback, {
      mocks: {
        $route: {
          params: { type: '' },
          query: {
            code: 1
          }
        },
        $axios: {
          post (url) {
            post(url)
            return Promise.resolve('')
          }
        }
      }
    })

    expect(post).toHaveBeenCalledWith('oauth/authorize?p=home&code=1')
  })

  it('test use weichat login', () => {
    const post = jest.fn()
    const wrapper = shallowMount(loginCallback, {
      mocks: {
        $route: {
          params: { type: 'weichat' },
          query: {
            code: 1
          }
        },
        $axios: {
          post (url) {
            post(url)
            return Promise.resolve('')
          }
        }
      }
    })

    expect(post).toHaveBeenCalledWith('oauth/authorize?p=home&type=weichat&code=1')
  })

  it('test use qq login', () => {
    const post = jest.fn()
    const wrapper = shallowMount(loginCallback, {
      mocks: {
        $route: {
          params: { type: 'qq' },
          query: {
            code: 1
          }
        },
        $axios: {
          post (url) {
            post(url)
            return Promise.resolve('')
          }
        }
      }
    })

    // expect(post).toHaveBeenCalledWith('oauth/authorize?p=home&type=weichat&code=1')
    expect(post).not.toHaveBeenCalled()
  })

  it('test setInProgress method', () => {
    const wrapper = shallowMount(loginCallback, {
      mocks: {
        $route: {
          params: { type: '' },
          query: {
            code: 1
          }
        },
        $axios: {
          post (url) {
            return Promise.resolve('')
          }
        }
      }
    })

    // inProgress默认为true
    expect(wrapper.vm.inProgress).toBe(true)

    // 默认情况，不期望渲染等待动画组件
    expect(wrapper.findComponent({ name: 'WaitingInProgress' }).exists()).toBeTruthy()

    // 设置等待的状态
    wrapper.vm.setInProgress(false)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findComponent({ name: 'WaitingInProgress' }).exists()).toBeFalsy()
      expect(wrapper.vm.inProgress).toBe(false)
    })
  })
})
