import { getReply } from '~/api/comment'

export default {
  methods: {
    /**
    * 获取更多的回复
    *
    * @param rootId
    */
    getMoreReply ({ rootId, offset }) {
      getReply(rootId, offset)
        .then((response) => {
          if (response.data.data.length) {
            this.appendReply(response.data.data)
          }
        })
    },
    /**
     * 删除评论
     *
     * @param commentId 评论id
     * @param level 评论层级
     * @param commentIndex 一级评论的索引
     */
    deleteComment ({ commentId, level, commentIndex, affectRows }) {
      this.commented -= affectRows // affectRow为负数

      if (+level === 1) {
        this.comments.splice(commentIndex, 1)
        return
      }
      this.comments[commentIndex].commented -= 1
      const replies = this.comments[commentIndex].replies
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
      const commentId = comments[0].root_id
      const commentIndex = this.comments.findIndex((item) => {
        // eslint-disable-next-line
          return item.id == commentId
      })

      // 获取被评论的索引
      if (isNew) {
        if (!this.comments[commentIndex].appendedReplies) {
          this.$set(this.comments[commentIndex], 'appendedReplies', comments)
        } else {
          this.comments[commentIndex].appendedReplies.unshift(...comments)
        }
        this.commented += 1
      }

      if (commentId === -1 || !this.comments[commentIndex]) {
        return
      }

      // 获取下一页的数据
      if (!isNew) {
        // 移除新追加的数据
        if (this.comments[commentIndex].appendedReplies) {
          this.comments[commentIndex].appendedReplies = this.comments[commentIndex].appendedReplies.filter((reply) => {
            return !comments.find(comment => comment.id === reply.id)
          })
        }
        this.comments[commentIndex].replies = this.comments[commentIndex].replies.concat(comments)
      }

      this.$nextTick(this.$initializeHTML)
    }
  }
}
