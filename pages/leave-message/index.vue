<template>
  <div class="leave-message background-color-white">
    <div class="relative-position">
      <div v-if="!editorContent" class="leave-message-placeholder absolute-position" v-html="message" />
      <umeditor v-model="editorContent" :height="'150px'" :init-message="message" :toolbar="['emotion', 'formula']" @receiveUM="setUM" />
    </div>
    <div class="leave-message-btn-wrap">
      <a href="/" @click.stop.prevent @click="submitMessage">提 交</a>
    </div>
    <div v-if="commented" class="leave-message-count">
      共 <span>{{ commented }}</span> 条留言
    </div>
    <commentList
      :p="p"
      :pages="pages"
      :comments="records"
      @getMoreComments="getMoreLeaveMessage"
      @getMoreReply="getMoreReply"
      @appendReply="appendReply"
      @deleteComment="deleteComment"
    />
  </div>
</template>

<script>
import commentList from '~/components/comment-list/comment-list'
import commentMixin from '~/mixins/comment/comment-mixin'
import editorMixin from '~/mixins/umeditor'
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
      p: 1,
      pages: 1,
      editorContent: '',
      commented: 0,
      records: []
    }
  },
  head () {
    return {
      title: process.env.title + ' | leave-message'
    }
  },
  async asyncData ({ app, $responseHandler, req, res }) {
    const data = await app.$axios.get('leave-message', req)
      .then(response => $responseHandler(response, res)).catch(() => {
        return {}
      })

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
      this.$axios.post('/comment', postData)
        .then((response) => {
          // 评论成功
          // 清空评论窗口的内容
          this.setEditorContent('')
          // 追加评论到第一条
          this.commented += 1
          const data = response.data.data
          data.avatar = this.$store.state.user.avatar
          data.name = this.$store.state.user.name
          data.liked = 0
          this.records.unshift(data)
        })
    },
    /**
     * 获取更多的留言
     */
    getMoreLeaveMessage () {
      this.$axios.get('leave-message?p=' + (this.p + 1))
        .then(response => response.data.data)
        .then((data) => {
          this.records = this.records.concat(data.records)
          this.p = data.p
          this.pages = data.pages
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
