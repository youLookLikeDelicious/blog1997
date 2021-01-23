<template>
  <main>
    <navigate />
    <promptMessage :prompt="prompt" @shift-message="shiftPrompt" />
    <waiting />
    <login />
    <nuxt v-if="allowRenderMainPage" class="main_wrap" />
    <a v-if="showScrollToTop" class="scroll-to-top" href="/" @click.stop.prevent @click="scrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" xmlns:xlink="http://www.w3.org/1999/xlink">
        <glyph glyph-name="circled-up" unicode="&#xea6e;" horiz-adv-x="1000" />
        <path d="M500 937.5c241.5 0 437.5-196 437.5-437.5s-196-437.5-437.5-437.5-437.5 196-437.5 437.5 196 437.5 437.5 437.5z m-12.300000000000011-477.7l-202 201.99999999999994c-9.599999999999966 9.600000000000023-25.599999999999966 9.600000000000023-35.19999999999999 0l-58.80000000000001-58.799999999999955c-9.599999999999994-9.600000000000023-9.599999999999994-25.600000000000023 0-35.200000000000045l296-295.69999999999993c9.600000000000023-10 25.19999999999999-10 34.900000000000034 0l296 295.69999999999993c9.600000000000023 9.600000000000023 9.600000000000023 25.600000000000023 0 35.200000000000045l-58.80000000000007 58.799999999999955c-9.599999999999909 9.600000000000023-25.59999999999991 9.600000000000023-35.19999999999993 0l-202-201.99999999999994c-9.600000000000023-9.600000000000023-25.30000000000001-9.600000000000023-34.900000000000034 0z" />
      </svg>
    </a>
    <foot />
    <reportIllegalInfo v-if="$store.state.globalState.showDialog" />
  </main>
</template>

<script>
import navigate from '~/components/layout/navigate'
import foot from '~/components/layout/foot'
import login from '~/components/login/login'

export default {
  name: 'Default',
  components: {
    navigate,
    foot,
    login
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  middleware: ['clear-state'],
  data () {
    return {
      showScrollToTop: false,
      scrollLimite: 600,
      allowRenderMainPage: true
    }
  },
  computed: {
    prompt () {
      return this.$store.state.globalState.prompt
    }
  },
  mounted () {
    window.$nuxt.context.app.$canUseWebp()
    document.addEventListener('scroll', this.scrollDocumentElement)
    this.$nextTick(this.$initializeHTML)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.scrollDocumentElement)
  },
  methods: {
    /**
     * 将页面滚动到顶部
     */
    scrollToTop () {
      this.$animate(document.documentElement, { 'scrollTop': 0, duration: 258 })
    },
    /**
     * 页面滚动的时处理的事件
     * 控制滚动到顶部 的显隐
     */
    scrollDocumentElement () {
      // 获取滚动的高度
      const scrollTop = document.documentElement.scrollTop
      if (scrollTop > this.scrollLimite && !this.showScrollToTop) {
        this.showScrollToTop = true
      } else if (scrollTop < this.scrollLimite && this.showScrollToTop) {
        this.showScrollToTop = false
      }
    },
    reload () {
      this.allowRenderMainPage = false
      this.$nextTick(() => {
        this.allowRenderMainPage = true
      })
    },
    /**
     * 移除顶部的提示消息
     */
    shiftPrompt () {
      this.$store.commit('globalState/shiftPromptMessage')
    }
  }
}
</script>

<style lang="scss">
#__nuxt, #__layout{
  width: 100%;
  overflow-x: hidden;
}
@media screen and (min-width: 0) {
  .main_wrap{
    padding-left: 3rem !important;
    padding-right: 3rem !important;
  }
}
@media screen and (min-width: $media-min-width) {
  .main_wrap{
    padding: 0;
  }
}
.main_wrap{
    max-width: 128.4rem;
    width: 100%;
    margin: 0 auto;
    position: relative;
    padding-bottom: 2rem;
    padding-top: 5rem;
    box-sizing: border-box;
    display: block;
}
main{
  padding-top: 6rem;
  box-sizing: border-box;
  overflow-y: hidden;
  display: block;
}
.scroll-to-top{
  right: 2%;
  bottom: 10rem;
  position: fixed;
  text-align: center;
  z-index: 9999;
  svg{
    fill: $btn-color-2;
    width: 4rem;
    height: 4rem;
    &:hover{
      fill: $background-color-level-6;
    }
  }
}
</style>
