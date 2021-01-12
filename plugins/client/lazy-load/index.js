import axios from 'axios'
/**
 * 定义observer的回调
 * @param {IntersectionObserverEntry} entries
 * @param {IntersectionObserver} observer
 */
const intersectionHandler = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return
    }
    const target = entry.target
    target.src = target.dataset.src
    if (target.src.includes('image/article')) {
      // 请求未压缩的图片
      axios({
        url: target.src + '?t=origin',
        baseURL: '/',
        responseType: 'blob'
      }).then(response => response.data)
        .then((data) => {
          target.src = URL.createObjectURL(data)
        })
    }
    target.classList.remove('lazy')
    observer.unobserve(entry.target)
  })
}

const observer = new IntersectionObserver(intersectionHandler, {
  threshold: 0.02
})

/**
 * 懒加载图片
 *
 * @param {HTMLElement} container
 * @returns {void}
 */
const lazy = (container) => {
  const targets = container ? container.querySelectorAll('.lazy') : document.querySelectorAll('.lazy')

  targets.forEach((target) => {
    if (target.dataset.observed) {
      return
    }
    target.dataset.observed = 'observed'
    observer.observe(target)
  })
}

export default lazy
