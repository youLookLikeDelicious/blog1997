<!--评论列表-->
// props Array comments
<!--
<comment-list
    :comments="records"
    @getMoreReply="getMoreReply"
    @appendReply="appendReply"
    @deleteComment="deleteComment"
  />
-->
<template>
  <div class="comment-list comment-list-wrap">
    <article v-for="(comment, index) in comments" :key="index" class="comment">
      <div class="relative-position">
        <section><span class="clear" /><span>#{{ index + 1 }}</span></section>
        <div class="comment-content">
          <div class="stamp relative-position">
            <avatar :src="comment.user.avatar" :alt="comment.name" />
            <svg class="absolute-position" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#005bea;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#00c6fb;stop-opacity:1" />
                </linearGradient>
              </defs>
              <circle
                stroke-width="5"
                stroke-linecap="round"
                stroke="url(#grad1)"
                stroke-dasharray="100 100"
                stroke-dashoffset="7"
                fill="none"
                cx="50"
                cy="50"
                r="30"
              />
            </svg>
            <p><span>{{ comment.user.name }}</span> <span>{{ comment.created_at }}</span> </p>
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="reply-content" v-html="comment.content" />
        </div>
        <!---------------------------------- 评论按钮 begein ---------------------------- -->
        <div
          class="reply-menu"
        >
          <div class="report-btn-wrapper">
            <a
              v-if="user.id"
              class="icofont-warning"
              href="/"
              @click.prevent
              @click="reportIllegalInfo(comment.content, comment.id)"
            >举报</a>
            <a
              v-if="comment.user_id == user.id"
              href="/"
              class="delete"
              @click.stop.prevent
              @click="deleteComment({commentId: comment.id, level: comment.level, commentIndex: index})"
            >
              删除
            </a>
            <a href="/" class="reply-btn" @click.prevent="clickReplyBtn($event, index)">回复</a>
            <thumbUp
              :id="comment.id"
              :thumbs="comment.thumbs"
              :liked="comment.liked"
              :data-comment-info="index"
              @thumbUp="comment.liked += 1"
            />
          </div>
        </div>
      </div>
      <!---------------------------------- 评论按钮 end ---------------------------- -->
      <!-------------------------------- 评论的回复 begin ---------------------------- -->
      {{ (replies = comment.appendedReplies ? comment.appendedReplies.concat(comment.replies) : comment.replies, void 0) }}
      <div v-if="(replies.length)" class="reply-content-wrap">
        <dl
          v-for="(reply, ind) in replies"
          :key="ind"
          class="relative-position"
        >
          <dt>{{ getReplyRelation(reply) }}</dt>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <dd class="reply-content" v-html="reply.content" />
          <!--                                 回复相关的按钮                     -->
          <dd class="clear">
            <div class="report-btn-wrapper">
              <a v-if="user.id" class="icofont-warning" href="/" @click.prevent @click="reportIllegalInfo(reply.content, reply.id)">举报</a>
              <a
                v-if="reply.user_id == user.id"
                href="/"
                class="delete"
                @click.stop.prevent
                @click="deleteComment({ commentId: reply.id, level: reply.level, commentIndex: index})"
              >删除</a>
              <a
                href="/"
                @click.prevent="clickReplyBtn($event, index, reply.id)"
              >回复</a>
              <thumbUp
                :id="reply.id"
                :thumbs="reply.thumbs"
                :liked="reply.liked"
                :data-comment-info="`${index}-${ind}`"
                @thumbUp="reply.liked += 1"
              />
            </div>
          </dd>
        </dl>
        <div class="more-reply">
          <a v-if="comment.commented > comment.replies.length" href="/" @click.prevent @click="getMoreReply(comment.id, comment.replies.length)">显示更多>></a>
        </div>
      </div>
      <div />
      <!-------------------------------- 评论的回复 end ---------------------------- -->
    </article>
    <!-- 获取更多评论 begin -->
    <div
      v-if="showMoreComment"
      class="more-comments"
    >
      <a
        href="/"
        @click.prevent="$emit('getMoreComments')"
      >获取更多评论 <i class="icofont-caret-down" /></a>
    </div>
    <!-- 获取更多评论 end -->
    <!-------------------------------- 富文本编辑器 begein ---------------------------- -->
    <div ref="replyEditorBox" class="reply-editor-box" slideTo="120">
      <umeditor
        v-model="editorContent"
        :width="'90%'"
        :height="'90px'"
        init-message=""
        :toolbar="['emotion', 'formula']"
        @receiveUM="receiveUM"
      />
      <div v-show="showReplyBtn" class="reply_btn">
        <a href="/" @click.prevent @click="toggleReplyBox($event)">取消</a><a href="/" @click.prevent.stop @click="submitReply($event)">提交</a>
      </div>
    </div>
    <!-------------------------------- 富文本编辑器 end ---------------------------- -->
    <div style="height: 1rem" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import editorMixin from '~/mixins/umeditor'
import thumbUp from '~/components/common/thumb-up'
import { deleteComment, storeComment } from '~/api/comment'

export default {
  name: 'CommentList',
  components: {
    thumbUp
  },
  mixins: [editorMixin],
  props: {
    comments: {
      type: Array,
      default () {
        return []
      }
    },
    showMoreComment: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      UM: undefined,
      showReplyBtn: false, // 显示回复组件的提交|取消按钮
      replyId: false, // 被评论的评论id,
      commentIndex: '',
      editorContent: '', // 用户创建的评论
      observer: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  beforeUpdate () {
    if (!this.showReplyBtn) {
      this.$nextTick(this.$initFormula)
    }
  },
  mounted () {
    this.$nextTick(this.$initializeHTML)
  },
  methods: {
    /**
     * 执行动画之后的回调
     */
    animateCallback () {
      if (this.$refs.replyEditorBox.style.display !== 'block') {
        this.$refs.replyEditorBox.style.display = 'block'
      }
      this.UM.setShow()
      this.showReplyBtn = true
    },
    /**
     * 设置回复部分的显隐
     *
     *@param {HTMLEvent} e
     */
    toggleReplyBox (e) {
      if (!this.showReplyBtn) {
        this.$animate(this.$refs.replyEditorBox.parentElement, { paddingBottom: '120px', duration: 256 }, this.animateCallback)
      } else {
        this.UM.setHide()
        this.$animate(this.$refs.replyEditorBox.parentElement, { paddingBottom: '0px', duration: 256 })
        this.showReplyBtn = false
      }
    },
    /**
     * 隐藏回复部分
     */
    hidReplyBox () {
      this.$refs.replyEditorBox.setAttribute('data-direct', 'up')
      this.showReplyBtn = false
      this.setEditorContent('')
      this.UM.setHide()
      this.$animate(this.$refs.replyEditorBox.parentElement, { paddingBottom: '0px', duration: 256 })
    },
    /**
     * 删除评论
     * @param commentId
     * @param level
     * @param commentIndex 一级评论的索引
     */
    deleteComment ({ commentId, level, commentIndex }) {
      if (!window.confirm('确定删除吗')) {
        return true
      }

      deleteComment(commentId)
        .then((response) => {
          // 删除成功
          const affectRows = response.data.data.rows
          this.$emit('deleteComment', { commentId, level, commentIndex, affectRows })
        })
    },
    /**
     * 显示回复评论的富文本
     *
     * @param e
     * @param commentIndex 评论的索引
     * @param replyId 回复的id
     * @return
     */
    clickReplyBtn (e, commentIndex, replyId = '') {
      // 如果用户没有登录，显示登录窗口
      if (!this.$userHasSignedIn()) {
        return
      }

      // 如果回复按钮不是当前的评论
      // eslint-disable-next-line eqeqeq
      if (this.commentIndex != commentIndex || this.replyId != replyId) {
        this.hidReplyBox()
      }

      this.commentIndex = commentIndex
      this.replyId = replyId

      // 在评论下方追加富文本元素,并启动显示动画
      e.target.parentNode.parentNode.parentNode.appendChild(this.$refs.replyEditorBox)

      this.toggleReplyBox()
    },
    /**
     * 提交回复
     * @param e
     */
    submitReply (e) {
      // 如果评论的内容为空
      if (!this.editorContent.trim()) {
        this.$store.commit('globalState/setPromptMessage', { msg: '写点什么吧>_<||', status: false })
        return
      }

      const comment = this.comments[this.commentIndex]

      // 生成提交的表单数据
      const postData = {
        able_id: this.replyId || comment.id,
        content: this.editorContent,
        able_type: 'comment'
      }

      storeComment(postData)
        .then((response) => {
          this.hidReplyBox()
          const data = response.data.data
          // 将提交的数据插入评论列表中
          data.name = this.user.name
          this.$emit('appendReply', [data], true)
        })
    },
    receiveUM (um) {
      this.UM = um
    },
    /**
     * 获取回复区的用户关系 x-回复-y: | x 回复:
     * @param reply
     */
    getReplyRelation (reply) {
      if (reply.level === 2) {
        return `${reply.user.name} 回复: `
      }

      return `${reply.user.name}-回复-${reply.receiver.name}: `
    },
    /**
     * 获取更多的回复
     */
    getMoreReply (rootId, offset) {
      this.$emit('getMoreReply', { rootId, offset })
    },
    /**
     * 举报非法信息
     *
     * @param {String} content 评论的内容
     * @param { Int } id 记录的ID
     */
    reportIllegalInfo (content, id) {
      this.$store.commit('reportIllegalInfo/reportComment', { preDefinedContent: content, reportedId: id })
    }
  }
}
</script>

<style lang="scss">
// ===================================================================== 整个组件最外层样式
.comment-list{
    width: 100%;
    box-sizing: border-box;
    margin: .7rem auto 17rem auto;
    padding: 0 0rem 1.7rem 0rem;
    position: relative;
    border-radius: .3rem;
    .reply-menu{
        font-size: 1.2rem;
        color: $fade-color;
        text-align: right;
        margin-right: 1.2rem;
        overflow-y: hidden;
        position: relative;
        color: #000;
        a{
            margin-left: 1.2rem;
        }
    }
    .no_comment{
        text-align: center;
    }
    .reply-editor-box{
        display: none;
        position: absolute;
        width: 100%;
        height: 0;
        left: 0;
        bottom: 12rem;
        // 重写umeditor的样式
        .edui-container{
            box-shadow: 0 0 0 #FFF;
            margin-left: auto;
            margin-right: auto;
            position: relative;
        }
        .edui-body-container{
          text-align: left;
        }
        .edui-popup-emotion{
          position: absolute;
        }
        .edui-editor-body{
          height: 9rem !important;
          box-sizing: border-box;
          overflow-y: auto
        }
        .edui-toolbar {
          background-color: transparent;
          box-shadow: 0 0 0 #fff;
          position: absolute;
          bottom: -3rem;
          border-bottom: .1rem;
        }
        .reply_btn{
          text-align: right;
          padding-right: 3.7rem;
          margin-top: .5rem;
          bottom: 0;
          height: 2.4rem;
          color: $text-color;
          a{
            margin-left: 1.2rem;
            font-size: 1.2rem;
          }
        }
    }
}
// ===================================================================== 每条评论的容器
.comment{
    max-width: 110rem;
    color: #000;
    border-radius: .5rem;
    margin: 0 auto 6rem auto;
    padding-bottom: 1.3rem;
    box-sizing: border-box;
    position: relative;
    display: block;
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.02),
      0 8px 10px 1px rgba(0, 0, 0, 0.04), 0 3px 14px 2px rgba(0, 0, 0, 0.02);

    section{
        padding-top: 1.2rem;
        text-align: right;
        width: 98%;
        margin: 0 auto 1.2rem auto;
        span{
            &:first-child{
                float: left;
                font-size: 1.2rem;
            }
        }
    }
    &:not(first){
        margin-top: 2.4rem;
    }
    .reply-content-wrap{
        box-sizing: border-box;
        padding-left: 1rem;
        padding-bottom: .3rem;
        font-size: 1.2rem;
        dl dt, dl dd{
            display: inline-block;
        }
        dt{
          margin-bottom: 1rem;
          align-items: flex-start;
        }
        dl{
            &:first-child{
                margin-top: 1.2rem;
            }
            display: flex;
            padding-top: 1.2rem;
            box-sizing: border-box;
            border-top: 0.1rem solid#c6c6c6;
        }
        .clear{
            display: flex;
            text-align: right;
            margin-left: auto;
            padding-right: 1.2rem;
            align-items: flex-end;
            box-sizing: border-box;
            a{
                margin-left: 1.2rem
            }
        }
      .reply-content{
        font-size: 1.6rem
      }
    }
}
// ====================================================================== 用户相关的信息
.stamp{
  padding-left: .9rem;
  text-align: left;
  $size: 4.5rem;
    img{
      width: $size;
      height:$size;
      border-radius: $size;
      display: inline-block;
    }
    p{
      height: $size;
      font-size: 1.4rem;
      margin-left: 0.5rem;
      display: inline-block;
      vertical-align: top;
      span{
        padding-bottom: .3rem;
        display: block;
      }
    }
    svg{
      width: 8rem;
      height: 8rem;
      bottom: -1.7rem;
      left: -.9rem;
    }
}
.comment-content{
    overflow: hidden;
}
// ====================================================================== 回复相关的样式
.reply-content{
    width: auto;
    margin-left: 2.1rem;
    line-height: 2.4rem;
    text-align: justify;
    font-size: 1.6rem;
    padding-left: 3rem;
    margin-top: 2rem;
    &:after{
        content: '';
        clear: both;
    }
}
.more-comments {
  text-align: center;
  a {
    color: rgb(38, 146, 235);
    transition: color .5s;
    &:hover{
      color: rgb(97, 172, 233);
    }
    &:active {
      color: rgb(2, 127, 230);
    }
  }
}
.report-btn-wrapper {
  color: $text-color;
  .icofont-warning {
    opacity: 0;
    // display: none;
    transition: opacity .3s;
  }
  &:hover {
    .icofont-warning {
      opacity: 1;
      display: inline-block;
    }
  }
}
</style>
