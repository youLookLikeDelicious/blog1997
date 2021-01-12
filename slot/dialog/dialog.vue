<template>
  <!--<dialog :titl="''" :width="" height=""></dialog>-->
  <div class="dialog-wrap">
    <transition appear @enter="enter" @leave="leave">
      <div
        v-if="showDialog"
        class="dialog"
        :style="{ width: computedWidth, height: computedHeight }"
      >
        <header>
          <span>{{ title }}</span>
          <a href="/" title="关闭" @click.stop.prevent @click="close">✘</a>
        </header>
        <!-- 对话框内容部分 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'VDialog',
  props: {
    title: {
      type: String,
      default () {
        return 'title'
      }
    },
    width: {
      type: String,
      default () {
        return '52rem'
      }
    },
    height: {
      type: String,
      default () {
        return '16rem'
      }
    }
  },
  data () {
    return {
      showDialog: true,
      animateDuration: 450
    }
  },
  computed: {
    computedWidth () {
      const width = parseInt(this.width)
      return width / 2 + this.width.replace(width, '')
    },
    computedHeight () {
      const height = parseInt(this.height)
      return height / 2 + this.height.replace(height, '')
    }
  },
  methods: {
    /**
     * 载入动画
     * @param el
     * @param done
     */
    enter (el, done) {
      this.$animate(el, {
        height: this.height,
        width: this.width,
        marginTop: '12rem',
        easing: 'bezier(0.6, 1.3)',
        duration: this.animateDuration
      }, done)
    },
    /**
     * 离开动画
     * @param el
     * @param done
     */
    leave (el, done) {
      this.$animate(el, {
        height: '40rem',
        width: '60rem',
        easing: 'bezier(0, 1.3)',
        duration: 64
      }, el => this.leaveCallback(el, done))
    },
    leaveCallback (el, done) {
      this.$animate(el, {
        height: this.computedHeight,
        width: this.computedWidth,
        marginTop: '24rem',
        easing: 'bezier(0.8)',
        duration: this.animateDuration / 2
      }, done)
    },
    /**
     * 关闭该窗口
     */
    close () {
      this.showDialog = false
      window.setTimeout(() => {
        this.$store.commit('globalState/hidDialog')
        this.showDialog = true
        this.$emit('close')
      }, this.animateDuration / 3 * 2)
    }
  }
}
</script>

<style lang="scss">
.dialog-wrap {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  animation-duration: 512ms;
  header {
    font-size: 1.5rem;
    border-bottom: 0.1rem solid $background-color-level-4;
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }
  .dialog {
    margin: 35rem auto 0 auto;
    background-color: $background-color-level-2;
    border: 0.1rem solid $background-color-level-4;
    border-radius: 0.5rem;
    padding: 1.7rem 1.7rem;
    box-shadow: 0.2rem 0.3rem 1rem #666;
    overflow: hidden;
    box-sizing: border-box;
  }
  textarea {
    background-color: $background-color-level-3;
    color: $html-color;
  }
}
</style>
