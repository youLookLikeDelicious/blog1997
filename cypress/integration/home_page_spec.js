describe('test home page', () => {
  [{ width: 768, height: 1000 }, { width: 1200, height: 1000 }].forEach((size) => {
    it('visit blog1997', () => {
      cy.intercept('GET', /api\/search\??.*/, { fixture: 'search' }).as('search')
      cy.intercept('POST', '/api/oauth/currentUser', { fixture: 'user-logout' }).as('getCurrentUser')
      cy.intercept('get', /api/, { fixture: 'home' })
      cy.viewport(size.width, size.height).visit('/about-me')

      cy.intercept('get', '/image/gallery/2020-12-09/228.087949001615fd08fc21579d0.79028584.jpg', { fixture: 'images/gallery' })
      cy.intercept('post', '/api/article/search', (req) => {
        let fixture
        switch (req.body.orderBy) {
          case 'visit':
            fixture = 'search-by-hot'
            break
          case 'new':
            fixture = 'search-by-new'
            break
          case 'commented':
            fixture = 'search-by-comment'
            break
          default:
            fixture = 'search'
        }
        req.reply({ fixture })
      })

      cy.title(Cypress.env('title'))

      switch (size.width) {
        // 测试 窄屏效果
        case 768:
          // 展开导航栏
          cy.get('.nav-icon').click()
          cy.wait(1000)
          cy.get('.menu a').eq(0).click()
          cy.wait(1000)
          // 跳转到首页
          cy.get('.nav-icon').should('be.visible')
          cy.get('.nav-icon').click()
          cy.wait(1000)
          cy.get('.nav-icon').click()
          cy.wait(1000)

          // 测试搜索框
          cy.get('.nav-icon').click()
          cy.wait(1000)
          cy.get('.search > input').type('vue2')
          cy.get('.icofont-search-2').click()
          cy.wait(2000)
          break
        // 测试宽屏效果
        default:
          cy.get('.menu a').eq(0).click()
          cy.get('.nav-icon').should('not.be.visible')
          // 滚动到顶部菜单 期望 隐藏
          cy.get('scroll-to-top').should('not.be.exist')

          // cy.get('.read-more-article > a')
          //   .scrollIntoView({ duration: 100 })
          //   .wait(500)
          //   .click()

          cy.get('.footer').scrollIntoView({ duration: 200, timeout: 200 })
          cy.wait(1000)
          // 滚动到顶部菜单期望显示
          cy.get('.scroll-to-top').should('be.visible').click()

          // 点击登陆按钮
          cy.wait(1000)
          cy.get('.user-info').click()

          cy.get('.login-wrap').should('be.visible')
          cy.get('.login-wrap > div > header > a.close').click()

          // 点击使用git登陆
          // cy.get('.git').click()

          cy.getCookie('blog1997_session').should('exist')

          // 搜索测试
          cy.wait(1000)
          cy.get('.search > input')
            .type('vue2')
          cy.get('.search .icofont-search-2').click()

          // 查询热门文章
          cy.get('.order-by > div > a:first').should('have.class', 'on')

          cy.get('.order-by > div > a').eq(1).click()
          cy.wait(1000)
          cy.get('.order-by > div > a').eq(1).should('have.class', 'on')
          cy.wait(1000)

          // 查询最新的文章
          cy.get('.order-by > div > a').eq(2).click()
          cy.wait(1000)
          cy.get('.order-by > div > a').eq(2).should('have.class', 'on')
          cy.wait(1000)

          // 查询评论最多的文章
          cy.get('.order-by > div > a').eq(3).click()
          cy.wait(1000)
          cy.get('.order-by > div > a').eq(3).should('have.class', 'on')
          cy.get('.icofont-search-2')
            .click()
          cy.wait(2000)
          break
      }

      cy.end()
    })
  })
})
