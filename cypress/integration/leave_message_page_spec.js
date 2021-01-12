/* eslint-disable no-undef */
describe('test leave message page', () => {
  [{ width: 768, height: 1000 }, { width: 1200, height: 1000 }].forEach((size) => {
    it('visit leave message page when user not login', () => {
      cy.server()
      cy.viewport(size.width, size.height).visit('https://www.blog1997.com/leave-message')

      // 点击提交评论按钮
      cy.get('.leave-message-btn-wrap > a').click()
      cy.get('.login-wrap > div > header > a.close').click()

      // 点击回复按钮
      cy.get('.reply-menu > div > a.reply-btn:first').click()
      cy.get('.login-wrap > div > header > a.close').click()

      // 点击点赞按钮
      cy.get('.icofont-thumbs-up:first').click()
      cy.get('.login-wrap > div > header > a.close').click()

      cy.get('.delete').should('not.be.exist')

      cy.get('.reply-menu:first').trigger('mouseover')
      cy.get('.icofont-warning:first').should('not.be.visible')
      cy.end()
    })
    it('visit leave message page when user login', () => {
      cy.server()
      // 定义获取当前用户的fixture
      cy.intercept('POST', '/api/oauth/currentUser', { fixture: 'user-login' }).as('getCurrentUser')
      // 定义评论的fixture
      cy.intercept('POST', '/api/comment', { fixture: 'create-comment' }).as('submitComment')
      // 定义删除评论的fixture
      cy.intercept('POST', '/api/comment/36', { fixture: 'delete-comment' }).as('deleteComment')
      // 定义点赞操作的fixture
      cy.intercept('POST', '/api/thumb-up', { fixture: 'thumb-up' }).as('thumbUp')

      cy.viewport(size.width, size.height).visit('https://www.blog1997.com/leave-message')

      cy.wait('@getCurrentUser')

      cy.get('.um_editor:first').should('be.visible').type('test')

      // 点击表情按钮
      cy.get('.edui-icon-emotion:first').click()

      // 期望渲染表情窗口
      cy.get('.edui-emotion-wrapper').should('be.visible')

      // 点击第一个表情
      cy.get('.edui-emotion-jd:first').click()

      // 点击公式按钮
      cy.get('.edui-icon-formula:first').click()
      cy.get('.edui-formula-wrapper').should('be.visible')
      cy.get('.edui-tab-pane > ul > li').eq(16).click()

      // 点击提交按钮
      cy.get('.leave-message-btn-wrap > a').click()

      // 提交成功，删除按钮期望显示
      cy.get('.delete').should('be.visible')

      // 点赞操作 操作的是刚提交的评论
      cy.get('.icofont-thumbs-up:first').should('not.have.class', 'thumbs')
      cy.get('.thumb-up-wrap:first').find('span').should('not.exist')
      cy.get('.icofont-thumbs-up:first').click()
      cy.wait('@thumbUp')
      cy.get('.icofont-thumbs-up:first').should('have.class', 'thumbs')
      cy.get('.thumb-up-wrap:first').find('span').should('contain', '1')

      // 再点两次
      cy.get('.icofont-thumbs-up:first').click()
      cy.wait('@thumbUp')
      cy.get('.icofont-thumbs-up:first').click()
      cy.wait('@thumbUp')
      cy.get('.thumb-up-wrap:first').find('span').should('contain', '3')

      // mock window.confirm
      const stub = cy.stub()
      stub.onFirstCall().returns(false)
      stub.onSecondCall().returns(true)

      cy.on('window:confirm', stub)
      // 测试删除评论
      cy.get('.delete').click()
      cy.get('.reply-content:first').should('contain', 'test')
      //
      cy.get('.delete').click()
      cy.get('.reply-content:first').should('not.contain', 'test')

      cy.end()
    })
  })
})
