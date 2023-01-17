import https from 'https'
import axios from 'axios'
/****************************
export default axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true
})
*/
// axios.defaults.baseURL = process.env.BASE_URL
axios.defaults.withCredentials = true

// 开发模式中忽略证书验证
if (process.env.NODE_ENV === 'development') {
  axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
}
const emptyUser = { id: '' }

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  if (process.browser) {
    const message = response.message
    if (message && message !== 'success') {
      window.$nuxt.$store.commit('globalState/setPromptMessage', { msg: message, status: true })
    }
    // 取消等待动画
    window.$nuxt.$store.commit('globalState/setWaitingState', false)
  }
  return response
}, function (error) {
  const { response } = error
  // 在客户端
  if (process.browser && response) {
    // 用户登录信息异常
    // 展示登录对话框
    // 清空store用户信息
    if (response.status === 401) {
      window.$nuxt.$store.commit('user/setUser', emptyUser)
      window.$nuxt.$store.commit('globalState/setShowLogin', true)
    }

    let errorMessage = ''
    const errors = response.errors
    // 获取报错的信息
    if (errors) {
      for (const key in errors) {
        if (typeof errors[key] === 'object') {
          errorMessage += errors[key].toString() + '\n'
        } else {
          errorMessage += errors[key]
        }
      }
    } else {
      try {
        errorMessage = Object.values(response.data.message).map(item => item.join('\n')).join('\n')
      } catch {
        errorMessage = response.data.message || '未知错误'
      }
    }
    // 设置提示消息
    window.$nuxt.$store.commit('globalState/setPromptMessage', { msg: errorMessage, status: false })
    // 取消等待动画
    window.$nuxt.$store.commit('globalState/setWaitingState', false)
  }
  return Promise.reject(error)
})

// 如果在客户端中进行请求，开启等待动画
axios.interceptors.request.use(function (config) {
  if (/\/$/.test(config.url)) {
    config.url = config.url.slice(0, -1)
  }
  if (process.browser) {
    // 如果header不是对象
    if (Object.prototype.toString.call(config.headers) !== '[object Object]') {
      config.headers = {}
    }

    config.headers['support-webp'] = window.$nuxt.$store.state.globalState.canUseWebp
    window.$nuxt.$store.commit('globalState/setWaitingState', true)
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

export default axios
