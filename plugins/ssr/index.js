import Vue from 'vue'
import './filter'
import './register-component'
import marked from './marked'

export default function ({ $config, $axios }) {
  Vue.use({
    install (vue) {
      vue.prototype.$marked = marked
      vue.prototype.$initHTML = function (target) {
        const content = target.content || target.summary
        return target.is_markdown === 'yes' ? marked(content) : content
      }
    }
  })
  $axios.defaults.baseURL = $config.baseURL
}
