import request from '~/plugins/axios'

// 获取文章详情
export function getArticleInfo (id, config) {
  return request.get(`/article/${id}`, config)
}

// 获取文章的评论
export function getComments (articleId, data) {
  return request.post(`/article/comments/${articleId}`, data)
}
