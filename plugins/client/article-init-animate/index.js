import animate from '@blog1997/animate'
/**
 * 文章列表初始化动画
 */
function handler (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return
    }

    const article = entry.target
    // 获取可视部分的宽度
    const clientHeight = document.documentElement.clientHeight
    // 获取滚动的高度 兼容Edge浏览器
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop
    // 如果可视高度+滚动的高度 >= 元素的offset高度
    if (clientHeight + scrollHeight >= article.offsetTop) {
      animate(article, {
        opacity: 1,
        duration: 258,
        paddingTop: '0px',
        finish: true
      })
    }
    window.$nuxt.$store.commit('globalState/pushVisibleBackDrop', article.dataset.index)
    observer.unobserve(article)
  })
}

const observer = new IntersectionObserver(handler, {
  threshold: 0.02
})

export default {
  install (Vue) {
    Vue.prototype.$articleInitAnimate = function (container) {
      const targets = container instanceof HTMLElement ? container.querySelectorAll('article.article-summary-wrapper') : document.querySelectorAll('article.article-summary-wrapper')
      for (let i = 0, len = targets.length; i < len; i++) {
        if (targets[i].getAttribute('show')) {
          continue
        }
        targets[i].setAttribute('show', 1)
        observer.observe(targets[i])
      }
    }
  }
}
