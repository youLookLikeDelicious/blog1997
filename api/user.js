import axios from '~/plugins/axios'

// 登录
export function signIn (data) {
  return axios.post('/auth/login', data)
}

// 登出
export function logout () {
  return axios.post('oauth/logout')
}

// 注册
export function signUp (data) {
  return axios.post('oauth/sign-up', data)
}

// 重置密码
export function resetPassword (data) {
  return axios.post('/user/password/reset', data)
}
