<template>
  <div class="leave-message background-color-white">
    <div class="relative-position">
      <div v-if="!editorContent" class="leave-message-placeholder absolute-position" v-html="message" />
      <umeditor v-model="editorContent" :height="'150px'" :init-message="message" :toolbar="['emotion', 'formula']" @receiveUM="setUM" />
    </div>
    <div class="leave-message-btn-wrap">
      <a href="/" @click.stop.prevent @click="submitMessage">提 交</a>
    </div>
    <div v-if="meta.total" class="leave-message-count">
      共 <span>{{ meta.total }}</span> 条留言
    </div>
    <comment-list
      :show-more-comment="meta.last_page > query.page"
      :comments="comments"
      @getMoreComments="getMoreLeaveMessage"
      @getMoreReply="getMoreReply"
      @appendReply="appendReply"
      @deleteComment="deleteComment"
    />
  </div>
</template>

<script>
import editorMixin from '~/mixins/umeditor'
import { getLeaveMessage, postComment } from '~/api/system'
import commentMixin from '~/mixins/comment/comment-mixin'
import commentList from '~/components/comment-list/comment-list'
const message = '<p style="color: #666; font-size: 1.4rem;">我有一件礼物想呈现给你，那就是在孤独难耐的夜晚，依然会闪闪发光的 漫天繁星</p>'
export default {
  name: 'Message',
  components: {
    commentList
  },
  mixins: [commentMixin, editorMixin],
  data () {
    return {
      UM: undefined,
      message,
      meta: { total: 0 },
      editorContent: '',
      comments: [],
      query: { page: 1 }
    }
  },
  head () {
    return {
      title: this.$config.title + ' | Leave-Message'
    }
  },
  async asyncData ({ params }) {
    const data = await getLeaveMessage(params)
      .then(res => res.data)
      .catch(() => {
        return {}
      })
    data.comments = data.data
    delete data.data
    return data
  },
  methods: {
    setUM (um) {
      this.UM = um
    },
    /**
     * 提交留言
     */
    submitMessage () {
      if (!this.$userHasSignedIn()) {
        return
      }
      // 获取留言
      const content = this.editorContent

      // 如果留言为空
      if (!content) {
        this.$store.commit('globalState/setPromptMessage', { msg: '写点什么吧(●ˇ∀ˇ●)', status: false })
        return
      }

      const postData = {
        content: this.editorContent,
        able_id: 0,
        able_type: 'Blog1997'
      }

      // 开始提交
      postComment(postData)
        .then((response) => {
          // 评论成功
          // 清空评论窗口的内容
          this.setEditorContent('')
          // 追加评论到第一条
          this.meta.total += 1
          const comment = response.data.data
          comment.liked = 0
          this.comments.unshift(comment)
        })
    },
    /**
     * 获取更多的留言
     */
    getMoreLeaveMessage () {
      this.query.page += 1
      getLeaveMessage(this.query)
        .then(({ data }) => {
          this.comments = this.comments.concat(data.data)
          this.meta = data.meta
        })
    }
  }
}
</script>

<style lang="scss">
.leave-message{
  header{
    font-size: 18rem;
  }
  .leave-message-btn-wrap{
    margin-top: 2rem;
    margin-bottom: 3rem;
    text-align: right;
    a{
      @extend %submit-btn;
    }
  }
  .edui-editor-body{
    color: #233;
  }
  .leave-message-count{
    font-size: 1.2rem;
    color: #777;
    span{
      font-size: 1.4rem;
      font-weight: bold;
    }
  }
  .edui-toolbar{
    border-radius: .7rem;
  }
  .edui-btn{
    font-weight: normal;
  }
  .edui-icon{
    font-size: 1.6rem;
  }
}
.leave-message-placeholder{
  z-index: 9999;
  top: 4.5rem;
  left: 2rem;
}
</style>
