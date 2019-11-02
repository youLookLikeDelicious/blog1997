// 注册全局组件等
import Vue from 'vue'
import promptMessage from '~/components/common/prompt-message'
import waiting from '~/components/common/waiting'
import pagination from '~/components/common/pagination'

Vue.use({
  install (Vue) {
    Vue.component('promptMessage', promptMessage)
    Vue.component('waiting', waiting)
    Vue.component('pagination', pagination)
  }
})
