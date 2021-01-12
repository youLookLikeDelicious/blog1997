import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import reportIllegalInfo from '@/components/common/report-illegal-info'
import currentUserPlugin from '~/plugins/client/current-user/index'
import { reportReason } from '~/config/const/report-illegal-info/index'
import reportType from '~/config/const/mailbox-map/index'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(currentUserPlugin)

/**
 * mock user store
 */
const userStore = {
  state: {
    id: 1
  },
  namespaced: true
}

/**
 * mock report illegal info store
 */
const reportIllegalInfoStore = {
  state: {
    for: 'article',
    showDialog: false,
    preDefinedContent: '',
    reportedId: 5
  }
}

// 模拟axios
const post = jest.fn(() => Promise.resolve(''))
localVue.use({
  install (vue) {
    vue.prototype.$axios = {
      post
    }
  }
})

// 创建store
const store = new Vuex.Store({ modules: {
  reportIllegalInfo: reportIllegalInfoStore,
  user: userStore
}
})

const close = jest.fn()
const $children = [{ close }]
// 挂载组件
const wrapper = shallowMount(reportIllegalInfo, {
  localVue,
  store
})

describe('test report illegal info component', () => {
  /**
   * 测试举报文章对话框
   */
  it('test report illegal article', async (done) => {
    expect(wrapper.vm.reportFor).toBe('article')
    expect(wrapper.vm.title).toBe('举报文章')
    expect(wrapper.vm.height).toBe('28rem')
    expect(wrapper.vm.reportModel.reason).toBe(reportReason.forArticle[0])
    expect(wrapper.vm.reasons).toEqual(expect.arrayContaining(reportReason.forArticle))

    // 期望渲染的input的values为 report.forArticles
    const values = Array.prototype.map.call(wrapper.vm.$el.querySelectorAll('li > label > input'), input => input.value)
    expect(values).toEqual(expect.arrayContaining(reportReason.forArticle))

    // 测试input标签点击事件
    const input = wrapper.get(`input[value=${reportReason.forArticle[1]}]`)
    await input.trigger('click')
    expect(wrapper.vm.reportModel.reason).toBe(reportReason.forArticle[1])

    // 触发textarea的输入事件
    const textarea = wrapper.get('textarea')
    await textarea.setValue('textarea content')
    expect(wrapper.vm.reportModel.content).toBe('textarea content')
    done()
  })

  /**
   * 测试axios生成的post数据
   */
  it('test report method', async () => {
    // $children这样才有效, 使用mocks无效
    wrapper.vm.$children = $children
    // 单击提交按钮，触发axios
    await wrapper.get('.submit-btn').trigger('click')
    expect(post).toHaveBeenCalledWith('/report-illegal-info', {
      sender: 1,
      receiver: 0,
      type: reportType.article,
      content: `,${reportReason.forArticle[1]},textarea content`,
      reported_id: 5
    })
    expect(close).toHaveBeenCalled()
  })

  /**
   * 测试举报评论对话框
   */
  it('test report illegal comment', async (done) => {
    const reportIllegalInfoStoreForComment = {
      state: {
        for: 'comment',
        showDialog: false,
        preDefinedContent: '',
        reportedId: 5
      }
    }
    const store = new Vuex.Store({
      modules: {
        reportIllegalInfo: reportIllegalInfoStoreForComment
      }
    })
    // 更改全局的状态
    const wrapper = shallowMount(reportIllegalInfo, { store, localVue })

    expect(wrapper.vm.reportFor).toBe('comment')
    expect(wrapper.vm.height).toBe('40rem')
    expect(wrapper.vm.title).toBe('举报评论')
    expect(wrapper.vm.reportModel.reason).toBe(reportReason.forComment[0])
    expect(wrapper.vm.reasons).toEqual(expect.arrayContaining(reportReason.forComment))

    // 期望渲染的input的values为 report.forComment
    const values = Array.prototype.map.call(wrapper.vm.$el.querySelectorAll('li > label > input'), input => input.value)
    expect(values).toEqual(expect.arrayContaining(reportReason.forComment))

    // 测试input标签点击事件
    const input = wrapper.get(`input[value=${reportReason.forComment[3]}]`)
    await input.trigger('click')
    expect(wrapper.vm.reportModel.reason).toBe(reportReason.forComment[3])

    done()
  })
})
