<template>
  <div class="sigin-up login-form flex">
    <div class="relative-position">
      <v-input v-model="model.email" name="email" autocomplete="off" placeholder="邮箱" />
      <span class="icofont-email absolute-position" />
    </div>
    <div class="relative-position">
      <v-input v-model="model.password" type="password" placeholder="密码" name="password" />
      <span class="icofont-lock absolute-position" />
      <passwordStrength v-if="showPasswordStrength" :strength="strength" />
      <div class="password-info absolute-position">
        <v-helper content="<div>密码必须包含数字字母和其他字符, 长度必须超过9</div>" />
      </div>
    </div>
    <div class="relative-position">
      <v-input v-model="model.password_confirmation" type="password" placeholder="确认密码" name="password_confirmation" />
      <span class="icofont-lock absolute-position" />
    </div>
    <div class="relative-position">
      <v-input v-model="model.captcha" type="captcha" autocomplete="off" placeholder="验证码" name="captcha" />
      <span class="icofont-qr-code absolute-position" />
    </div>
    <img class="captcha" :src="'/admin/captcha?' + captchaSuffix" alt="captcha" @click="$emit('refreshCaptcha')">

    <a href="/" :class="['login-btn', { 'btn-disable': !allowSubmit }]" @click.prevent="signUp">注 册</a>
  </div>
</template>

<script>
import passwordMix from '@bit/blog1997.vue-collection.password-mixin'
import passwordStrength from '@bit/blog1997.vue-collection.password-strength/password-strength.vue'
export default {
  name: 'SignUp',
  components: {
    passwordStrength
  },
  mixins: [passwordMix],
  props: {
    captchaSuffix: {
      type: Number,
      default () {
        return 2
      }
    }
  },
  data () {
    return {
      model: {
        email: '',
        captcha: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    allowSubmit () {
      return this.model.email && this.model.captcha && this.strength >= 3 && this.$verify('email', this.model.email)
    },
    showPasswordStrength () {
      return this.model.password && this.model.password.length > 9
    }
  },
  methods: {
    signUp () {
      if (!this.allowSubmit) {
        return
      }

      this.$axios.post('oauth/sign-up', this.model)
        .then(() => this.$emit('close'))
        .catch((e) => {
          this.$emit('refreshCaptcha')
        })
    }
  }
}
</script>

<style lang="scss">
.sigin-up{
  height: fit-content;
  .password-strength{
    margin-top: 0;
  }
  .password-info{
    top: -1.5rem;
    right: -3rem;
  }
  .helper-content{
    right: -3.7rem;
    z-index: 2;
    &::before{
      right: 4rem;
    }
  }
}
</style>
