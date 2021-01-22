describe('test article page', () => {
  [{ width: 768, height: 1000 }, { width: 1200, height: 1000 }].forEach((size) => {
    it('visit article detail page', () => {
      cy.intercept('POST', '/api/oauth/currentUser', { fixture: 'user-login' }).as('getCurrentUser')
      // 文章评论
      cy.intercept('post', /\/article\/comments\/ODM=\?p=1/, { fixture: 'article-comments' }).as('article.comments')
      // 添加删除的fixture
      cy.intercept('POST', '/api/comment', (req) => {
        const fixture = req.body.able_type === 'article' ? 'create-comment' : 'create-comment-reply'
        req.reply({ fixture })
      }).as('submitComment')
      // 定义删除评论的fixture
      cy.intercept('POST', '/api/comment/delete', 'fixture:delete-comment').as('deleteComment')
      cy.intercept('POST', '/api/report-illegal-info', 'fixture:report-illegal-info').as('reportIllegalInfo')
      // 定义点赞操作的fixture
      cy.intercept('POST', '/api/thumb-up', 'fixture:thumb-up').as('thumbUp')
      cy.intercept('get', '/api/article/ODM=', { fixture: 'article-odm=' })
      cy.intercept('get', '/image/gallery/2020-12-09/73.0739020016085fd09025120bb4.45066014.jpg', { fixture: 'images/gallery' })
      cy.viewport(size.width, size.height).visit('/article/ODM=')

      cy.wait(['@getCurrentUser', '@article.comments'])
      // 测试举报按钮
      cy.get('.article-sub-btn').scrollIntoView({ duration: 100, offset: { top: 200 } })
      cy.wait(500)
      cy.get('.article-sub-btn').trigger('mouseenter', { force: true })
      cy.get('.article-sub-btn .icofont-warning').click({ force: true })

      // 分别点击举报的原因
      cy.get('.report-illegal-reason > li > label').eq(1).click()
      cy.get('.report-illegal-reason > li > label').eq(2).click()
      cy.get('.report-illegal-reason > li > label').eq(0).click()

      // 输入举报的原因
      cy.get('.report-illegal-article > textarea').type('抄袭!严重抄袭')
      // 提交举报
      cy.get('.report-illegal-article > div > a').click({ force: true })
      cy.wait('@reportIllegalInfo')
      cy.wait(1000)

      // 键入评论的内容
      cy.get('.edui-body-container:first').then((el) => {
        el[0].scrollIntoView({ block: 'end' })
        return el[0]
      }).scrollIntoView().type('test article page', { force: true })

      // 点击表情按钮
      cy.wait(1000)
      cy.get('.edui-icon-emotion:first').click({ force: true })
      // 点击第一个表情
      cy.get('.edui-emotion-jd:first').click({ force: true })

      // 点击公式按钮
      cy.get('.edui-icon-formula:first').click({ force: true })
      cy.get('.edui-formula-wrapper').should('be.visible')
      cy.get('.edui-tab-pane > ul > li').eq(16).click({ force: true })
      // 点击提交按钮
      cy.get('.submit-article-comment-btn-wrap > a').scrollIntoView({ duration: 100 }).wait(500).click({ force: true })
      cy.wait('@submitComment')

      // 期望渲染 文章相关的评论数量
      cy.get('.comment_num').should('contain', '3')

      // 获取评论的回复按钮
      cy.get('.reply-menu:first .reply-btn').then((el) => {
        el[0].scrollIntoView({ block: 'center' })
        return el
      }).click({ force: true })

      cy.wait(1000)
      // 输入回复的内容
      cy.get('.edui-editor-body').eq(1).then((el) => {
        el[0].scrollIntoView({ block: 'end' })
        return el
      }).click({ force: true })

      // 输入回复的内容
      cy.get('.edui-icon-emotion:last').click({ force: true })
      // 点击第一个表情
      cy.get('.edui-emotion-jd:last').click({ force: true })
      cy.get('.edui-body-container').eq(1).clear('')
      cy.wait(300)
      cy.get('.edui-body-container').eq(1).type('reply-content')

      cy.get('.reply_btn:last').find('a:last').click({ force: true })

      cy.wait('@submitComment')

      cy.get('.reply-content').eq(1).should('contain', 'reply-content')

      // 测试评论数量
      cy.get('.comment_num').should('contain', '4')

      // 测试目录
      cy.wait(1000)
      cy.get('.claps-wrap:first').scrollIntoView({ duration: '200', easing: 'linear' })
      if (size.width === 1200) {
        cy.get('.cate-list').should('be.visible')
        cy.get('.cate-list a[href="#heading-1"]').click()
        cy.wait(1000)
      } else {
        cy.get('.cate-list').should('not.visible')
      }
      cy.end()
    })
  })
})
