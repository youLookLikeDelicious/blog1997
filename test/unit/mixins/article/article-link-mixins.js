import ArticleMixin from '~/mixins/article/article-link-mixin'

/**
 * mock event
 */
const event = {
  target: {
    dataset: {
      id: 2
    }
  }
}
describe('test article link mixin', () => {
  it('test', () => {
    const push = jest.fn()
    function Mixin () {

    }
    const wrappedArticleMixin = Object.assign(ArticleMixin.methods, { $router: { push } })
    Mixin.prototype = Object.create(wrappedArticleMixin)

    const wrapper = new Mixin()
    wrapper.joinComment(event)
    expect(push).toHaveBeenCalledWith('/article/2/#comments')
  })
})
