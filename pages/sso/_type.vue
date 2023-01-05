<template>
  <div v-if="!inProgress" class="login-callback">
    <span v-if="loginFailed">登陆失败</span>
  </div>
  <WaitingInProgress v-else />
</template>

<script>
import { getCsrfToken, sso } from '~/api/system'
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
      loginFailed: false
    }
  },
  async mounted () {
    // 获取参数
    const query = this.$route.query
    this.setInProgress(true)

    await getCsrfToken()
    const params = { code: query.code, p: 'home', type: this.$route.params.type }
    sso(params)
      .then((response) => {
        window.opener.setUserInfo(response.data.data)
      }).catch(() => {
        this.loginFailed = true
      }).finally(this.setInProgress)
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
