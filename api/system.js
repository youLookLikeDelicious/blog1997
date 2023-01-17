import axios from '~/plugins/axios'

export function getCsrfToken () {
  return axios.get('/csrf')
}

export function sso (data) {
  return axios.post('oauth/authorize', data)
}

// 获取首页数据
export function getIndex (params) {
  return axios.get('/', { params })
}

// 获取留言
export function getLeaveMessage (params) {
  return axios.get('/leave-message', { params })
}

// 评论
export function postComment (data) {
  return axios.post('/comment', data)
}

// 获取友链
export function getFriendLink () {
  return axios.get('/friend-link')
}

// 举报
export function reportIllegalInfo (data) {
  return axios.post('/report-illegal-info', data)
}

// 点赞
export function thumbUp (data) {
  return axios.post('/thumb-up', data)  
}
