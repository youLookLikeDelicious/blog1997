<template>
  <div v-if="!inProgress" class="login-callback">
    <span v-if="loginFaild">登陆失败</span>
  </div>
  <WaitingInProgress v-else />
</template>

<script>
import WaitingInProgress from '~/components/common/waiting-in-progress'

export default {
  name: 'LoginCallback',
  layout: 'login',
  components: {
    WaitingInProgress
  },
  data () {
    return {
      showLoginBtn: false,
      inProgress: true,
      loginFaild: false
    }
  },
  mounted () {
    // 获取参数
    const query = this.$route.query
    this.setInProgress(true)

    switch (this.$route.params.type) {
      // 使用qq登陆，授权成功的回调
      case 'qq':
        break
      // 使用微信登陆，授权成功的回调
      case 'weichat':
        this.$axios.post('oauth/authorize?p=home&type=weichat&code=' + query.code)
          .then((response) => {
            window.opener.setUserInfo(response.data.data)
          }).catch(() => {
            this.loginFaild = true
          }).finally(this.setInProgress)
        break
      // 使用git登陆，授权成功的回调
      default:
        if (query.code) {
          this.$axios.post('oauth/authorize?p=home&code=' + query.code)
            .then((response) => {
              // 登陆成功
              window.opener.setUserInfo(response.data.data)
            }).catch((e) => {
              this.loginFaild = true
            }).finally(this.setInProgress)
        }
        break
    }
  },
  methods: {
    setInProgress (state) {
      this.inProgress = state
    }
  }
}
</script>

<style lang="scss">
.login-callback{
  padding-top: 3rem;
  box-sizing: border-box;
  text-align: center;
}
</style>
