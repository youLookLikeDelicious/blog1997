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
    window.addHandler = jest.fn()
    window.removeHandler = jest.fn()

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
              name: 'user name',
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
                  name: 'reply-name-level-2',
                  user_id: 2,
                  id: 27,
                  reply_to_name: 'reply_to_name'
                },
                {
                  able_id: 11,
                  content: '第一条评论的回复 level 3',
                  level: 3,
                  liked: 0,
                  thumbs: 0,
                  user_id: 1,
                  id: 27,
                  name: 'reply-name-level-3',
                  reply_to_name: 'reply_to_name'
                },
                {
                  able_id: 11,
                  content: '第一条评论的回复 level 2',
                  level: 2,
                  liked: 0,
                  thumbs: 0,
                  user_id: 1,
                  id: 27,
                  name: 'reply-name-level-3',
                  reply_to_name: 'reply_to_name'
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
              replies: []
            }
          ],
          commented: 100
        }
      }
    })

    expect(window.addHandler).toHaveBeenCalledWith(wrapper.vm.UM.body, 'click', wrapper.vm.umClickHandler)
    expect(window.addHandler).toHaveBeenCalledWith(window, 'click', wrapper.vm.windowClickHandler)
    // 有留言记录，期望显示评论列表
    expect(wrapper.findComponent({ name: 'commentList' }).exists()).toBeTruthy()
    // 期望显示留言记录
    expect(wrapper.get('.leave-message-count').html()).toContain('共 <span>100</span> 条留言')

    // 测试destroy事件
    wrapper.vm.$destroy()
    expect(window.removeHandler).toHaveBeenCalledWith(wrapper.vm.UM.body, 'click', wrapper.vm.umClickHandler)
    expect(window.removeHandler).toHaveBeenCalledWith(window, 'click', wrapper.vm.windowClickHandler)
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
    const post = jest.fn(() => Promise.resolve({ data: { data: {} } }))

    // mock initFormula

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
              name: 'user name',
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
                  name: 'reply-name-level-2',
                  user_id: 2,
                  id: 27,
                  reply_to_name: 'reply_to_name'
                },
                {
                  able_id: 11,
                  content: '第一条评论的回复 level 3',
                  level: 3,
                  liked: 0,
                  thumbs: 0,
                  user_id: 1,
                  id: 27,
                  name: 'reply-name-level-3',
                  reply_to_name: 'reply_to_name'
                },
                {
                  able_id: 11,
                  content: '第一条评论的回复 level 2',
                  level: 2,
                  liked: 0,
                  thumbs: 0,
                  user_id: 1,
                  id: 27,
                  name: 'reply-name-level-3',
                  reply_to_name: 'reply_to_name'
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
              replies: []
            }
          ],
          commented: 100
        }
      },
      mocks: {
        $axios: {
          post
        }
      }
    })

    // 设置提交的内容
    wrapper.setData({
      editorContent: 'leave-message'
    })
    // 获取提交按钮
    const submitBtn = wrapper.find('.leave-message-btn-wrap > a')
    // 点击提交按钮
    await submitBtn.trigger('click')
    expect(post).toHaveBeenCalledWith('/comment', {
      content: 'leave-message',
      able_id: 0,
      able_type: 'Blog1997'
    })

    wrapper.vm.UM.setContent('')
    await submitBtn.trigger('click')
    expect(setPromptMessage).toHaveBeenCalledWith({ }, { msg: '写点什么吧(●ˇ∀ˇ●)', status: false })

    wrapper.vm.UM.setContent('test')
    // 测试window的点击事件
    const event = {
      target: {
        className: 'edui-icon-emotion edui-icon'
      }
    }
    // 测试点击toolbar 和umeditor.body事件
    wrapper.vm.windowClickHandler(event)
    expect(wrapper.vm.editorContent).toBe('')
    // 测试点击 .edui-editor-body富文本编辑区域事件
    event.target.className = 'edui-editor-body'
    wrapper.vm.windowClickHandler(event)
    // 测试点击其他位置的事件 并且富文本内容为空的情况
    event.target.className = ''
    wrapper.vm.windowClickHandler(event)
    // 测试点击其他位置的事件 并且富文本内容不为空的情况
    wrapper.vm.UM.setContent('test')
    wrapper.vm.windowClickHandler(event)
    expect(wrapper.vm.UM.getContent()).toBe('test')

    // 测试UMeditor编辑区域点击事件
    const event2 = {
      stopPropagation: jest.fn(),
      cancelBubble: false
    }
    // 测试富文本中的内容和预定义的message一样的情况
    wrapper.setData({
      editorContent: wrapper.vm.message
    })
    wrapper.vm.umClickHandler(event2)
    expect(event2.stopPropagation).toHaveBeenCalled()
    expect(event2.cancelBubble).toBe(true)
    expect(wrapper.vm.editorContent).toBe('')

    // 测试富文本中的内容和预定义的message不一样的情况cancelBubble
    wrapper.vm.UM.setContent('test')
    wrapper.vm.umClickHandler(event2)
    expect(wrapper.vm.UM.getContent()).toBe('test')
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
    expect($axios.get).toHaveBeenCalledWith('leave-message/index', 'req')
    expect(data).toBe('return value')
    expect($responseHandler).toHaveBeenCalledWith('resolve', 'res')

    data = await leaveMessage.asyncData({ $responseHandler, $axios, res: 'res', app: { $axios }, req: 'req' })
    expect($responseHandler.mock.calls.length).toBe(1)
    expect(data).not.toBe('return value')
  })
})
