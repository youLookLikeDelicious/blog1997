export default {
  methods: {
    /**
    * 获取更多的回复
    * @param rootId
    * @param offset
    */
    getMoreReply ({ rootId, offset }) {
      // 开始请求
      this.$axios.get(`comment/reply/${rootId}/${offset}`)
        .then((response) => {
          if (response.data.data.length) {
            this.appendReply(response.data.data)
          }
        })
    },
    /**
     * 删除评论
     * @param commentId 评论id
     * @param level 评论层级
     * @param commentIndex 一级评论的索引
     */
    deleteComment ({ commentId, level, commentIndex, affectRows }) {
      this.commented -= affectRows // affectRow为负数

      // eslint-disable-next-line eqeqeq
      if (level == '1') {
        this.records.splice(commentIndex, 1)
        return
      }

      const replies = this.records[commentIndex].replies
      const replyIndex = replies.findIndex((item) => {
      // eslint-disable-next-line eqeqeq
        return item.id == commentId
      })

      replies.splice(replyIndex, 1)
    },
    /**
     * 追加评论的回复
     * @param comments Array
     * @param isNew 是新追加的
     */
    appendReply (comments, isNew = false) {
      let commentId = 0

      // 获取被评论的索引
      if (isNew) {
        this.commented += 1
      }

      commentId = comments[0].root_id

      const commentIndex = this.records.findIndex((item) => {
      // eslint-disable-next-line
        return item.id == commentId
      })

      if (commentId === -1 || !this.records[commentIndex]) {
        return
      }

      // 追加评论的数据
      this.records[commentIndex].replies = this.records[commentIndex].replies.concat(comments)

      this.$nextTick(this.$initializeHTML)
    }
  }
}
