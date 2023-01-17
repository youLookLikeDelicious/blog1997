<template>
  <div class="forgot-password login-form flex">
    <div class="relative-position">
      <v-input v-model="model.email" name="email" autocomplete="off" placeholder="邮箱" />
      <span class="icofont-email absolute-position" />
    </div>
    <a href="/" :class="['login-btn', { 'btn-disable': !allowSubmit }]" @click.prevent="sendRestPasswordLink">提 交</a>
  </div>
</template>

<script>
import { resetPassword } from '~/api/user'

export default {
  name: 'ForgotPassword',
  data () {
    return {
      isRequesting: false,
      model: {
        email: ''
      }
    }
  },
  computed: {
    allowSubmit () {
      return this.model.email && this.$verify('email', this.model.email) && !this.isRequesting
    }
  },
  mounted () {
    addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy () {
    removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    sendRestPasswordLink () {
      if (!this.allowSubmit) {
        return
      }
      this.isRequesting = true
      resetPassword(this.model)
        .then(() => this.$emit('close'))
        .finally(() => {
          this.isRequesting = false
        })
    },
    handleKeyUp (e) {
      if (e.keyCode !== 13) { return }
      this.sendRestPasswordLink()
    }
  }
}
</script>

<style lang="scss">
.forgot-password{
    margin-top: 7rem;
    height: 17rem;
}
</style>
