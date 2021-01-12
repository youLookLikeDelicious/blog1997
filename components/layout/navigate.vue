<template>
  <header id="navigate" class="navigate">
    <!--    右边部分-->
    <div class="nav-icon">
      <a href="/" @click.stop.prevent @click="toggleNavigate"><i class="icofont-navigation-menu" /></a>
    </div>
    <div class="logo">
      BLog1997网络日志
    </div>
    <!--    左边部分-->
    <div ref="headerItem" data-display="flex" class="header-item">
      <div class="menu">
        <ul>
          <li :class="{'on': routeName == 'index'}">
            <a href="/" @click.stop.prevent @click="clickLink('/')">
              <!-- <i class="icofont-home" />首页 -->
              首页
            </a>
          </li>
          <li :class="{'on': routeName == 'tag-id'}">
            <a href="/tag" @click.stop.prevent @click="clickLink('/tag')">
              <!-- <i class="icofont-memorial" />专题 -->
              分类
            </a>
          </li>
          <li :class="{'on': routeName == 'leave-message'}">
            <a href="/leave-message" @click.stop.prevent @click="clickLink('/leave-message')">
              <!-- <i class="icofont-comment" />留言 -->
              讨论区
            </a>
          </li>
          <!-- <i class="icofont-bird" /> 关于我-->
          <!-- <li :class="{'on': routeName == 'about-me'}">
            <a href="/about-me" @click.stop.prevent @click="clickLink('/about-me')">
              关于我
            </a>
          </li> -->
        </ul>
      </div>
      <!-- -------------------------------------- 搜索框 ------------------------------------>
      <div class="search">
        <a href="/" class="icofont-search-2" @click.stop.prevent="search" />
        <input v-model="keyword" type="text" placeholder="e.g vue" @keyup.13="search">
      </div>
      <div class="user-info">
        <a v-if="!user.id" href="javascript:void(0)" @click="login($event)">登录</a>
        <div v-else>
          <avatar :src="user.avatar" />
          <span>{{ user.name }}</span>
          <a href="/" class="icofont-logout" @click.prevent="logout" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navigate',
  inject: ['reload'],
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    },
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    routeName () {
      if (this.routeName !== 'search') {
        this.keyword = ''
      }
    }
  },
  mounted () {
    if (this.$store.state.search.keyword) {
      this.keyword = this.$store.state.search.keyword
    }
  },
  methods: {
    login (e) {
      this.$preventEvent(e)
      // 如果是手机适配中点击登陆，隐藏下拉菜单
      if (this.isMobileModel) {
        this.$refs.headerItem.style.display = 'none'
      }
      this.$store.commit('globalState/setShowLogin', true)
    },
    logout () {
      this.$axios.post('oauth/logout')
        .then((response) => {
          // 清空store中的用户信息
          this.$store.commit('user/clearUserInfo')
        }).catch(() => {

        })
    },
    search () {
      // 搜索内容
      if (this.keyword) {
        // 如果当前路由不是查询路由
        const searchFullPath = `/search?keyword=${this.keyword}`
        if (this.$route.fullPath === searchFullPath) {
          return
        }
        this.$router.push(searchFullPath)
        if (this.$route.name === 'search') {
          this.reload()
        }
      }
    },
    /**
     * @param e
     */
    toggleNavigate () {
      this.$animate(this.$refs.headerItem, { ani: 'slideToggle', duration: 256 })
    },
    /**
     * 点击导航栏事件
     */
    clickLink (to) {
      this.$router.push(to)
      // 如果屏幕像素小于1200 并且.hreader-item的元素高度不等于 0 ，将菜单栏向上滑动
      if (this.isMobileModel()) {
        this.toggleNavigate()
      }
    },
    /**
     * 判断样式是否是 手机适配的样式
     */
    isMobileModel () {
      return parseInt(getComputedStyle(this.$el).height) < parseInt(getComputedStyle(this.$refs.headerItem).height)
    }
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 0) {
    .navigate{
      flex-wrap: wrap;
    }
  }
  @media screen and (min-width: $media-min-width) {
    .navigate{
      flex-wrap: nowrap;
    }
  }
  .navigate {
    width: 100%;
    height: $nav-height;
    font-size: 1.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    word-break: keep-all;
    color: white;
    // @include compatible-style('', ('background-image': linear-gradient(to right bottom,  #276ace, #29bdd9 )) );
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#17141d, endColorstr=#303036);
    @include compatible-style('', ('background-image': linear-gradient(to right bottom,  $banner-color-1, $banner-color-2 )) );
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    div{
      display: flex;
      align-items: center;
    }
    // ----------------------------------------------------------------------小窗口样式
    @media screen and (min-width: 0) {
      .nav-icon{
        display: block;
        padding-left: 1rem;
        font-size: 2.3rem;
        line-height: $nav-height;
        a{
          transition-duration: .3s;
          &:hover{
            color: #eaeaea;
          }
        }
      }
      .logo{
        display: block;
        flex: 1 1 auto;
        text-align: center;
        line-height: $nav-height;
      }
      .header-item{
        flex: 1 1 100%;
        position: relative;
        background-color: $background-color-level-4;
        flex-direction: column;
        display: none;
        overflow: hidden;
      }
      .menu{
        width: 100%;
        ul{
          width: 100%;
          padding-left: 1rem;
          padding-right: 1rem;
          display: flex;
          flex-direction: column;
          list-style-type: none;
          li{
            width: 100%;
            margin-top: .7rem;
            padding-bottom: .3rem;
            border-bottom: .1rem solid $btn-color-2;
            a{
              font-size: 1.6rem;
            }
          }
        }
      }
      .search{
        order: -2;
        width: 100%;
        position: relative;
        padding: 1rem;
        input{
          width: 100%;
          padding: .2rem;
          height: 2.5rem;
          border-radius: .3rem;
          outline: transparent;
          box-sizing: border-box;
          border: .1rem solid #F7F7F7;
        }
        a{
          font-size: 1.5rem;
          color: #777;
          position: absolute;
          top: 1.7rem;
          right: 1.7rem;
        }
      }
      .user-info{
        width: 100%;
        height: 4rem;
        text-align: left;
        padding-left: 1rem;
        img{
          $size: 3rem;
          width: $size;
          height: $size;
          border-radius: $size;
          margin-right: 1rem;
        }
        span{
          margin-right: 1rem;
        }
      }
    }
    // ----------------------------------------------------------------------大窗口样式
    @media only screen and (min-width: $media-min-width) {
      .nav-icon{
        display: none;
      }
      .header-item{
        margin-top: 0;
        flex-grow: 1;
        display: flex !important;
        flex-wrap: nowrap;
        flex-direction: row;
        background-color: transparent;
        justify-content: space-between;
        height: $nav-height !important;
      }
      .menu{
        flex-basis: 70%;
        ul {
          list-style: none;
          display: flex;
          flex-basis: 100%;
          font-size: 1.6rem;
          flex-direction: row;
        }
        ul li{
          height: $nav-height;
          transition-duration: 0.3s;
          flex-basis: 12rem;
          display: flex;
          flex: 1;
          position: relative;
          align-items: center;
          padding: 0;
          margin: 0;
          border-bottom: 0;
          justify-content: center;
          &:hover{
            filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#17141d, endColorstr=#c6c6c6);
            @include compatible-style('', ('background-image': linear-gradient(to bottom,  $btn-color-1, $btn-color-2 )) )
          }
          i{
            font-size: 2.3rem;
            display: block;
          }
          a{
            width: 100%;
            height: $nav-height;
            line-height: $nav-height;
            display: block;
            font-size: 1.6rem;
            text-align: center;
          }
        }
        .on{
          filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#17141d, endColorstr=#c6c6c6);
          @include compatible-style('', ('background-image': linear-gradient(to bottom,  $btn-color-1, $btn-color-2 )) );
        }
      }
      .logo{
        display: block;
        text-align: center;
        flex: .2 1 auto;
        box-sizing: border-box;
        font-size: 1.7rem;
        padding-left: 1rem;
        padding-right: 1rem;
        line-height: $nav-height;
      }
      .search{
        $right: 3.2rem;
        max-width: 25rem;
        height: 100%;
        position: relative;
        padding-right: 1.2rem;
        order: 0;
        a{
          position: absolute;
          top: 2.3rem;
          right: $right;
          color: #47494E;
          transition-duration: .2s;
        }
        input{
          width: 100%;
          border-radius: .3rem;
          outline: transparent;
          border: 0;
          height: 2rem;
          padding: .3rem $right .3rem .5rem;
          margin-right: 1.2rem;
          @include compatible-style("input-placeholder", ("color": #a4a7a9, "letter-spacing": .2rem), "&::");
        }
        &:hover{
          i{
            color: #47934E;
          }
        }
      }
      .user-info{
        width: auto;
        flex-basis: auto;
        margin-right: 1.2rem;
        $size: 4.2rem;
        img{
          height: $size;
          width: $size;
          border-radius: $size;
          margin-right: 1.2rem;
        }
        div{
          a{
            margin-left: .9rem;
          }
        }
      }
    }
  }
</style>
