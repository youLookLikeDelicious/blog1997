import Vue from 'vue'
import './filter'
import './register-component'
import marked from './marked'

Vue.use({
  install (vue) {
    vue.prototype.$marked = marked
    vue.prototype.$initHTML = function (target) {
      return target.is_markdown === 'yes' ? marked(target.content || target.summary) : target.content
    }
  }
})
