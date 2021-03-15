<!--
<friendLik />
-->
<template>
  <footer class="footer">
    <div>
      <p v-if="friendLinkList.length" class="friend-link">
        友情连接：<span v-for="(friendLink, index) in friendLinkList" :key="index"><a :href="friendLink.url" target="_blank">{{ friendLink.name }}</a></span>
      </p>
      <p>所有文章、个人博客模板未经授权禁止转载、摘编、复制或建立镜像.</p>
      <p><span>&copy; 2019-{{ (new Date()).getFullYear() }}</span><span><a :href="'mailto:' + $config.masterEmail" target="_blank">联系方式</a></span><span><a href="http://beian.miit.gov.cn/" target="_blank">{{ beian }}</a></span>All right reserved</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Foot',
  data () {
    return {
      beian: process.env.BEIAN
    }
  },
  computed: {
    friendLinkList () {
      return this.$store.state.globalState.friendLinkList
    }
  }
}
</script>

<style lang="scss">
  .footer{
    width: 100%;
    color: #fff;
    display: flex;
    padding: 3rem 0;
    // margin-top: 23rem;
    font-size: 1.3rem;
    height: fit-content;
    // background-image: linear-gradient(to right bottom, #29bdd9, #276ace);
    background-color: $background-color-level-2;
    z-index: 999;
    span{
      padding: .3rem 1rem;
      &:first-child{
        padding-left: 0;
      }
    }
    p{
      padding: .3rem 0 .3rem 1rem;
    }
    div{
      margin: 0 auto;
      text-align: left;
      width: fit-content;
    }
  }
</style>
