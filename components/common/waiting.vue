<template>
  <div v-if="show" class="spinner">
    <div class="dot1" />
    <div class="dot2" />
  </div>
</template>

<script>
export default {
  name: 'Waiting',
  computed: {
    show () {
      return this.$store.state.globalState.waitting
    }
  }
}
</script>

<style lang="scss">
.spinner {
    margin: 2rem auto;
    width: 4rem;
    height: 4rem;
    position: fixed;
    text-align: center;
    top: 3.2rem;
    left: 47%;
    -webkit-animation: sk-rotate 2.0s infinite linear;
    animation: sk-rotate 2.0s infinite linear;
    z-index: 9999;
}

.dot1, .dot2 {
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #99CCFF;
    border-radius: 100%;

    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
    animation: sk-bounce 2.0s infinite ease-in-out;
}

.dot2 {
    top: auto;
    bottom: 0;
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

@-webkit-keyframes sk-rotate {
    100% {
        -webkit-transform: rotate(360deg)
    }
}

@keyframes sk-rotate {
    100% {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg)
    }
}

@-webkit-keyframes sk-bounce {
    0%, 100% {
        -webkit-transform: scale(0.0)
    }
    50% {
        -webkit-transform: scale(1.0)
    }
}

@keyframes sk-bounce {
    0%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
    }
    50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
    }
}
</style>
