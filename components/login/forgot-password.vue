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
export default {
  name: 'ForgotPassword',
  data () {
    return {
      model: {
        email: ''
      }
    }
  },
  computed: {
    allowSubmit () {
      return this.model.email && this.$verify('email', this.model.email)
    }
  },
  methods: {
    sendRestPasswordLink () {
      this.$axios.post('/user/password/reset', this.model)
        .then(() => this.$emit('close'))
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
