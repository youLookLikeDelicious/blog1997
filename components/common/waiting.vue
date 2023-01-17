<template>
  <div v-if="waiting" class="waiting" />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Waiting',
  computed: {
    ...mapGetters(['waiting'])
  },
  updated () {
    this.waitingAnimate()
  },
  methods: {
    /**
     * 来回滚动
     */
    waitingAnimate () {
      this.$animate(this.$el, {
        left: '0rem',
        duration: 800
      }, this.animateCallBack)
    },
    animateCallBack () {
      this.$animate(this.$el, { left: '-100rem', duration: 800 }, this.waitingAnimate)
    }
  }
}
</script>

<style lang="scss">
.waiting{
  position: fixed;
  top: 0;
  left: -100rem;
  height: .6rem;
  z-index: 99999;
  width: 400rem;
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr=yellow, endColorstr=red);
  @include compatible-style('', ('background-image': linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)) );
}
</style>
