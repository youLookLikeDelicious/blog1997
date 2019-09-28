import Vue from 'vue'
import axios from 'axios'

Vue.use({
  install (Vue) {
    Vue.prototype.$axios = axios
  }
})
