export default {
  methods: {
    /**
     * 加如评论按钮行为
     * @param {int} articleId
     */
    joinComment (articleId) {
      this.$router.push(`/article/${articleId}/#comments`)
    }
  }
}
