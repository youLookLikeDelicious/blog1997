// 全局组件 promptMessage的状态
const state = function () {
  return {
    for: 'article',
    preDefinedContent: '',
    reportedId: 0
  }
}

const setDetail = (state, { preDefinedContent, reportedId }) => {
  if (preDefinedContent !== state.preDefinedContent) {
    state.preDefinedContent = preDefinedContent
  }

  if (state.reportedId !== reportedId) {
    state.reportedId = reportedId
  }
}
const mutations = {
  /**
   * 举报违规的评论
   *
   * @param {store.state} state 全局状态
   * @param preDefinedContent 预定义的内容
   * @param {Int} preDefinedContent 被举报记录的ID
   */
  reportComment (state, { preDefinedContent = '', reportedId = 0 }) {
    if (state.for !== 'comment') {
      state.for = 'comment'
    }

    setDetail(state, { preDefinedContent, reportedId })
  },
  /**
   * 举报违规的文章
   *
   * @param {store.state} state 全局状态
   * @param {String} preDefinedContent 预定义的内容
   * @param {Int} preDefinedContent 被举报记录的ID
   */
  reportArticle (state, { preDefinedContent = '', reportedId = 0 }) {
    if (state.for !== 'article') {
      state.for = 'article'
    }

    setDetail(state, { preDefinedContent, reportedId })
  }
}
const namespaced = true
export {
  state,
  namespaced,
  mutations
}
