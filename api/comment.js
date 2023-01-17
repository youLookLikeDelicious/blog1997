import axios from '~/plugins/axios'

// 获取更多的回复
export function getReply (rootId, offset) {
  return axios.get(`comment/reply/${rootId}/${offset}`)
}

// 删除评论
export function deleteComment (id) {
  return axios.delete(`/comment/${id}`)
}

// 评论
export function storeComment (data) {
  return axios.post('/comment', data)
}
