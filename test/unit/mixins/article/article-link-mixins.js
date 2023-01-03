import ArticleMixin from '~/mixins/article/article-link-mixin'

describe('test article link mixin', () => {
  it('test', () => {
    const push = jest.fn()
    function Mixin () {

    }
    const wrappedArticleMixin = Object.assign(ArticleMixin.methods, { $router: { push } })
    Mixin.prototype = Object.create(wrappedArticleMixin)

    const wrapper = new Mixin()
    wrapper.joinComment(1)
    expect(push).toHaveBeenCalledWith('/article/1/#comments')
  })
})
