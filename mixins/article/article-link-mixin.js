export default {
  methods: {
    /**
     * 加如评论按钮行为
     * @param e
     */
    joinComment (e) {
      this.$router.push(`/article/${e.target.dataset.id}/#comments`)
    }
  }
}
