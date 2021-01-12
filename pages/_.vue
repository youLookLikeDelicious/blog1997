<template>
  <!-- 路由未找到的页面 -->
  <div>
    <div class="not-fond">
      404 | not fond
    </div>
    <div class="not-fond-message">
      <p><a href="/">www.blog1997.com</a></p>
      <p>nuxt 1.0.0 / node:alpine / server side render</p>
    </div>
    <div class="not-fond-navigate">
      <a href="/">首页</a>
      <a href="/tag">标签</a>
      <a href="/leave-message">留言</a>
      <a href="/about-me">关于我</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFondComponent',
  layout: 'not-fond'
}
</script>

<style lang="scss">
.not-fond{
    width: 14rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 12rem;
    text-align: center;
    font-size: 1.8rem;
    color: #666;
    font-weight: 600;
    padding-bottom: .7rem;
    border-bottom: .2rem solid #666;
}
.not-fond-message{
    font-size: 1.3rem;
    margin-top: 2rem;
    color: #666;
    text-align: center;
}
.not-fond-navigate{
    color: #666;
    margin-top: 10rem;
    text-align: center;
    font-size: 2rem;
    font-weight: 800;
    a{
        margin-right: 2rem;
        &:last-child{
            margin-right: 0;
        }
    }
}
</style>
