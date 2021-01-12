import animate from '@blog1997/animate'

export default {
  install (vue) {
    vue.prototype.$animate = animate
  }
}
