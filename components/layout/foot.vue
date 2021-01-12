<!--
<friendLik />
-->
<template>
  <footer class="footer">
    <div>
      <p>本站内容为站长在学习过程中的个人总结，未经许可禁止转载。</p>
      <p v-if="friendLinkList.length" class="friend-link">
        友情连接：<span v-for="(friendLink, index) in friendLinkList" :key="index"><a :href="friendLink.url" target="_blank">{{ friendLink.name }}</a></span>
      </p>
      <p><span>&copy; 2019</span><span><a href="/">联系方式</a></span><span><a href="http://beian.miit.gov.cn/" target="_blank">鲁ICP备19056935号</a></span>All right reserved</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Foot',
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
    padding: 1rem 0;
    // margin-top: 23rem;
    font-size: 1.3rem;
    height: fit-content;
    // background-image: linear-gradient(to right bottom, #29bdd9, #276ace);
    @include compatible-style('', ('background-image': linear-gradient(to bottom,  $banner-color-2, $banner-color-1 )) );
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
