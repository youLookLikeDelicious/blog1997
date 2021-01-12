<template>
  <div class="about-me">
    <div class="about-me-info">
      <article>
        <h2>关于我</h2>
        <p>90后，IT男，魔羯座</p>
        <p class="p-margin-bottom">
          喜欢编程, 音乐,摄影和动漫。
        </p>
        <h2>博客定位</h2>
        <p>本站作为博主的网络日志，记录学习生活的点滴。构建一个和大家交流的平台，和大家共同进步。</p>
      </article>
      <article>
        <h2>联系方式</h2>
        <p class="wrap-mail-info"><i class="icofont-email vertical-align-middle" /> <span>cdk.1997@outlook.com</span></p>
        <p class="p-margin-bottom">
          <a target="_blank" class="display-inline-block" href="https://github.com/youLookLikeDelicious">
            <svg
              class="vertical-align-middle"
              height="32"
              viewBox="0 0 16 16"
              version="1.1"
              fill="#fff"
              width="32"
              aria-hidden="true"
            ><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg><span>youLookLikeDelicious</span></a>
        </p>
        <h2>程序</h2>
        <p>前端Vue，使用Nuxt作为ssr的解决方案 、后端Laravel</p>
      </article>
      <!--<svg
        class="svg-cirle-text"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="300px"
        height="300px"
        viewBox="0 0 300 300"
        enable-background="new 0 0 300 300"
        xml:space="preserve"
      >
        <defs>
          <path
            id="criclePath"
            d=" M 45, 150
                                              A 50 50 0 0 1 220 150
                                              A 50 50 0 0 1 45 150"
          />
        </defs>
        <g>
          <text class="circile-text">
            <textPath xlink:href="#criclePath">靡不有初，鲜克有终。</textPath>
          </text>
        </g>
      </svg>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutMe',
  head () {
    return {
      title: process.env.title + ' | About me'
    }
  }
}
</script>

<style lang="scss">
.about-me{
  margin-top: 0;
  padding: 5rem 10rem;
  border-bottom-left-radius: .7rem;
  border-bottom-right-radius: .7rem;
  img{
    width: 6.5rem;
    height: 6.5rem;
    border-radius: 50%;
  }
  article{
    &:not(:first-child){
        margin-top: 1.2rem;
    }
    h2{
        font-size: 1.5rem;
        margin-top: .7rem;
        margin-bottom: 2rem;
        background-color: $background-color-level-2;
        border-left: .3rem solid $background-color-level-3;
        padding: 1rem .9rem;
        font-weight: 600;
        overflow: hidden;
        box-sizing: border-box;
    }
    p{
        text-indent: 2em;
        font-size: 1.4rem;
        &:not(:first-child){
            margin-top: .5rem;
        }
    }
  }
  .svg-cirle-text{
    position: absolute;
    left: -15.5rem;
    top: -7rem;
    z-index: -1;
    .circile-text{
        font-size: 1.6rem;
        fill: #20a4e9;
        letter-spacing: .3rem;
    }
  }
  .about-me-info{
    position: relative;
    margin-bottom: 2.4rem;
  }
  .p-margin-bottom {
    margin-bottom: 2rem;
    a{
      text-indent: 0;
      height: 5rem;
      line-height: 5rem;
    }
  }
  .icofont-email{
    font-size: 3rem;
  }
  .wrap-mail-info{
    height: 5rem;
    line-height: 5rem;
  }
  .wrap-mail-info i, .p-margin-bottom svg {
    margin-right: 1.7rem;
  }
}
</style>
