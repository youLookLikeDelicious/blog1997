import Vue from 'vue'
import './global'
import verify from '@bit/blog1997.vue-collection.verify-plugin/index.js'
import utile from './utile/index'
import articleInitAnimate from './article-init-animate/index'
import currentUser from './current-user'
import vender from './vendor'
import lazy from './lazy-load/index.js'

Vue.use(verify)
Vue.use(vender)
Vue.use(utile)
Vue.use(articleInitAnimate)
Vue.use(currentUser)
Vue.use({
  install (vue) {
    vue.prototype.$lazy = lazy
  }
})
