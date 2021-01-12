describe('test tag page', () => {
  [{ width: 768, height: 1000 }, { width: 1200, height: 1000 }].forEach((size) => {
    it('visit tag page', () => {
      cy.intercept('POST', '/api/oauth/currentUser', { fixture: 'user-login' }).as('getCurrentUser')
      cy.intercept('GET', '/api/article/tags', { fixture: 'tag-article' }).as('tag.article')
      cy.intercept('get', '/image/gallery/2020-12-09/228.087949001615fd08fc21579d0.79028584.jpg', { fixture: 'images/gallery' })
      cy.viewport(size.width, size.height).visit('/about-me')
      cy.get('.menu a').eq(1).click({ force: true })
      cy.wait('@getCurrentUser')

      cy.get('.tag-list').should('be.visible')
      cy.get('.tag-list > ul > li').eq(2).click({ force: true })
      cy.wait(2000)
    })
  })
})
