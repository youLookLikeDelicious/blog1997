import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import umeditor from '@blog1997/vue-umeditor/test'
import Vuex from 'vuex'
import leaveMessage from '~/pages/leave-message/index'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(umeditor)
localVue.use({
  install (vue) {
    vue.prototype.$userHasSignedIn = jest.fn(() => true)

    vue.component('avatar', {
      render (h) {
        return 'img'
      }
    })
    vue.filter('dateFormat', a => a)
  }
})

describe('test leave message page', () => {
  it('Test head', () => {
    expect(leaveMessage.head().title).toContain('leave-message')
  })
  it('test with default state', () => {
    const wrapper = shallowMount(leaveMessage, { localVue })

    // 期望umeditor被渲染
    expect(wrapper.findComponent({ name: 'umeditor' }).exists()).toBeTruthy()
    // 没有留言，期望 commentList组件被渲染
    expect(wrapper.findComponent({ name: 'commentList' }).exists()).toBeTruthy()
    // 默认情况下，没有留言，不显示留言信息
    expect(() => wrapper.get('.leave-message-count')).toThrow()
  })

  /**
   * 测试用户没有登陆时提交 留言
   */
  it('Test when user not login', async () => {
    const wrapper = shallowMount(leaveMessage, {
      localVue,
      mocks: {
        $axios: {
          post: jest.fn()
        }
      }
    })
    wrapper.vm.$userHasSignedIn = () => false
    await wrapper.find('.leave-message-btn-wrap a').trigger('click')
    expect(wrapper.vm.$axios.post).not.toHaveBeenCalled()
  })

  it('test with predefined data', () => {
    const store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          state: {
            id: 1
          }
        }
      }
    })
    const wrapper = mount(leaveMessage, {
      localVue,
      store,
      data () {
        return {
          records: [
            {
              avatar: 'avatar',
              able_id: 3,
              commented: 2,
              content: 'comment content',
              created_at: 1593570465,
              id: 11,
              user: {
                name: 'user'
              },
              receiver: {
                name: 'receiver'
              },
              level: 1,
              liked: 1,
              reply_to: 1,
              thumbs: 0,
              user_id: 1,
              replies: [
                {
                  able_id: 11,
                  content: '第一条评论的回复 level 2',
                  level: 3,
                  liked: 0,
                  thumbs: 0,
                  user: {
                    name: 'user'
                  },
                  receiver: {
                    name: 'receiver'
                  },
                  user_id: 2,
                  id: 27
                },
                {
                  able_id: 11,
                  content: '第一条评论的回复 level 3',
                  level: 3,
                  liked: 0,
                  thumbs: 0,
                  user_id: 1,
                  id: 27,
                  user: {
                    name: 'user'
                  },
                  receiver: {
                    name: 'receiver'
                  }
                },
                {
                  able_id: 11,
                  content: '第一条评论的回复 level 2',
                  level: 2,
                  liked: 0,
                  thumbs: 0,
                  user_id: 1,
                  id: 27,
                  user: {
                    name: 'user'
                  },
                  receiver: {
                    name: 'receiver'
                  }
                }
              ]
            },
            {
              avatar: '头像',
              able_id: 3,
              commented: 7,
              content: '评论内容',
              created_at: 1593570465,
              id: 11,
              level: 1,
              liked: 1,
              reply_to: 1,
              thumbs: 0,
              user_id: 1,
              replies: [],
              user: {
                name: 'user'
              },
              receiver: {
                name: 'receiver'
              }
            }
          ],
          commented: 100
        }
      }
    })

    // 有留言记录，期望显示评论列表
    expect(wrapper.findComponent({ name: 'commentList' }).exists()).toBeTruthy()
    // 期望显示留言记录
    expect(wrapper.get('.leave-message-count').html()).toContain('共 <span>100</span> 条留言')
  })

  const setPromptMessage = jest.fn()
  const store = new Vuex.Store({
    modules: {
      globalState: {
        mutations: {
          setPromptMessage
        },
        namespaced: true
      },
      user: {
        namespaced: true,
        state: {
          id: 1
        }
      }
    }
  })
  /**
   * 测试组件的 methods
   */
  it('test component method', async () => {
    const post = jest.fn(() => Promise.resolve({ data: { data: { user: '' } } }))
    const get = jest.fn(() => Promise.resolve({ data: { data: { records: [], p: 2, pages: 2 } } }))

    const wrapper = mount(leaveMessage, {
      store,
      localVue,
      data () {
        return {
          records: [
            {
              avatar: 'avatar',
              able_id: 3,
              commented: 2,
              content: 'comment content',
              created_at: 1593570465,
              id: 11,
              user: {
                name: 'user'
              },
              receiver: {
                name: 'receiver'
              },
              level: 1,
              liked: 1,
              reply_to: 1,
              thumbs: 0
            },
            {
              avatar: '头像',
              able_id: 3,
              commented: 7,
              content: '评论内容',
              created_at: 1593570465,
              id: 11,
              level: 1,
              liked: 1,
              reply_to: 1,
              thumbs: 0,
              replies: [],
              user: {
                name: 'user'
              },
              receiver: {
                name: 'receiver'
              }
            }
          ],
          commented: 100
        }
      },
      mocks: {
        $axios: {
          post,
          get
        }
      }
    })

    // 获取提交按钮
    const submitBtn = wrapper.find('.leave-message-btn-wrap > a')

    // ---------- 没有数据的情况下 点击提交按钮
    await submitBtn.trigger('click')
    expect(setPromptMessage).toHaveBeenCalledWith({ }, { msg: '写点什么吧(●ˇ∀ˇ●)', status: false })

    // ---------- 有数据的情况下点击提交按钮
    // ---------- 设置提交的内容
    await wrapper.setData({
      editorContent: 'leave-message'
    })
    await submitBtn.trigger('click')
    expect(post).toHaveBeenCalledWith('/comment', {
      content: 'leave-message',
      able_id: 0,
      able_type: 'Blog1997'
    })

    // 测试富文本中的内容为空的情况
    await wrapper.setData({
      editorContent: ''
    })
    expect(wrapper.get('.leave-message-placeholder').exists()).toBeTruthy()

    // 测试富文本中的内容不为空的情况
    // 期望 .leave-message-placeholder不被渲染
    await wrapper.setData({
      editorContent: 'content'
    })
    expect(() => wrapper.get('.leave-message-placeholder')).toThrow()

    // 测试 getMoreLeaveMessage
    wrapper.vm.getMoreLeaveMessage()
    expect(get).toHaveBeenCalledWith('leave-message?p=2')
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

    let data = await leaveMessage.asyncData({ $responseHandler, app: { $axios }, res: 'res', req: 'req' })
    expect($axios.get).toHaveBeenCalledWith('leave-message', 'req')
    expect(data).toBe('return value')
    expect($responseHandler).toHaveBeenCalledWith('resolve', 'res')

    data = await leaveMessage.asyncData({ $responseHandler, $axios, res: 'res', app: { $axios }, req: 'req' })
    expect($responseHandler.mock.calls.length).toBe(1)
    expect(data).not.toBe('return value')
  })
})
