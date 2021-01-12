import ArticleListMixin from '~/mixins/article/article-list-mixin'

describe('test article list mixin', () => {
  it('test', () => {
    function Mixin () {

    }

    const $axios = {
      get: jest.fn(() => Promise.resolve(''))
    }

    const wrappedMixin = Object.assign({},
      ArticleListMixin.methods,
      ArticleListMixin,
      ArticleListMixin.data(),
      ArticleListMixin.computed,
      { $axios }
    )
    Mixin.prototype = Object.create(wrappedMixin)

    const mixinInstance = new Mixin()
    mixinInstance.getMoreArticle()
    expect($axios.get).not.toHaveBeenCalled()

    mixinInstance.pages = 10
    mixinInstance.getMoreArticle()
    expect($axios.get).toHaveBeenCalledWith(`${mixinInstance.getMoreUrl}?p=${mixinInstance.p}&${mixinInstance.getMoreCondition}`)

    // 测试computed方法
    expect(mixinInstance.getMoreCondition()).toBe('')
  })
})
