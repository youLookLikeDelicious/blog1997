import { shallowMount, createLocalVue } from '@vue/test-utils'
import umeditor from '@blog1997/vue-umeditor/test'
import Vuex from 'vuex'
import Article from '~/pages/article/_id'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(umeditor)


localVue.use({
  install (vue) {
    vue.prototype.$initHTML = content => content
    vue.component('avatar', {
      render (h) {
        return h('img')
      }
    })
    vue.filter('dateFormat', a => a)
  }
})

/**
 * mock backdrop component
 */
localVue.component('backDrop', {
  render (h) {
    return h('div')
  }
})

const setShowLogin = jest.fn()
const setPromptMessage = jest.fn()

const reportArticle = jest.fn()

const post = jest.fn(() => Promise.resolve({ data: { data: {} } }))

/**
 * mock store
 * 用户登陆的store
 */
const store = new Vuex.Store({
  modules: {
    user: {
      state: {
        id: 1,
        name: 2,
        avatar: '头像'
      },
      mutations: {
        setUser (state, id) {
          state.id = id
        }
      },
      namespaced: true
    },
    globalState: {
      mutations: {
        setShowLogin,
        setPromptMessage
      },
      namespaced: true
    },
    reportIllegalInfo: {
      namespaced: true,
      mutations: {
        reportArticle
      }
    }
  }
})

/**
 * mock store
 * 用户未登录的store
 */
const storeWithoutLogin = new Vuex.Store({
  modules: {
    user: {
      state: {},
      namespaced: true
    },
    globalState: {
      namespaced: true,
      mutations: {
        setShowLogin,
        setPromptMessage
      }
    }
  }
})

describe('test article page', () => {
  it('test with default state', () => {
    const wrapper = shallowMount(Article, {
      localVue,
      store,
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve({ data: { data: '' } })),
          post
        },
        $route: {
          fullPath: '/'
        }
      }
    })
  })

  it('test with predefined state when user not login', async () => {
    const wrapper = shallowMount(Article, {
      localVue,
      store: storeWithoutLogin,
      data () {
        return {
          article: {
            gallery: '',
            content: '<h2></h2><h1></h1><h1></h1><h3></h3><h2></h2>',
            author: {
              avatar: ''
            },
            tags: ['keywords']
          }
        }
      },
      mocks: {
        $axios: {
          get: jest.fn(() => Promise.resolve('')),
          post
        },
        $route: {
          fullPath: '/'
        }
      }
    })

    await localVue.nextTick()
    // 不期望渲染 文章不存在提示
    expect(() => wrapper.get('.not_fond_article')).toThrow()
    // 期望显示文章主体部分
    expect(wrapper.get('.article-main-wrap').exists()).toBeTruthy()

    // 默认没有评论，期望显示commentList 组件
    expect(wrapper.findComponent({ name: 'commentList' }).exists()).toBeTruthy()
    // 期望渲染backDrop组件
    expect(wrapper.findComponent({ name: 'backDrop' }).exists()).toBeTruthy()
    // 期望渲染点赞组件
    expect(wrapper.findComponent({ name: 'thumbUp' }).exists()).toBeTruthy()
    // 期望渲染关键字组件
    expect(wrapper.findComponent({ name: 'ArticleTags' }).exists()).toBeTruthy()
    // 期望渲染目录列表
    expect(wrapper.find('.cate-list').exists()).toBeTruthy()
    expect(wrapper.findAll('.cate-list li').length).toBe(5)

    // 点击评论按钮
    const commentBtn = wrapper.get('.submit-btn')
    await commentBtn.trigger('click')
    // ----------- 期望 修改相关的store
    expect(setShowLogin).toHaveBeenCalled()
    expect(setPromptMessage).not.toHaveBeenCalled()
  })

  it('test with predefined state after user login', async () => {
    // 模仿umd getContent
    const getContent = jest.fn(() => '')
    const wrapper = shallowMount(Article, {
      localVue,
      store,
      data () {
        return {
          article: {
            gallery: '',
            author: {}
          },
          UM: {
            getContent
          }
        }
      },
      mocks: {
        $axios: {
          post,
          get: jest.fn(() => Promise.resolve({ data: { data: {} } }))
        },
        $route: {
          fullPath: '/'
        }
      }
    })

    // 不期望渲染 文章不存在提示
    expect(() => wrapper.get('.not_fond_article')).toThrow()
    // 期望显示文章主体部分
    expect(wrapper.get('.article-main-wrap').exists()).toBeTruthy()

    // 期望渲染backDrop组件
    expect(wrapper.findComponent({ name: 'backDrop' }).exists()).toBeTruthy()

    // 点击提交评论按钮
    const commentBtn = wrapper.get('.submit-btn')
    await commentBtn.trigger('click')

    // -------------- 期望 修改相关的store
    expect(setShowLogin).toHaveBeenCalled()
    expect(setPromptMessage).toHaveBeenCalledWith({}, { msg: '评论内容不能为空', status: false })

    // 设置 评论的内容
    wrapper.setData({
      editorContent: 'comment'
    })

    await commentBtn.trigger('click')
    // 期望post方法被调用
    expect(post).toHaveBeenCalled()
  })

  /**
   * 测试组件的方法
   */
  it('test VM methods', async () => {
    const get = jest.fn(() => Promise.resolve({ data: { data: { userChange: true } } }))

    /**
     * mock addEventListener
     */
    document.addEventListener = jest.fn()

    // 挂载组件
    const wrapper = shallowMount(Article, {
      localVue,
      store,
      data () {
        return {
          article: {
            gallery: '',
            author: {},
            identity: 1,
            thumbs: false,
            liked: 1
          },
          p: 1,
          pages: 1,
          records: ['records']
        }
      },
      mocks: {
        $axios: {
          get,
          post: jest.fn(() => Promise.resolve({ data: { data: { } } }))
        },
        $route: {
          params: {
            id: 1
          },
          fullPath: 'fullPath'
        }
      }
    })

    await localVue.nextTick()
    const vm = wrapper.vm
    // 测试setUM方法
    vm.setUM('k')
    expect(vm.UM).toBe('k')

    // 测试appendComments方法
    vm.appendComments({ p: 2, pages: 2, records: ['appended comment'] })
    await localVue.nextTick()
    expect(vm.records).toEqual(expect.arrayContaining(['records', 'appended comment']))

    // 测试thumbUp
    expect(vm.article.thumbs).toBe(false)
    expect(vm.article.liked).toBe(1)
    // 1、点赞操作
    vm.thumbUp()
    expect(vm.article.thumbs).toBe(true)
    expect(vm.article.liked).toBe(2)

    // 测试举报文章按钮
    vm.reportIllegalArticle()
    expect(reportArticle).toHaveBeenCalledWith({}, { preDefinedContent: window.location.href, reportedId: 1 })

    // 测试 计算进度条方法
    vm.scrollHandler()
    expect(vm.processBarPercent).toBe('0%')
    document.documentElement.scrollTop = 10
    vm.scrollHandler()
    expect(vm.processBarPercent).toBe((10 / (document.documentElement.offsetHeight - document.documentElement.clientHeight)) * 100 + '%')

    // 测试 watch user
    expect(vm.userChange).toBeUndefined()
    store.commit('user/setUser', 22)
    await vm.$nextTick()
    expect(vm.user).toBe(22)
    expect(get).toHaveBeenCalledWith('fullPath')
    expect(vm.userChange).toBe(true)

    document.removeEventListener = jest.fn()
    // 测试destroy事件
    wrapper.vm.$destroy()
    expect(document.removeEventListener).toHaveBeenCalledWith('scroll', wrapper.vm.scrollHandler)
    expect(document.addEventListener).toHaveBeenCalledWith('scroll', wrapper.vm.scrollHandler)
  })

  it('test head methods', () => {
    function ArticleComponent () {}
    const ArticleWrappedComponent = Object.assign({
      head: Article.head
    }, {
      article: {
        title: 'title',
        tags: ['keywords'],
        description: 'description',
        author: {
          avatar: ''
        }
      },
      $route: {
        path: '/',
        fullPath: '/'
      }
    })

    ArticleComponent.prototype = ArticleWrappedComponent

    const article = new ArticleComponent()
    expect(article.head()).toEqual({
      title: 'title | blog1997',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'description'
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'title | blog1997'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'description'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.DOMAIN + article.$route.path
        }
      ]
    })
  })

  it('test mounted when with comment hash', (done) => {
    location.hash = '#comments'
    // mock window.scrollTo
    window.scrollTo = jest.fn()
    const scrollIntoView = jest.fn(() => { document.documentElement.scrollTop = 112 })
    Element.prototype.scrollIntoView = scrollIntoView

    const wrapper = shallowMount(Article, {
      localVue,
      store,
      data () {
        return {
          article: {
            gallery: '',
            author: {},
            id: 1,
            thumbs: false,
            liked: 1
          },
          p: 1,
          pages: 1
        }
      },
      mocks: {
        $route: {
          fullPath: '/'
        },
        $axios: {
          post
        }
      }
    })

    expect(wrapper.find('#comments').exists()).toBeTruthy()
    window.setTimeout(() => {
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
      expect(document.documentElement.scrollTop).not.toBe(0)
      expect(scrollIntoView).toHaveBeenCalled()
      done()
    }, 10)
  })

  /**
   * 测试异步数据
   */
  it('test async data', async () => {
    const error = {
      response: {
        status: 404
      }
    }
    /**
     * mock axios
     */
    const $axios = {
      get: jest.fn()
        .mockReturnValueOnce(Promise.reject(error))
        .mockReturnValueOnce(Promise.resolve('resolve'))
    }

    /**
     * mock $responseHandler
     */
    const $responseHandler = jest.fn(() => 'return value')

    // 测试id 为空的情况
    const redirect = jest.fn()
    let data = await Article.asyncData({ $responseHandler, params: { id: '' }, app: { $axios }, res: 'res', req: 'req', redirect })
    expect($axios.get).not.toHaveBeenCalled()
    expect(redirect).toHaveBeenCalled()

    // 测试 返回404的情况
    data = await Article.asyncData({ $responseHandler, params: { id: 'id' }, app: { $axios }, res: 'res', req: 'req', redirect })
    expect($axios.get).toHaveBeenCalled()
    expect(redirect).toHaveBeenCalledTimes(2)

    // 测试正常的数据
    data = await Article.asyncData({ $responseHandler, params: { id: 'id' }, app: { $axios }, res: 'res', req: 'req' })
    expect($axios.get).toHaveBeenCalledWith('article/id', 'req')
    expect(data).toBe('return value')
    expect($responseHandler).toHaveBeenCalledWith('resolve', 'res')
  })
})
