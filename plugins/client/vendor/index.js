import animate from '@blog1997/animate'
import { initFormula, initMap } from '@blog1997/vue-umeditor' // 服务端渲染，在客户端调用umeditor的相关依赖
import highLightJs from './highlight.js'

export default {
  install (Vue) {
    Vue.prototype.$animate = animate
    Vue.prototype.$highLightJs = highLightJs
    Vue.prototype.$initFormula = initFormula
    Vue.prototype.$initMap = initMap
    Vue.prototype.$initializeHTML = function () {
      this.$articleInitAnimate()
      this.$lazy()
      this.$initFormula()
      this.$highLightJs()
    }
  }
}
