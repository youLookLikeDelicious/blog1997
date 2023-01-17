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
        <v-helper tabindex="-1" content="<div>密码必须包含数字字母和其他字符, 长度必须超过9</div>" />
      </div>
    </div>
    <div class="relative-position">
      <v-input v-model="model.password_confirmation" type="password" placeholder="确认密码" name="password_confirmation" />
      <span class="icofont-lock absolute-position" />
    </div>
    <div class="relative-position">
      <v-input
        v-model="model.captcha"
        tabindex="-1"
        type="captcha"
        autocomplete="off"
        placeholder="验证码"
        name="captcha"
      />
      <span class="icofont-qr-code absolute-position" />
    </div>
    <img class="captcha" :src="'/api/captcha?' + captchaSuffix" alt="captcha" @click="$emit('refreshCaptcha')">

    <a href="/" :class="['login-btn', { 'btn-disable': !allowSubmit }]" @click.prevent="signUp">注 册</a>
  </div>
</template>

<script>
import passwordMix from '@bit/blog1997.vue-collection.password-mixin'
import passwordStrength from '@bit/blog1997.vue-collection.password-strength/password-strength.vue'
import { signUp } from '~/api/user'

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
      isRequesting: false,
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
      return this.model.email && this.model.captcha && this.strength >= 3 && this.$verify('email', this.model.email) && !this.isRequesting
    },
    showPasswordStrength () {
      return this.model.password
    }
  },
  mounted () {
    addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy () {
    removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    signUp () {
      if (!this.allowSubmit) {
        return
      }
      this.isRequesting = true
      signUp(this.model)
        .then(() => this.$emit('close'))
        .catch((e) => {
          this.$emit('refreshCaptcha')
        })
        .finally((_) => { this.isRequesting = false })
    },
    handleKeyUp (e) {
      if (e.keyCode !== 13) { return }
      this.signUp()
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
.password-strength {
  margin-top: 1rem !important;
  display: flex;
  justify-content: flex-start;
  span {
    width: 30%;
    height: 1rem;
    display: inline-block;
    box-sizing: border-box;
    border-radius: 0.3rem;
    border: 0.1rem solid #999;
    transition: background-color .3s;
    &:not(first-child) {
      margin-right: .7rem;
    }
  }
  .strength-1 {
    border: 0;
    background-color: #e61e1e;
    box-shadow: 0rem 0rem 0.2rem 0.1rem rgba($color: #e91313, $alpha: 0.3);
  }
  .strength-2 {
    border: 0;
    background-color: #f08c1a;
    box-shadow: 0rem 0rem 0.2rem 0.1rem rgba($color: #f38c16, $alpha: 0.3);
  }
  .strength-3 {
    border: 0;
    background-color: #32e23b;
    box-shadow: 0rem 0rem 0.2rem 0.1rem rgba($color: #34f316, $alpha: 0.3);
  }
}
</style>
