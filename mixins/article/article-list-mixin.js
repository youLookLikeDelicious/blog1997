import { getArticleList } from '~/api/article'
export default {
  data () {
    return {
      data: [],
      meta: {},
      query: { page: 1 },
      inProgress: false // 正在请求的状态
    }
  },
  methods: {
    /**
     * 文章列表 分页获取文章
     */
    getMoreArticle () {
      // 如果正在请求 或 请求的页数大于总页数
      if (this.inProgress || ++this.query.page > this.meta.pages) {
        return
      }

      this.inProgress = true
      getArticleList(this.query)
        .then((response) => {
          this.data = this.data.concat(response.data.data)
          this.meta = response.data.meta
        }).catch(() => {

        }).finally(() => {
          this.inProgress = false
        })
    }
  }
}
