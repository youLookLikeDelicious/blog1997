//<rail :articleNum="Number" :messageNum="Number" :popArticles="[{id: '', title: ''}]" />
<template>
  <div :class="fixRail ? 'rail fix-rail' : 'rail'">
    <div class="index-about-me">
      <h2 class="bold-text">
        关于我
      </h2>
      <img src="/nuxt-image/about-me/bear.jpg" alt="">
      <ul>
        <li>文章: {{ articleNum }}篇</li>
        <li>留言: {{ messageNum }}</li>
        <li><a target="_blank" href="https://github.com/youLookLikeDelicious">Github</a></li>
      </ul>
    </div>
    <ul v-if="popArticles.length" class="popular-article">
      <li class="bold-text">
        点击排行
      </li>
      <li v-for="(article, index) in popArticles" :key="index">
        <span class="icofont-fire-burn fire-gradient" />
        <nuxt-link :to="'/article/' + article.identity">
          {{ article.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Rail',
  props: {
    articleNum: {
      type: Number,
      default () {
        return 0
      }
    },
    messageNum: {
      type: Number,
      default () {
        return 0
      }
    },
    popArticles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      maxScrollTop: 550,
      fixRail: false
    }
  }
  /* mounted () {
    window.addEventListener('scroll', this.scrollWindow)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollWindow)
  },
  methods: {
    scrollWindow () {
      // 获取滚动的高度
      const scrollTop = document.documentElement.scrollTop

      // 如果滚动的距离超过指定的距离 改组件的position改为 fixed
      if (scrollTop > this.maxScrollTop && !this.fixRail) {
        this.fixRail = true
      } else if (scrollTop < this.maxScrollTop && this.fixRail) {
        this.fixRail = false
      }
    }
  } */
}
</script>

<style lang="scss">
    .rail{
        padding-top: 2.7rem;
        width: 17rem;
        height: fit-content;
        overflow: hidden;
        left: calc(60% + 12rem);
        ul{
            list-style: none;
            display: block;
            font-size: 1.4rem;
            &:not(:first-child){
                margin-top: 2.4rem;
            }
            &:first-child{
                margin-top: 1.2rem;
            }
            li{
                padding: .3rem .2rem;
                box-sizing: border-box;
            }
        }
        .index-about-me{
            h2{
                margin-bottom: 1.2rem;
            }
            img{
                width: 9.3rem;
                height: 7rem;
                border-radius: 15%;
                margin-bottom: .7rem;
            }
            ul{
                margin-top: .7rem;
                li{
                    padding: .5rem .1rem;
                    line-height: 100%;
                    box-sizing: border-box;
                    &:before{
                        content: '▶';
                        margin-right: .6rem;
                    }
                }
            }
        }
        .bold-text{
          font-size: 1.6rem !important;
          font-weight: bolder;
        }
        .popular-article{
          li{
            margin-top: 1.2rem;
            font-size: 1.4rem;
          }
          a{
            &:hover{
              text-decoration: underline;
            }
          }
        }
        .fire-gradient{
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          @include compatible-style('', ('background-image': linear-gradient(to bottom, #00c6fb, #005bea )) );
          font-size: 2.3rem;
        }
    }
    @media screen and (min-width: 0) {
      .fix-rail{
        top: 12rem;
      }
      .rail{
        border: .1rem solid $background-color-level-5;
        width: 97%;
        border-radius: .5rem;
        margin-left: auto;
        margin-right: auto;
        padding: 1rem;
        box-sizing: border-box;
        margin-bottom: 3rem;
      }
    }
    @media screen and (min-width: $media-min-width) {
      .fix-rail{
        top: 15rem !important;
      }
      .rail{
        border: 0;
        float: right;
        width: 23%;
        margin-left: 0;
        background-color: transparent;
      }
    }
</style>
