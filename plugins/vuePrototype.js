import Vue from 'vue'
import axios from 'axios'
import animate from 'xy-animate'

Vue.use({
  install (Vue) {
    axios.defaults.baseURL = process.env.BASE_URL
    axios.defaults.withCredentials = true
    Vue.prototype.$axios = axios
    Vue.prototype.$animate = animate
    // 阻止默认的行为
    Vue.prototype.$preventEvent = function ($e) {
      if ($e.preventDefault) {
        $e.preventDefault()
      } else {
        $e.returnValue = false
      }
    }
  }
})
