<template>
  <transition
    appear
    @enter="enter"
  >
    <div v-if="prompt.message" class="prompt-message">
      <div>
        <i v-if="prompt.status" class="succ">✔</i>
        <i v-if="!prompt.status" class="error">✘</i>
        {{ prompt.message }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PromptMessage',
  computed: {
    prompt () {
      return this.$store.state.globalState.prompt
    }
  },
  methods: {
    // 启动开启动画，三秒之后将消息框的高度设为0，然后清空vux的消息状态
    enter (el, done) {
      this.$animate(el, { ani: 'slideDown', duration: 450 }, () => {
        window.setTimeout(() => {
          this.$animate(this.$el, { ani: 'slideUp', duration: 450 }, () => {
            this.$store.commit('globalState/setPromptMessage', '')
          })
        }, 3000)
      })
      done()
    }
  }
}
</script>

<style lang="scss">
.prompt-message {
    display: none;
    position: fixed;
    width: 100%;
    top: 7rem;
    overflow: hidden;
    z-index: 9999;

    div {
        width: 40%;
        margin: 0 auto;
        padding: .7rem 2.5rem;
        top: 12rem;
        text-align: center;
        background-color: #fff;
        border-radius: .3rem;
        border: .1rem solid #c6c6c6;
        vertical-align: 100%;
    }

    .succ {
        color: #9cb945;
    }

    .error {
        color: orangered;
    }
}
</style>
