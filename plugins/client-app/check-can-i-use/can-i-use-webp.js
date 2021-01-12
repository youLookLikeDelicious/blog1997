export default ({ app, store }) => {
  app.$canUseWebp = function () {
    // 判断浏览器是否支持webp
    function canUseWebP () {
      const elem = document.createElement('canvas')

      if (elem.getContext && elem.getContext('2d')) {
      // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
      }

      // very old browser like IE 8, canvas not supported
      return false
    }

    if (canUseWebP()) {
      return
    }
    store.commit('globalState/setCanUseWebp', false)
  }
}
