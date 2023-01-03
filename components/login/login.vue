<template>
  <transition
    appear
    @enter="enter"
    @leave="leave"
  >
    <div
      v-if="$store.state.globalState.showLogin"
      class="login-wrap"
    >
      <div class="login">
        <header>
          <img
            src="/admin/image/logo.png"
            alt=""
          >
          <span>Blog1997</span>
          <a
            href="/"
            class="close"
            @click.prevent="close"
          >✘</a>
        </header>
        <div class="login-box">
          <component
            :is="childComponent"
            :captcha-suffix="captchaSuffix"
            @switch-component="switchComponent"
            @close="close"
            @refreshCaptcha="refreshCaptcha"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SignIn from './sign-in'
import SignUp from './sign-up'
import ForgotPassword from './forgot-password'

export default {
  layout: 'login',
  name: 'Login',
  components: {
    SignIn,
    SignUp,
    ForgotPassword
  },
  data () {
    return {
      captchaSuffix: Math.random(),
      childComponent: SignIn // 当前的子组件
    }
  },
  methods: {
    /**
     * 关闭登陆组件
     */
    close () {
      this.$store.commit('globalState/setShowLogin', false)
      this.childComponent = SignIn
    },
    /**
     * @param el
     * @param done
     * 组件载入动画
     */
    enter (el, done) {
      this.$animate(el.querySelector('div .login'), { width: '37rem', height: '32rem', opacity: 1, duration: 230 })
      done()
    },
    /**
     * 组件注销动画
     * @param el
     * @param done
     */
    leave (el, done) {
      this.$animate(el.querySelector('div .login'), { height: '0px', duration: 230, opacity: 0 }, done)
    },
    /**
     * 刷新验证码
     */
    refreshCaptcha () {
      this.captchaSuffix = Math.random()
    },
    /**
     * 更改子组件
     *
     * @param {string} name
     */
    switchComponent (name) {
      switch (name) {
        case 'SignUp':
          this.childComponent = SignUp
          break
        case 'ForgotPassword':
          this.childComponent = ForgotPassword
          break
      }
    }
  }
}
</script>

<style lang="scss">
.login-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
.login-form {
  margin: 0 auto;
  justify-content: center;
  flex-wrap: wrap;
  input {
    padding-left: 2.3rem !important;
    color: #fff;
  }
  span {
    top: 2rem;
    left: 0.3rem;
    font-size: 1.6rem;
  }
  .login-btn {
    width: 23rem;
    box-sizing: border-box;
    display: inline-block;
    font-size: 1.6rem;
    margin-top: 1.2rem;
    border-radius: 0.3rem;
    height: 3.5rem;
    line-height: 3.5rem;
    background-color: #3572ce;
    transition: background-color .3s;
    &:hover {
      background-color: #276ace;
    }
    &:active {
      background-color: #326ec8;
    }
  }
  .captcha {
    width: 23rem;
    margin-top: 1rem;
    cursor: pointer;
  }
  .login-btns {
    width: 23rem;
    color: #d5d7da;
    margin-top: 1rem;
    font-size: 1.4rem;
    justify-content: space-between;
  }
}
.login-wrap .login {
  height: 0;
  opacity: 0;
  width: 0rem;
  $height: 20rem;
  font-size: 3rem;
  overflow: hidden;
  text-align: center;
  padding-top: 1.7rem;
  border-radius: 0.5rem;
  margin: 5.7rem auto 0;
  background-color: $background-color-level-2;
  border: 0.1rem solid $background-color-level-5;
  box-shadow: 0 5px 5px -3px rgba(255, 255, 255, 0.2),
    0 8px 10px -5px rgba(255, 255, 255, 0.14),
    0 3px 14px -3px rgba(255, 255, 255, 0.12);

  header {
    font-size: 1.3rem;
    height: 3.5rem;
    position: relative;
    padding: 0.2rem .2rem 1.2rem .2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: .1rem solid rgba(#707174, .7);
    img {
      width: 3.5rem;
      height: 3.5rem;
      vertical-align: middle;
      display: inline-block;
    }

    span {
      font-size: 1.6rem;
      display: inline-block;
    }

    .close {
      position: absolute;
      top: 0;
      right: 1.2rem;
    }
  }
}
.login-box {
  .social-account {
    width: 2.5rem;
    height: 2.5rem;
    display: inline-block;
    box-sizing: border-box;
  }

  .git {
    color: #fff;
    margin-right: 1.7rem;
    svg {
      width: 2.5rem;
      height: 2.5rem;
      fill: #fff;
      display: inline-block;
    }
  }
  .icofont-wechat {
    color: #62b900;
    height: 3.5rem;
    width: 3.5rem;
    display: inline-block;
    vertical-align: middle;
  }
  .qq {
    display: none;
    margin-right: 1.7rem;
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDhweCIgaGVpZ2h0PSI0OHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUwLjIgKDU1MDQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5RUTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJRUSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTAsMjQgQzAsMTAuNzQ1MTY1NCAxMC43NDUxNjU0LDAgMjQsMCBDMzcuMjU0ODM0NiwwIDQ4LDEwLjc0NTE2NTQgNDgsMjQgQzQ4LDM3LjI1NDgzNDYgMzcuMjU0ODM0Niw0OCAyNCw0OCBDMTAuNzQ1MTY1NCw0OCAwLDM3LjI1NDgzNDYgMCwyNCBaIiBpZD0iYmFjayIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExLjIwMDAwMCwgOC44MDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMy4zNjgzMiwyOS4wNzM1MiBDMjMuMTgzNTIsMzAuNTM0MzIgMjAuNzk5NTIsMzEuNDMzNTIgMTguMDQ1OTIsMzEuMDgzOTIgQzE1LjI5MzEyLDMwLjczMjcyIDEzLjIxMDcyLDI5LjI2MzkyIDEzLjM5NzkyLDI3LjgwMjMyIEMxMy41ODM1MiwyNi4zNDE1MiAxNS45NjY3MiwyNS40NDE1MiAxOC43MTk1MiwyNS43OTI3MiBDMjEuNDczOTIsMjYuMTQzMTIgMjMuNTUzOTIsMjcuNjEyNzIgMjMuMzY4MzIsMjkuMDczNTIiIGlkPSJGaWxsLTEiIGZpbGw9IiNFNDgwMTMiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLjU4OTc2LDI4LjkzMjQ4IEMyLjgwNjU2LDMwLjM5NzI4IDUuMjgyNTYsMzEuMzM0ODggOC4xMjMzNiwzMS4wMjg0OCBDMTAuOTYzMzYsMzAuNzIwNDggMTMuMDg4OTYsMjkuMjgzNjggMTIuODcyMTYsMjcuODE4MDggQzEyLjY1NjE2LDI2LjM1NDA4IDEwLjE3Njk2LDI1LjQxNTY4IDcuMzM3NzYsMjUuNzIzNjggQzQuNDk3NzYsMjYuMDMwODggMi4zNzA1NiwyNy40Njc2OCAyLjU4OTc2LDI4LjkzMjQ4IiBpZD0iRmlsbC0yIiBmaWxsPSIjRTQ4MDEzIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjMuMTIxODQsOS44ODcyIEMyMy4xMjE4NCwxNS4zNDY0IDE4LjY2MTg0LDE5Ljc3MzYgMTMuMTU3ODQsMTkuNzczNiBDNy42NTcwNCwxOS43NzM2IDMuMTk2MjQsMTUuMzQ2NCAzLjE5NjI0LDkuODg3MiBDMy4xOTYyNCw0LjQyNTYgNy42NTcwNCwtNy4xMDU0MjczNmUtMTUgMTMuMTU3ODQsLTcuMTA1NDI3MzZlLTE1IEMxOC42NjE4NCwtNy4xMDU0MjczNmUtMTUgMjMuMTIxODQsNC40MjU2IDIzLjEyMTg0LDkuODg3MiIgaWQ9IkZpbGwtMyIgZmlsbD0iIzAwMDAwMCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTIuNTAyMzIsMjguNjQxMTIgQzIuNzE5MTIsMzAuMTA1OTIgNS4xOTUxMiwzMS4wNDM1MiA4LjAzNTkyLDMwLjczNzEyIEMxMC44NzU5MiwzMC40MjkxMiAxMy4wMDE1MiwyOC45OTIzMiAxMi43ODQ3MiwyNy41MjY3MiBDMTIuNTY4NzIsMjYuMDYyNzIgMTAuMDg5NTIsMjUuMTI0MzIgNy4yNTAzMiwyNS40MzIzMiBDNC40MTAzMiwyNS43Mzk1MiAyLjI4MzEyLDI3LjE3NjMyIDIuNTAyMzIsMjguNjQxMTIiIGlkPSJGaWxsLTQiIGZpbGw9IiNGNUE1MTkiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMy40ODA4LDI4LjcxOTYgQzIzLjI5NiwzMC4xODA0IDIwLjkxMiwzMS4wNzk2IDE4LjE1ODQsMzAuNzMgQzE1LjQwNTYsMzAuMzc4OCAxMy4zMjMyLDI4LjkxIDEzLjUxMDQsMjcuNDQ4NCBDMTMuNjk2LDI1Ljk4NzYgMTYuMDc5MiwyNS4wODc2IDE4LjgzMiwyNS40Mzg4IEMyMS41ODY0LDI1Ljc4OTIgMjMuNjY2NCwyNy4yNTg4IDIzLjQ4MDgsMjguNzE5NiIgaWQ9IkZpbGwtNSIgZmlsbD0iI0Y1QTUxOSI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTIyLjYyMzc2LDIwLjgzNjQgQzIyLjYyMzc2LDI1LjI1OTYgMTguMzE4OTYsMjguODQ1MiAxMy4wMTA5NiwyOC44NDUyIEM3LjcwMjk2LDI4Ljg0NTIgMy4zOTk3NiwyNS4yNTk2IDMuMzk5NzYsMjAuODM2NCBDMy4zOTk3NiwxNi40MTMyIDcuNzAyOTYsMTIuODI3NiAxMy4wMTA5NiwxMi44Mjc2IEMxOC4zMTg5NiwxMi44Mjc2IDIyLjYyMzc2LDE2LjQxMzIgMjIuNjIzNzYsMjAuODM2NCIgaWQ9IkZpbGwtNiIgZmlsbD0iIzAwMDAwMCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTQuOTcyNjQsMTkuMjQ0OTYgQzMuNTYxNDQsMjIuMDYxNzYgMS4zNDc4NCwyMy44NDQ5NiAwLjY5MDI0LDIzLjQ5NTM2IEMtMC4xNzkzNiwyMy4wMzEzNiAtMC4zODk3NiwyMC4xODU3NiAxLjAyMjI0LDE3LjM2OTc2IEMyLjQzNTg0LDE0LjU1NDU2IDQuNzE0MjQsMTIuNzUwNTYgNS44MDU0NCwxMy4yOTY5NiBDNi44OTQyNCwxMy44NDQ5NiA2LjM4NDY0LDE2LjQyODk2IDQuOTcyNjQsMTkuMjQ0OTYiIGlkPSJGaWxsLTciIGZpbGw9IiMwMDAwMDAiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMS4yMDExMiwxOS41OTk2OCBDMjIuNDkyMzIsMjIuMTU4ODggMjQuMzUyMzIsMjQuMTQ1MjggMjUuMTQ3NTIsMjMuOTcwMDggQzI1Ljc4OTEyLDIzLjgyOTI4IDI2LjI0NzUyLDIwLjgzNjQ4IDI1LjA3MjMyLDE3Ljk3MDA4IEMyMy44Nzc5MiwxNS4wNTU2OCAyMS43MTE1MiwxMi45NjI4OCAyMC42MTk1MiwxMy41MTAwOCBDMTkuNTI5MTIsMTQuMDU3MjggMTkuNzgxOTIsMTYuNzg3NjggMjEuMjAxMTIsMTkuNTk5NjgiIGlkPSJGaWxsLTgiIGZpbGw9IiMwMDAwMDAiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik01Ljk2MDA4LDE1LjgwNTEyIEM1LjM2NjQ4LDE3LjAyMjcyIDUuMDI2NDgsMTguNDA2NzIgNS4wMjY0OCwxOS44NzcxMiBDNS4wMjY0OCwyNC43MzE1MiA4LjY4MzI4LDI4LjY2NjcyIDEzLjE5NDQ4LDI4LjY2NjcyIEMxNy43MDU2OCwyOC42NjY3MiAyMS4zNjE2OCwyNC43MzE1MiAyMS4zNjE2OCwxOS44NzcxMiBDMjEuMzYxNjgsMTguNDQ2NzIgMjEuMDM3NjgsMTcuMTAwMzIgMjAuNDc0NDgsMTUuOTA2NzIgQzE2LjMxNzY4LDE4LjAyNTkyIDguNzA2NDgsMTYuNDczMTIgNS45NjAwOCwxNS44MDUxMiIgaWQ9IkZpbGwtOSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTEyLjQ3MjY0LDcuNjA3NTIgQzEyLjQ3MjY0LDguOTI1OTIgMTEuNTk5ODQsOS45OTQ3MiAxMC41MjIyNCw5Ljk5NDcyIEM5LjQ0NTQ0LDkuOTk0NzIgOC41NzI2NCw4LjkyNTkyIDguNTcyNjQsNy42MDc1MiBDOC41NzI2NCw2LjI4OTEyIDkuNDQ1NDQsNS4yMjAzMiAxMC41MjIyNCw1LjIyMDMyIEMxMS41OTk4NCw1LjIyMDMyIDEyLjQ3MjY0LDYuMjg5MTIgMTIuNDcyNjQsNy42MDc1MiIgaWQ9IkZpbGwtMTAiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOC4wNzIyNCw3LjYyMDggQzE4LjA3MjI0LDguOTM5MiAxNy4xOTk0NCwxMC4wMDggMTYuMTIxODQsMTAuMDA4IEMxNS4wNDU4NCwxMC4wMDggMTQuMTcyMjQsOC45MzkyIDE0LjE3MjI0LDcuNjIwOCBDMTQuMTcyMjQsNi4zMDI0IDE1LjA0NTg0LDUuMjMzNiAxNi4xMjE4NCw1LjIzMzYgQzE3LjE5OTQ0LDUuMjMzNiAxOC4wNzIyNCw2LjMwMjQgMTguMDcyMjQsNy42MjA4IiBpZD0iRmlsbC0xMSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTEzLjQ5ODgsMTAuNjYxMDQgQzEwLjc4MzYsMTAuNjYxMDQgOC40MTI0LDExLjI5NTQ0IDcuMDk2NCwxMi4yNDE4NCBDNy40MjYsMTMuMDE4NjQgOC40MjIsMTMuNjIzNDQgOS4zOTg4LDE0LjE4NTA0IEMxMC41Nzg4LDE0Ljg2MzQ0IDEyLjUxNzIsMTUuMzIyNjQgMTMuNDkyNCwxNS4zMjI2NCBDMTQuMzkyNCwxNS4zMjI2NCAxNi42MjA0LDE0LjcxNjI0IDE3LjgyMzYsMTMuOTI5ODQgQzE4LjY3LDEzLjM3Nzg0IDE5LjU2MjgsMTIuODkwNjQgMTkuODg3NiwxMi4yMzIyNCBDMTguNTY5MiwxMS4yOTE0NCAxNi4yMDUyLDEwLjY2MTA0IDEzLjQ5ODgsMTAuNjYxMDQiIGlkPSJGaWxsLTEyIiBmaWxsPSIjRjVBNTE5Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIuMTcxMDQsNy42MjA4IEMxMi4xNzEwNCw4LjQ1NTIgMTEuNjI0NjQsOS4xMzIgMTAuOTUxODQsOS4xMzIgQzEwLjI3ODI0LDkuMTMyIDkuNzMxODQsOC40NTUyIDkuNzMxODQsNy42MjA4IEM5LjczMTg0LDYuNzg2NCAxMC4yNzgyNCw2LjEwOTYgMTAuOTUxODQsNi4xMDk2IEMxMS42MjQ2NCw2LjEwOTYgMTIuMTcxMDQsNi43ODY0IDEyLjE3MTA0LDcuNjIwOCIgaWQ9IkZpbGwtMTMiIGZpbGw9IiMwMDAwMDAiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS43MTYsNy4yNzcwNCBDMTEuNzE2LDcuNjEzODQgMTEuNDg3Miw3Ljg4NzQ0IDExLjIwNDgsNy44ODc0NCBDMTAuOTIyNCw3Ljg4NzQ0IDEwLjY5MzYsNy42MTM4NCAxMC42OTM2LDcuMjc3MDQgQzEwLjY5MzYsNi45NDEwNCAxMC45MjI0LDYuNjY4MjQgMTEuMjA0OCw2LjY2ODI0IEMxMS40ODcyLDYuNjY4MjQgMTEuNzE2LDYuOTQxMDQgMTEuNzE2LDcuMjc3MDQiIGlkPSJGaWxsLTE0IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTUuMTY3OTIsOC4wMTMzNiBDMTUuMDUzNTIsOC4wMTMzNiAxNC45NTI3Miw3LjkzMDk2IDE0LjkzMTkyLDcuODE0OTYgQzE0LjkxOTEyLDcuNzQyMTYgMTQuOTEyNzIsNy42NjYxNiAxNC45MTI3Miw3LjU4ODU2IEMxNC45MTI3Miw2Ljk1MDE2IDE1LjM2NTUyLDYuNDMwOTYgMTUuOTIxNTIsNi40MzA5NiBDMTYuNDc3NTIsNi40MzA5NiAxNi45MzAzMiw2Ljk1MDE2IDE2LjkzMDMyLDcuNTg4NTYgQzE2LjkzMDMyLDcuNjQ0NTYgMTYuOTI3MTIsNy42OTg5NiAxNi45MjA3Miw3Ljc1MjU2IEMxNi45MDM5Miw3Ljg4Mzc2IDE2Ljc4MjMyLDcuOTc2NTYgMTYuNjUxOTIsNy45NjA1NiBDMTYuNTIwNzIsNy45NDM3NiAxNi40Mjc5Miw3LjgyMzc2IDE2LjQ0MzkyLDcuNjkyNTYgQzE2LjQ0ODcyLDcuNjU4OTYgMTYuNDUxMTIsNy42MjM3NiAxNi40NTExMiw3LjU4ODU2IEMxNi40NTExMiw3LjIxNDk2IDE2LjIxMzUyLDYuOTEwOTYgMTUuOTIxNTIsNi45MTA5NiBDMTUuNjI5NTIsNi45MTA5NiAxNS4zOTE5Miw3LjIxNDk2IDE1LjM5MTkyLDcuNTg4NTYgQzE1LjM5MTkyLDcuNjM3MzYgMTUuMzk2NzIsNy42ODUzNiAxNS40MDQ3Miw3LjczMDk2IEMxNS40Mjc5Miw3Ljg2MjE2IDE1LjM0MDcyLDcuOTg2MTYgMTUuMjEwMzIsOC4wMDkzNiBDMTUuMTk1OTIsOC4wMTE3NiAxNS4xODIzMiw4LjAxMzM2IDE1LjE2NzkyLDguMDEzMzYiIGlkPSJGaWxsLTE1IiBmaWxsPSIjMDAwMDAwIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOC4wNTczNiwxMS44NDczNiBDOC4wNTczNiwxMS44NDczNiA5LjU1NjU2LDEzLjEzMTM2IDEwLjkzNTc2LDEzLjUxNDU2IEMxMi41NDg1NiwxMy45NjI1NiAxNC44Nzg5NiwxMy43NTEzNiAxNS43NjIxNiwxMy40NTUzNiBDMTcuMzY3NzYsMTIuOTE2MTYgMTkuMDc0MTYsMTEuNzU0NTYgMTkuMDc0MTYsMTEuNzU0NTYgQzE5LjA3NDE2LDExLjc1NDU2IDE3LjU2NjE2LDEyLjkwODE2IDE2LjAxMDk2LDEzLjkyNDk2IEMxNS4yMjkzNiwxNC40MzUzNiAxNC4zNzMzNiwxNS4xNjI1NiAxMi41NzE3NiwxNC43NzIxNiBDMTIuMTE0OTYsMTQuNjczNzYgMTEuMjk3MzYsMTQuMTIwMTYgMTEuMDM3MzYsMTMuOTY5NzYgQzkuNzA2MTYsMTMuMTk5MzYgOC4zNjkzNiwxMi4xNTc3NiA4LjA1NzM2LDExLjg0NzM2IiBpZD0iRmlsbC0xNiIgZmlsbD0iIzhBMzMyMiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTkuNzEyMDgsMTguNjkwMzIgTDkuNzEyMDgsMjMuMDM4MzIgQzkuNzEyMDgsMjMuMDM4MzIgNy45MTUyOCwyMy44ODg3MiA2LjMwNTY4LDIyLjM1MjcyIEM1LjY4ODg4LDIxLjc2NDcyIDYuNjM2MDgsMTcuNTc5OTIgNi42MzYwOCwxNy41Nzk5MiBMOS43MTIwOCwxOC42OTAzMiBaIiBpZD0iRmlsbC0xNyIgZmlsbD0iI0Q0MkUxOSI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTYuMzkyNTYsMTcuODQ5NjggTDkuNjg2MTYsMjAuNDg3MjggQzkuNjg2MTYsMjAuNDg3MjggOS43NDEzNiwxOC44Mzg0OCA5LjY3MDE2LDE4LjM2ODg4IEM5LjU5ODE2LDE3LjkwMDA4IDYuMzkyNTYsMTcuNjE2ODggNi4zOTI1NiwxNy42MTY4OCIgaWQ9IkZpbGwtMTgiIGZpbGw9IiNCODJDMjIiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMy40OTg0LDE5LjQzMTY4IEM5LjM1MiwxOS40MzE2OCA1LjQ0MzIsMTcuOTU4MDggMi4zNTY4LDE1LjI1NzI4IEMyLjI4MTYsMTUuMTkxNjggMi4zMDQ4LDE0Ljk4MjA4IDIuMzA0OCwxNC45ODIwOCBDMi4zMDQ4LDE0Ljk4MjA4IDIuNDIzMiwxNC41MjI4OCAyLjYyLDEzLjQyMjg4IEMyLjc1NzYsMTIuNjU0MDggMy4wNjk2LDExLjcxMDg4IDMuMjM1MiwxMS43MTA4OCBDMy4zNDA4LDExLjc5ODA4IDMuNDY4LDExLjkxNDA4IDMuNTkzNiwxMi4wMzE2OCBDMy44MiwxMi4yNDM2OCA0LjAzOTIsMTIuNDYyMDggNC4xMTEyLDEyLjUzMDA4IEM2LjY2NjQsMTQuOTIxMjggOS45NzY4LDE2LjIzMTY4IDEzLjQ5ODQsMTYuMjMxNjggQzE3LjAwMjQsMTYuMjMxNjggMjAuMzI0LDE0LjkyMTI4IDIyLjg3OTIsMTIuNTM1NjggQzIyLjksMTIuNTE2NDggMjMuNDU0NCwxMy4yMzQ4OCAyMy43MDMyLDEzLjk2NTI4IEMyMy45Njk2LDE0Ljc0NzY4IDI0LjIzOTIsMTUuNTk4ODggMjMuOTkzNiwxNS43OTMyOCBDMjEuMDEzNiwxOC4xNTAwOCAxNy4zNDU2LDE5LjQzMTY4IDEzLjQ5ODQsMTkuNDMxNjgiIGlkPSJGaWxsLTE5IiBmaWxsPSIjRDQyRTE5Ij48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
  }
  .weichat {
    vertical-align: top;
  }
}
</style>
