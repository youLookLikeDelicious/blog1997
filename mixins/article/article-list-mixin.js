export default {
  data () {
    return {
      articles: [],
      pages: 1, // 总页数
      p: 1, // 当前页
      inProgress: false // 正在请求的状态
    }
  },
  computed: {
    getMoreCondition () {
      return ''
    }
  },
  methods: {
    /**
     * 文章列表 分页获取文章
     */
    getMoreArticle () {
      // 如果正在请求 或 请求的页数大于总页数
      if (this.inProgress || ++this.p > this.pages) {
        return
      }

      this.inProgress = true
      this.$axios.get(`${this.getMoreUrl}?p=${this.p}&${this.getMoreCondition}`)
        .then((response) => {
          this.articles = this.articles.concat(response.data.data.articles)
        }).catch(() => {

        }).finally(() => {
          this.inProgress = false
        })
    }
  }
}
