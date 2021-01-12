import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import umeditor from '@blog1997/vue-umeditor/test'
import commentList from '~/components/comment-list/comment-list'
import { dateFormat } from '~/plugins/ssr/filter'
import animate from '~/test/util/animate'
import avatar from '~/components/common/avatar'

/**
 * 测试评论列表组件
 */
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(umeditor)
localVue.filter('dateFormat', dateFormat)
localVue.use(animate)
localVue.component('avatar', avatar)
const $userHasSignedIn = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(false)
localVue.use({
  install (vue) {
    vue.prototype.$userHasSignedIn = $userHasSignedIn
  }
})

/**
 * 模拟模型的props
 */
const comments = [
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
]

/**
 * mock user store which not login
 */
const userStoreWithoutLogin = {
  state: {
    id: ''
  },
  namespaced: true
}
/**
 * mock user which login
 */
const userStoreWitchLogin = {
  state: {
    id: 1
  },
  namespaced: true
}

/**
 * mock globalState store
 */
const setPromptMessage = jest.fn()
const globalState = {
  state: {
    showLogin: false
  },
  namespaced: true,
  mutations: {
    setPromptMessage
  }
}

/**
 * mock report function
 */
const reportComment = jest.fn()

const store = new Vuex.Store({
  modules: {
    user: userStoreWithoutLogin,
    globalState,
    reportIllegalInfo: {
      namespaced: true,
      mutations: {
        reportComment
      }
    }
  }
})

describe('test comment list component', () => {
  it('test default state', () => {
    const wrapper = shallowMount(commentList, { localVue, store })
    // 没有评论，期望 不渲染article.comment元素
    expect(() => wrapper.get('article.comment')).toThrow()
    // 没有评论，期望只渲染一个空的div元素
    expect(wrapper.vm.$el.tagName).toBe('DIV')
  })

  it('test comment list with predefined data', async () => {
    const wrapper = shallowMount(commentList, {
      localVue,
      store,
      propsData: {
        comments
      }
    })

    const $el = wrapper.vm.$el
    // 有评论数据
    // 1、期望$el的className = 'comment-list comment-list-wrap'
    expect($el.className).toBe('comment-list comment-list-wrap')
    // 2、期望渲染umeditor组件
    expect(wrapper.findComponent({ name: 'umeditor' })).toBeTruthy()
    // 有2条评论数据，期望渲染2个article.comment元素
    const articles = $el.querySelectorAll('article.comment')
    expect(articles.length).toBe(2)

    // 测试评论的内容
    const commentContent = $el.querySelector('.comment-content')
    // 测试评论者的信息
    // 1、测试头像
    const avatarComponent = (wrapper.findComponent(avatar))
    expect(avatarComponent.exists()).toBe(true)
    // 2、测试用户名
    expect(commentContent.querySelector('.stamp > p').innerHTML).toContain(comments[0].name)
    // 3、测试用评论事件
    expect(commentContent.querySelector('.stamp > p').innerHTML).toContain(dateFormat(comments[0].created_at))
    // 4、测试评论的内容
    expect(commentContent.querySelector('.reply-content').innerHTML).toContain(comments[0].content)

    // 测试评论的回复， 第一条评论有两条回复，期望渲染.reply-content-wrap元素，并渲染两个dl
    expect(articles[0].querySelectorAll('.reply-content-wrap').length).toBe(1)
    expect(articles[0].querySelectorAll('dl').length).toBe(3)

    // 第二条评论没有回复，期望不会渲染元素.reply-content-wrap
    expect(articles[1].querySelectorAll('.reply-content-wrap').length).toBe(0)
    expect(articles[1].querySelector('dl')).toBeFalsy()

    // 测试评论的回复 comment level = 2
    const dls = articles[0].querySelectorAll('dl')
    // 1、测试用户信息部分
    expect(dls[0].querySelector('dt').innerHTML).toBe(comments[0].replies[0].name + '-回复-reply_to_name: ')
    expect(dls[0].querySelector('.reply-content').innerHTML).toBe(comments[0].replies[0].content)

    // 测试评论的回复 comment level = 3
    expect(dls[1].querySelector('dt').innerHTML).toBe(`${comments[0].replies[1].name}-回复-${comments[0].replies[1].reply_to_name}: `)
    expect(dls[1].querySelector('.reply-content').innerHTML).toBe(comments[0].replies[1].content)

    // 该评论的回复数量 === 评论的.commented,不希望显示.more-comments下的 阅读更多标签
    expect($el.querySelector('.more-comments').querySelector('a')).toBeFalsy()
    wrapper.setProps({
      comments: [
        {
          avatar: 'avatar',
          able_id: 3,
          commented: 6,
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
              level: 2,
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
            }
          ]
        }
      ]
    })
    // 该评论的回复数量 === 评论的.commented,希望显示.more-comments下的 阅读更多标签

    await expect(wrapper.get('.more-comments')).toBeTruthy()
    // 期望点击 阅读更多标签，会触发自定义事件
    await wrapper.get('.more-comments > a').trigger('click')
    expect(wrapper.emitted().getMoreReply).toBeTruthy()
    // 期望 emit 附带相关的参数
    expect(wrapper.emitted().getMoreReply[0][0]).toEqual({ rootId: 11, offset: 2 })
  })

  it('test component event when user not login', async () => {
    const wrapper = mount(commentList, { localVue, store, propsData: { comments } })

    expect(wrapper.vm.UM).toBeTruthy()
    expect(store.state.globalState.showLogin).toBe(false)
    // 点击回复按钮
    const replyBtn = wrapper.get('.reply-btn')
    await replyBtn.trigger('click')
    // 用户没有登陆，修改全局状态
    expect($userHasSignedIn.mock.calls.length).toBe(1)

    // 点击举报按钮
    const reportBtn = wrapper.get('.icofont-warning')
    await reportBtn.trigger('click')
    expect(reportComment).toHaveBeenCalled()
  })

  it('test component event after user login', async () => {
    const store = new Vuex.Store({
      modules: {
        user: userStoreWitchLogin,
        globalState
      }
    })
    // mock axios
    const $axios = {
      post: jest.fn(() => Promise.resolve({ data: { data: { rows: 2 } } }))
    }

    localVue.prototype.$userHasSignedIn = function () {
      return true
    }
    const wrapper = mount(commentList, { localVue, store, propsData: { comments }, mocks: { $axios } })

    // 点击回复按钮
    const replyBtn = wrapper.get('.reply-btn')
    await replyBtn.trigger('click')

    // 获取评论的相关 菜单
    const buttons = wrapper.findAll('.reply-menu > div > a')

    // 点击第一条评论的 回复按钮，期望富文本编辑器在该评论对应的元素中
    // --假设当前用户是发布评论的用户
    expect(buttons.at(2).text()).toContain('回复')
    // 点击回复按 再相关评论下方显示富文本
    await buttons.at(2).trigger('click')
    expect(wrapper.vm.$refs.replyEditorBox.parentElement.querySelector('.reply-content').innerHTML)
      .toContain(comments[0].content)
    // 手动触发 animate的callback ******************************************************************************* //
    wrapper.vm.animateCallback()
    expect(wrapper.vm.showReplyBtn).toBe(true)

    // 测试animate的callback if 分支
    wrapper.vm.$refs.replyEditorBox.style.display = 'none'
    wrapper.vm.animateCallback()
    expect(wrapper.vm.$refs.replyEditorBox.style)

    // 测试取消回复按钮 隐藏相关的富文本 ******************************************************************************* //
    const replyCancelBtn = wrapper.find('.reply_btn > a')
    expect(replyCancelBtn.text()).toBe('取消')
    await replyCancelBtn.trigger('click')
    expect(wrapper.vm.showReplyBtn).toBe(false)

    // 测试deleteComment方法
    expect(buttons.at(1).text()).toContain('删除')

    // 触发点击事件
    // 测试删除按钮 ******************************************************************************* //
    // 1、confirm return false
    global.confirm = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true)
    await buttons.at(1).trigger('click')
    expect(global.confirm).toHaveBeenCalledWith('确定删除吗')
    expect(global.confirm.mock.results[0].value).toBe(false)
    expect($axios.post).not.toHaveBeenCalled()

    // 2、confirm return true
    await buttons.at(1).trigger('click')
    expect(global.confirm).toHaveBeenCalledWith('确定删除吗')
    expect(global.confirm.mock.results[1].value).toBe(true)
    expect($axios.post).toHaveBeenCalledWith('comment/11', { _method: 'DELETE' })
    expect(wrapper.emitted('deleteComment')[0][0]).toEqual({ commentId: comments[0].id, level: comments[0].level, commentIndex: 0, affectRows: 2 })

    // 测试 提交回复功能 ******************************************************************************* //
    // 一、回复level 1的评论
    const submitReplyBtn = wrapper.findAll('.reply_btn > a').at(1)
    expect(submitReplyBtn.text()).toBe('提交')
    await submitReplyBtn.trigger('click')
    // 1、回复的内容为空的情况
    expect(setPromptMessage).toHaveBeenCalledWith({ showLogin: false }, { msg: '写点什么吧>_<||', status: false })
    // 2、回复的内容不为空的情况
    wrapper.vm.editorContent = 'content'
    expect(setPromptMessage.mock.calls.length).toBe(1)
    const axios = {
      post: jest.fn(() => Promise.resolve({ data: { data: {} } }))
    }
    wrapper.vm.$axios = axios
    await submitReplyBtn.trigger('click')
    expect(axios.post).toHaveBeenCalledWith('comment', {
      able_id: comments[0].id,
      content: 'content',
      able_type: 'comment'
    })
    // 二、回复 level3的评论
    // 1、点击回复的 回复按钮
    let replyMenuOfLevel2 = ''
    expect(() => { replyMenuOfLevel2 = wrapper.findAll('dd.clear > div > a').at(1) }).not.toThrow()
    expect(replyMenuOfLevel2.text()).toBe('回复')
    await replyMenuOfLevel2.trigger('click')
    wrapper.vm.editorContent = 'content 2'
    // 2、点击提交按钮
    await submitReplyBtn.trigger('click')
    expect(axios.post).toHaveBeenCalledWith('comment', {
      able_id: comments[0].replies[0].id,
      content: 'content 2',
      able_type: 'comment'
    })

    // 测试点赞状态的 修改 ******************************************************************************* //
    const thumbUps = wrapper.findAllComponents({ name: 'ThumbUp' })
    // 共计五条评论和回复
    expect(thumbUps.length).toBe(5)

    const thumbUp1 = thumbUps.at(0)
    expect(thumbUp1.exists()).toBeTruthy()
    // 一、获取点赞的 a标签 评论的level 1 -----------------
    let thumbUpBtn = thumbUp1.find('a')
    // 获取当前的点赞数
    let liked = comments[0].liked
    expect(wrapper.vm.comments[0].liked).toBe(liked)
    // 1、点赞操作
    await thumbUpBtn.trigger('click')
    expect(wrapper.vm.comments[0].liked).toBe(liked + 1)
    // 2. 再次点赞 (允许多次点赞)
    await localVue.nextTick()
    await thumbUp1.find('a').trigger('click')
    await localVue.nextTick()
    expect(wrapper.vm.comments[0].liked).toBe(liked + 2)

    // 二、评论的level 2 ---------------------------------
    const thumbUp2 = thumbUps.at(1)
    expect(thumbUp2.exists()).toBeTruthy()
    liked = comments[0].replies[0].liked
    expect(wrapper.vm.comments[0].replies[0].liked).toBe(liked)
    // 1、点赞操作
    thumbUpBtn = thumbUp2.find('a')
    await thumbUpBtn.trigger('click')
    expect(wrapper.vm.comments[0].replies[0].liked).toBe(liked + 1)
  })
})
