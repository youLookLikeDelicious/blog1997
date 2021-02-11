<template>
  <div class="login-form flex">
    <div class="relative-position">
      <v-input v-model="model.email" placeholder="邮箱" autocomplete="off" name="email" />
      <span class="icofont-email absolute-position" />
    </div>
    <div class="relative-position">
      <v-input v-model="model.password" type="password" placeholder="密码" name="password" />
      <span class="icofont-lock absolute-position" />
    </div>
    <div class="relative-position">
      <v-input v-model="model.captcha" type="captcha" autocomplete="off" placeholder="验证码" name="captcha" />
      <span class="icofont-qr-code absolute-position" />
    </div>
    <img class="captcha" :src="'/admin/captcha?' + captchaSuffix" alt="captcha" @click="$emit('refreshCaptcha')">
    <div class="login-btns flex">
      <a href="/" @click.prevent="forgotPassword">忘记密码?</a>
      <a href="/" @click.prevent="register">注册</a>
    </div>
    <a href="/" class="login-btn" @click.prevent="loginByEmail">登 陆</a>
    <div class="social-account-wrapper">
      <a
        href="/"
        class="git social-account"
        @click.stop.prevent="loginByGit($event)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <glyph
            glyph-name="github"
            unicode="&#xed3e;"
            horiz-adv-x="1000"
          />
          <path d="M738.4 65.1c-78.19999999999993 48.900000000000006-158.89999999999998 7.6000000000000085-217 0-256.7-33.699999999999996-338.29999999999995 265.70000000000005-151.29999999999995 385.79999999999995-48.10000000000002 24.900000000000034-45 151.89999999999998 6.599999999999966 170-121.39999999999998 13.800000000000068-144 185.10000000000002-78.80000000000001 255 79.30000000000001 85 323.1 79.30000000000007 394.6 0 50-55.39999999999998 56.89999999999998-169.60000000000002 13.100000000000023-222.19999999999993-39.89999999999998-48-239.8-55.30000000000007-236.8-130.80000000000007 2.1999999999999886-52.799999999999955 74.49999999999994-44.39999999999998 118.40000000000003-65.39999999999998 82.59999999999991-39.5 131-157.60000000000002 98.59999999999991-248.5 18.5-3.5 34.200000000000045-9.599999999999994 52.60000000000002-13v-130.9z m-315.59999999999997 274.70000000000005c-96.19999999999999-209.60000000000008 221.3-194.60000000000008 124.90000000000003-5.684341886080802e-14-31.600000000000023 23.399999999999977-93.80000000000007 25.69999999999999-124.90000000000003 0z m177.49999999999994 411.79999999999995c8.5 94.10000000000002-181.89999999999998 98.19999999999993-203.89999999999998 32.69999999999993-18.5-55.09999999999991 4.5-70.79999999999995 59.10000000000002-85 62-16.09999999999991 139.10000000000002-10.599999999999909 144.79999999999995 52.30000000000007z" />
        </svg>
      </a>
      <!-- <a
        href="/"
        class="qq social-account"
        @click.stop.prevent="loginByQQ"
      /> -->
      <a
        href="/"
        class="weichat social-account"
        @click.stop.prevent="loginByWeChat"
      ><i class="icofont-wechat" /></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  props: {
    captchaSuffix: {
      type: Number,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      model: {
        email: '',
        password: '',
        captcha: ''
      }
    }
  },
  computed: {
    allowLoginByEmail () {
      return this.model.email && this.model.password && this.model.captcha
    }
  },
  methods: {
    /**
     * 通过邮箱密码登陆
     */
    loginByEmail () {
      if (!this.allowLoginByEmail) {
        return
      }
      this.$axios.post('/auth/login', this.model)
        .then(response => response.data.data)
        .then((user) => {
          this.$store.commit('user/setUser', user)
          this.$emit('close')
        })
        .catch(e => this.$emit('refreshCaptcha'))
    },
    // loginByQQ () {
    //   this.$store.commit('globalState/setPromptMessage', { msg: '马上就好', status: true })
    // },
    loginByWeChat () {
      this.openNewWindow(`https://open.weixin.qq.com/connect/qrconnect?appid=${this.$config.weChatAppId}&redirect_uri=${this.$config.weChatRedirect}&response_type=code&scope=snsapi_login&state=state`, '使用微信登陆')
    },
    /**
     * 点击git图标的行为
     * @param e
     */
    loginByGit () {
      this.openNewWindow(`https://github.com/login/oauth/authorize?client_id=${this.$config.gitClientId}&redirect_uri=${this.$config.gitCallBack}`, '使用GIT登陆')
    },
    /**
     * 打开新的窗口
     * @param url 路径
     * @param title 标题
     * @param options
     */
    openNewWindow (url, title, options = 'width=720,height=430,resizable,scrollbars=no,status=1') {
      if (window.newWindow) {
        window.newWindow.close()
        window.newWindow = ''
      }
      window.newWindow = window.open(url, title, options)
    },
    /**
     * 忘记密码
     */
    forgotPassword () {
      this.$emit('switch-component', 'ForgotPassword')
    },
    /**
     * 注册
     */
    register () {
      this.$emit('switch-component', 'SignUp')
    }
  }
}
</script>

<style lang="scss">
.social-account-wrapper{
    width: 23rem;
    margin-top: 1.7rem;
}
</style>
