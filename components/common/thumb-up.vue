<!--
<thumbUp
  :category="article|comment"
  :id="7"
  :thumbs="boolean"
  :liked="number"/>
  点赞之后会emit thumbUp事件，参数event
-->
<template>
  <!------------------------------- 样式 1 大手掌 ------------------------------->
  <div v-if="category === 'article'" class="claps-wrap">
    <div class="claps">
      <a
        v-if="!thumbs"
        href="/"
        title="点赞"
        class="display-inline-block"
        @click.stop.prevent
        @click="thumbUp($event)"
      >
        <svg width="29" height="29" class="claps-hand" viewBox="0 0 29 29">
          <g fill-rule="evenodd">
            <path
              d="M13.74 1l.76 2.97.76-2.97zM16.82 4.78l1.84-2.56-1.43-.47zM10.38 2.22l1.84 2.56-.41-3.03zM22.38 22.62a5.11 5.11 0 0 1-3.16 1.61l.49-.45c2.88-2.89 3.45-5.98 1.69-9.21l-1.1-1.94-.96-2.02c-.31-.67-.23-1.18.25-1.55a.84.84 0 0 1 .66-.16c.34.05.66.28.88.6l2.85 5.02c1.18 1.97 1.38 5.12-1.6 8.1M9.1 22.1l-5.02-5.02a1 1 0 0 1 .7-1.7 1 1 0 0 1 .72.3l2.6 2.6a.44.44 0 0 0 .63-.62L6.1 15.04l-1.75-1.75a1 1 0 1 1 1.41-1.41l4.15 4.15a.44.44 0 0 0 .63 0 .44.44 0 0 0 0-.62L6.4 11.26l-1.18-1.18a1 1 0 0 1 0-1.4 1.02 1.02 0 0 1 1.41 0l1.18 1.16L11.96 14a.44.44 0 0 0 .62 0 .44.44 0 0 0 0-.63L8.43 9.22a.99.99 0 0 1-.3-.7.99.99 0 0 1 .3-.7 1 1 0 0 1 1.41 0l7 6.98a.44.44 0 0 0 .7-.5l-1.35-2.85c-.31-.68-.23-1.19.25-1.56a.85.85 0 0 1 .66-.16c.34.06.66.28.88.6L20.63 15c1.57 2.88 1.07 5.54-1.55 8.16a5.62 5.62 0 0 1-5.06 1.65 9.35 9.35 0 0 1-4.93-2.72zM13 6.98l2.56 2.56c-.5.6-.56 1.41-.15 2.28l.26.56-4.25-4.25a.98.98 0 0 1-.12-.45 1 1 0 0 1 .29-.7 1.02 1.02 0 0 1 1.41 0zm8.89 2.06c-.38-.56-.9-.92-1.49-1.01a1.74 1.74 0 0 0-1.34.33c-.38.29-.61.65-.71 1.06a2.1 2.1 0 0 0-1.1-.56 1.78 1.78 0 0 0-.99.13l-2.64-2.64a1.88 1.88 0 0 0-2.65 0 1.86 1.86 0 0 0-.48.85 1.89 1.89 0 0 0-2.67-.01 1.87 1.87 0 0 0-.5.9c-.76-.75-2-.75-2.7-.04a1.88 1.88 0 0 0 0 2.66c-.3.12-.61.29-.87.55a1.88 1.88 0 0 0 0 2.66l.62.62a1.88 1.88 0 0 0-.9 3.16l5.01 5.02c1.6 1.6 3.52 2.64 5.4 2.96a7.16 7.16 0 0 0 1.18.1c1.03 0 2-.25 2.9-.7A5.9 5.9 0 0 0 23 23.24c3.34-3.34 3.08-6.93 1.74-9.17l-2.87-5.04z"
            />
          </g>
        </svg>
      </a>
      <a v-if="thumbs" href="/" title="点赞" @click.stop.prevent @click="thumbUp($event)">
        <svg width="29" height="29" fill="#64748C" class="claps-hand" viewBox="0 0 29 29">
          <g fill-rule="evenodd">
            <path
              d="M13.74 1l.76 2.97.76-2.97zM18.63 2.22l-1.43-.47-.4 3.03zM11.79 1.75l-1.43.47 1.84 2.56zM24.47 14.3L21.45 9c-.29-.43-.69-.7-1.12-.78a1.16 1.16 0 0 0-.91.22c-.3.23-.48.52-.54.84l.05.07 2.85 5c1.95 3.56 1.32 6.97-1.85 10.14a8.46 8.46 0 0 1-.55.5 5.75 5.75 0 0 0 3.36-1.76c3.26-3.27 3.04-6.75 1.73-8.91M14.58 10.89c-.16-.83.1-1.57.7-2.15l-2.5-2.49c-.5-.5-1.38-.5-1.88 0-.18.18-.27.4-.33.63l4.01 4z"
            />
            <path
              d="M17.81 10.04a1.37 1.37 0 0 0-.88-.6.81.81 0 0 0-.64.15c-.18.13-.71.55-.24 1.56l1.43 3.03a.54.54 0 1 1-.87.61L9.2 7.38a.99.99 0 1 0-1.4 1.4l4.4 4.4a.54.54 0 1 1-.76.76l-4.4-4.4L5.8 8.3a.99.99 0 0 0-1.4 0 .98.98 0 0 0 0 1.39l1.25 1.24 4.4 4.4a.54.54 0 0 1 0 .76.54.54 0 0 1-.76 0l-4.4-4.4a1 1 0 0 0-1.4 0 .98.98 0 0 0 0 1.4l1.86 1.85 2.76 2.77a.54.54 0 0 1-.76.76L4.58 15.7a.98.98 0 0 0-1.4 0 .99.99 0 0 0 0 1.4l5.33 5.32c3.37 3.37 6.64 4.98 10.49 1.12 2.74-2.74 3.27-5.54 1.62-8.56l-2.8-4.94z"
            />
          </g>
        </svg>
      </a>
      <div class="explode-circle-wrap">
        <div class="explode-circle" />
      </div>
    </div>
    <span v-if="liked">{{ liked }} 赞</span>
  </div>
  <!------------------------------- 样式2 大拇指 ------------------------------->
  <div v-else style="display: inline-block">
    <div class="thumb-up-wrap">
      <div class="explode-circle-wrap">
        <div class="explode-circle" />
      </div>
      <a href="/" :class="{'icofont-thumbs-up': true, thumbs: thumbs}" @click.stop.prevent @click="thumbUp($event)" />
      <span v-if="liked">{{ liked }} 赞</span>
    </div>
  </div>
</template>

<script>
import { thumbUp } from '~/api/system'

export default {
  name: 'ThumbUp',
  props: {
    category: {
      type: String,
      default () {
        return 'comment' // | article
      }
    },
    // 被点赞模型的id
    id: {
      type: [Number, String],
      default () {
        return ''
      }
    },
    // 当前用户是否已点赞
    thumbs: {
      type: [Boolean, Number],
      default () {
        return false
      }
    },
    // 点赞数量
    liked: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      isUploading: false
    }
  },
  methods: {
    /**
     * 点赞
     */
    thumbUp (e) {
      // 判断用户是否登录
      if (!this.$userHasSignedIn()) {
        return
      }

      this.execThumbUpAnimate()

      if (this.isUploading) {
        return
      }

      this.submitPost(e)
    },
    /**
     * 执行点赞动画
     * 小圆圈主键扩大
     */
    execThumbUpAnimate () {
      // 获取小圆圈
      const circle = this.$el.querySelector('.explode-circle')

      this.$animate(
        circle,
        {
          width: '4.5rem',
          height: '4.5rem',
          opacity: 1,
          easing: 'bezier(0.7, 0.3)',
          duration: 216,
          finish: true
        },
        () => {
          circle.style.width = '0px'
          circle.style.height = '0px'
          circle.style.opacity = 0
        }
      )
    },
    /**
     * 提交表单数据
     * 如果成功，更改当前用户的点赞状态
     */
    submitPost (e) {
      // 生成表单数据
      const postData = {
        able_id: this.id,
        able_type: this.category
      }

      // 设置当前的状态未正在上传数据
      this.isUploading = true

      thumbUp(postData)
        .then(() => {
          // 修改当前用户的点赞状态
          this.$emit('thumbUp', e)
        })
        .finally(() => {
          this.isUploading = false
        })
    }
  }
}
</script>

<style lang="scss">
//--------------------------------------- 手掌样式
.claps-wrap {
  height: 5.5rem;
  display: inline-block;
  box-sizing: border-box;
  svg{
    fill: $background-color-level-4;
  }
  span {
    color: $background-color-level-4;
    font-size: 1.8rem;
    word-break: keep-all;
    vertical-align: middle;
  }
  .explode-circle-wrap {
    top: 0rem;
    left: 0rem;
  }
}
// ---------------------------------------- a标签容器的样式
.claps {
  $size: 5.5rem;
  width: $size;
  height: $size;
  position: relative;
  display: inline-block;
  text-align: center;
  a {
    display: inline-block;
    height: 5rem;
    line-height: 5rem;
    width: 5rem;
  }
}
// --------------------------------------- 手掌svg样式
.claps-hand {
  transition-duration: 0.3s;
  z-index: 2;
  position: relative;
  vertical-align: middle;
  &:hover {
    width: 3.5rem;
    height: 3.5rem;
  }
}
//--------------------------------------- 大拇指样式
.thumb-up-wrap {
  $size: 5.5rem;
  width: $size;
  height: $size;
  position: relative;
  display: inline-block;
  text-align: center;
  line-height: $size;
  .icofont-thumbs-up {
    color: #c6c6c6;
    width: 100%;
    z-index: 2;
    position: relative;
    font-size: 1.6rem;
    transition-duration: 128ms;
    margin-left: 0 !important;
    &:hover {
      color: #5c9dff;
    }
  }

  .thumbs {
    color: #6272a4;
  }
}

.explode-circle-wrap {
  width: 5.5rem;
  height: 5.5rem;
  position: absolute;
  text-align: center;
  line-height: 5.5rem;
  .explode-circle {
    display: inline-block;
    opacity: 0;
    $size: 0rem;
    width: $size;
    height: $size;
    border-radius: 100%;
    border: 0.1rem solid #7f828b;
    box-sizing: border-box;
  }
}
</style>
