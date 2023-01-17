import axios from '~/plugins/axios'

// 获取文章详情
export function getArticleInfo (id, config) {
  return axios.get(`/article/${id}`, config)
}

// 获取文章的评论
export function getComments (articleId, data) {
  return axios.post(`/article/comments/${articleId}`, data)
}

// 获取文章列表-用于首页，获取下一页数据
export function getArticleList (params) {
  return axios.get('', { params })
}

// 获取标签列表
export function getTagList (params) {
  return axios.get('/article/tags', { params })
}

// 搜索文章
export function searchArticle (data) {
  return axios.post('article/search', data)
}
