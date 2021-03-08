<!--文章详情-->
<template>
  <div class="margin-top-0 article-main-wrap">
    <div
      class="article-scroll-process-bar"
      :style="{ width: processBarPercent }"
    />
    <!--------------------------------------------标题等信息-------------------------------------------->
    <back-drop
      width="73%"
      top="-3rem"
      height="100%"
      :gallery="article.gallery"
    />
    <header
      class="article-header-wrapper relative-position"
      :class="'post-' + article.gallery_id"
    >
      <div class="mega-header">
        <h1 class="article-title">
          {{ article.title }}
        </h1>
        <div class="detail">
          <avatar
            :src="article.author.avatar"
            :alt="article.author.name"
          />
        </div>
        <div class="detail">
          <p>
            <span>作者</span>
            <span>{{ article.author.name }}</span>
          </p>
          <p>
            <span>创建时间</span>
            <span>{{ article.created_at | dateFormat }}</span>
          </p>
          <p>
            <span>更新时间</span>
            <span>{{ article.updated_at | dateFormat }}</span>
          </p>
          <p>
            <span>阅读</span>
            <span>{{ article.visited }}</span>
          </p>
          <p>
            <span>评论</span>
            <span class="relative-position">
              <a
                href="/"
                class="hover-right-arrow"
                @click.stop.prevent
                @click="scrollToComment"
              >
                {{ commented }}
                <svg
                  class="right-arrow-svg"
                  :data-id="article.identity"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1000 1000"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <glyph
                    glyph-name="swoosh-right"
                    unicode="&#xeac4;"
                  />
                  <defs>
                    <linearGradient
                      id="grad1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style="stop-color:#005bea;stop-opacity:1"
                      />
                      <stop
                        offset="100%"
                        style="stop-color:#00c6fb;stop-opacity:1"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#grad1)"
                    d="M200.2 509.3l2.3000000000000114-17.100000000000023c0.5999999999999943-2.8999999999999773 2.6999999999999886-5.199999999999989 5.199999999999989-5.199999999999989h124.10000000000002l2.099999999999966-16.399999999999977h-98.29999999999998c-1.6999999999999886 0-3.0999999999999943-0.8000000000000114-4.199999999999989-2.3000000000000114-0.8000000000000114-1.1999999999999886-1.200000000000017-3.1000000000000227-1-4.800000000000011l2.9000000000000057-20c0.39999999999997726-3.1000000000000227 2.5-5.199999999999989 5-5.199999999999989h350.99999999999994l-109.79999999999995-109.69999999999999c-8.100000000000023-8.100000000000023-9.300000000000011-22.30000000000001-2.6000000000000227-31.600000000000023l41.60000000000002-57.900000000000006c6.7000000000000455-9.299999999999983 18.799999999999955-10.299999999999983 26.899999999999977-2.1999999999999886l248.39999999999998 248.4c8.100000000000023 8.099999999999966 8.100000000000023 21.30000000000001 0 29.400000000000034l-248.29999999999995 248.5c-8.100000000000023 8.099999999999909-20 7.099999999999909-26.600000000000023-2.400000000000091l-40.89999999999998-58.799999999999955c-6.600000000000023-9.399999999999977-5.300000000000011-23.700000000000045 2.8000000000000114-31.799999999999955l108.40000000000003-108.40000000000009h-331.6c-1.5 0-2.900000000000034-0.7999999999999545-4.000000000000028-2.2999999999999545-1-1.2000000000000455-1.5-3.1000000000000227-1-5l2.3000000000000114-16.200000000000045c0.4000000000000057-2.8999999999999773 2.700000000000017-5.199999999999932 5.200000000000017-5.199999999999932h93.5l2.099999999999966-16.399999999999977h-150.5c-1.5 0-2.8999999999999773-0.8000000000000682-4-2.300000000000068-1-1.3999999999999773-1.5-3.1999999999999886-1-5.099999999999966z"
                  />
                </svg>
              </a>
            </span>
          </p>
        </div>
        <div class="tags">
          <tags
            :tags="article.tags"
            :show-read-more="false"
          />
        </div>
      </div>
    </header>
    <div class="article-container">
      <article class="article-content-wrap relative-position">
        <!--------------------------------------------标题等信息 end-------------------------------------------->
        <!----------------------------------------------文章主体------------------------------------------------>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div
          ref="article"
          class="article-content"
          v-html="$initHTML(article)"
        />
        <div class="article-sidebar absolute-position">
          <nav>
            <ul
              v-if="cateList.length"
              ref="catelist"
              class="cate-list relative-position"
              :style="{ position: fixCateList ? 'fixed' : 'relative' }"
            >
              <li
                v-for="(item, index) in cateList"
                :key="index"
                :class="'list-d-' + (item.dimension - maxDimension + 2)"
              >
                <a :href="'#heading-' + index" @click.prevent="scrollToSubTitle">{{ item.header }}</a>
              </li>
            </ul>
          </nav>
        </div>
        <!--------------------------------------------点赞、举报按钮-------------------------------------------->
        <div
          class="article-sub-btn clear-float"
          @mouseenter="showReportBtn"
          @mouseleave="hidReportBtn"
        >
          <thumbUp
            :id="article.identity"
            :thumbs="article.thumbs"
            :liked="article.liked"
            category="article"
            @thumbUp="thumbUp"
          />
          <a
            v-if="$store.state.user.id"
            href="/"
            class="icofont-warning float-right report-article-btn display-none"
            @click.prevent
            @click="reportIllegalArticle"
          >举报</a>
        </div>
        <!--------------------------------------------评论富文本编辑器部分开始-------------------------------------------->
        <div class="article-comment-box">
          <umeditor
            v-model="editorContent"
            :height="'170px'"
            init-message
            :toolbar="['emotion', 'formula']"
            @receiveUM="setUM"
          />
          <section class="submit-article-comment-btn-wrap color-white">
            <a
              href="/"
              class="submit-btn"
              @click.prevent="submitComments"
            >提 交</a>
          </section>
        </div>
        <div
          v-if="commented"
          id="comments"
          class="comment_num"
        >
          <i class="icofont-speech-comments" /> 评论 {{ commented }}
        </div>
        <div
          v-else
          id="comments"
          class="comment_num"
        >
          <i class="icofont-mathematical" /> 暂无评论
        </div>
        <!--------------------------------------------富文本编辑器结束-------------------------------------------->
        <!--------------------------------------------文章评论列表开始-------------------------------------------->
        <div class="article-comments">
          <commentList
            :p="p"
            :pages="pages"
            :comments="records"
            @getMoreComments="getComments"
            @getMoreReply="getMoreReply"
            @appendReply="appendReply"
            @deleteComment="deleteComment"
          />
        </div>
      <!--------------------------------------------文章评论列表结束-------------------------------------------->
      </article>
    </div>
  </div>
</template>

<script>
import commentList from '~/components/comment-list/comment-list'
import thumbUp from '~/components/common/thumb-up'
import tags from '~/components/index/article-tags'
import commnetMixin from '~/mixins/comment/comment-mixin'
import reportIllegalInfoHandler from '~/mixins/report-illegal-info/report-illegal-info-handler'
import editorMixin from '~/mixins/umeditor'

export default {
  components: {
    commentList,
    thumbUp,
    tags
  },
  mixins: [commnetMixin, reportIllegalInfoHandler, editorMixin],
  data () {
    return {
      article: {
        author: {
          avatar: ''
        },
        identity: '',
        tags: []
      },
      commented: 0,
      UM: undefined,
      p: 0,
      pages: 0,
      records: [],
      processBarPercent: '0%', // 进度条进度
      cateList: [], // 目录信息
      maxDimension: 5,
      fixCateList: false
    }
  },
  head () {
    const article = this.article
    const description = article.content.slice(0, 300).replace(/<[^>]*>/g, '')
    const keywords = article.tags.map(item => item.name).join(',')
    return {
      title: article.title + ' | blog1997',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'keywords',
          property: 'keywords',
          content: keywords
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: article.title + ' | blog1997'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:keywords',
          property: 'og:keywords',
          content: keywords
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.$config.domain + this.$route.path
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user.id
    }
  },
  watch: {
    /**
     * 用户登陆登出，重新刷新页面
     * 刷新和用户相关的状态
     */
    user () {
      // 重新刷新当前页面
      this.$axios.get(this.$route.fullPath)
        .then((response) => {
          Object.assign(this, response.data.data)
        })
    }
  },
  async asyncData ({ app, $responseHandler, redirect, params, req, res }) {
    if (!params.id) {
      return redirect('/404')
    }

    const data = await app.$axios
      .get(`article/${params.id}`, req)
      .then(response => $responseHandler(response, res))
      .catch((e) => {
        if (e.response.status === 404) {
          redirect('/404')
        }
      })

    return data
  },
  mounted () {
    // 如果路由中指定锚点，设置滚动动画
    if (location.hash && location.hash === '#comments') {
      window.setTimeout(() => {
        window.scrollTo(0, 0)
        this.scrollToComment()
      }, 0)
    }
    // 监听页面滚动事件，处理进度条
    document.addEventListener('scroll', this.scrollHandler)
    // 获取评论
    this.getComments()
    this.genereateCateList()
    this.$nextTick(this.$initializeHTML)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    /**
     * 评论文章
     */
    submitComments () {
      // 如果用户没有登录，先让用户登录
      if (!this.$store.state.user.id) {
        this.$store.commit('globalState/setShowLogin', {
          msg: '',
          status: false
        })
        return
      }

      if (this.editorContent.trim() === '') {
        this.$store.commit('globalState/setPromptMessage', {
          msg: '评论内容不能为空',
          status: false
        })
        return
      }

      const postData = {
        content: this.editorContent,
        able_id: this.article.identity,
        able_type: 'article'
      }

      this.$axios
        .post('/comment', postData)
        .then((response) => {
          // 评论成功
          // 清空评论窗口的内容
          this.setEditorContent('')
          // 追加评论到第一条
          this.commented += 1
          const data = response.data.data
          data.avatar = this.$store.state.user.avatar
          data.name = this.$store.state.user.name
          this.records.unshift(data)
          this.setEditorContent('')
        })
    },
    /**
     * 设置 UM
     * @param um
     */
    setUM (um) {
      this.UM = um
    },
    /**
     * 追加评论
     * @param obj
     */
    appendComments ({ p, pages, records }) {
      if (Array.isArray(records)) {
        this.records = this.records.concat(records)
      }
      this.p = p
      this.pages = pages
    },
    /**
     * 获取更多的评论
     * @param  {string} type
     */
    getComments (type = 'article') {
      // 开始请求
      this.$axios
        .post(`/article/comments/${this.article.identity}?p=${this.p + 1}`)
        .then(response => response.data.data)
        .then((comments) => {
          this.appendComments(comments)
        })
    },
    /**
     * 修改用户的点赞状态
     * @param state Boolean
     */
    thumbUp () {
      if (!this.article.thumbs) {
        this.article.thumbs = true
      }

      ++this.article.liked
    },
    /**
     * 处理文章滚动的进度条
     * 更改目录的position
     */
    scrollHandler () {
      // 获取窗口总高度
      const offsetHeight = document.documentElement.offsetHeight
      // 获取可视部分的高度
      const clientHeight = document.documentElement.clientHeight
      // 获取滚动的距离
      const scrollTop = document.documentElement.scrollTop

      if (scrollTop === 0) {
        this.processBarPercent = '0%'
        return
      }
      // 计算滚动进度的百分比
      this.processBarPercent =
        (scrollTop / (offsetHeight - clientHeight)) * 100 + '%'

      const articleEl = this.$refs.article
      const offsetTop = articleEl.offsetTop + articleEl.parentElement.offsetTop
      // 更改目录的position
      if ((offsetTop + 100) < scrollTop && scrollTop < (offsetTop + articleEl.offsetHeight)) {
        this.setFixCatelist(true)
      } else {
        this.setFixCatelist(false)
      }
    },
    /**
     * 设置文章目录 位置是否固定
     *
     * @param {boolean} state
     */
    setFixCatelist (state) {
      if (this.fixCateList !== state) {
        this.fixCateList = state
      }
    },
    /**
     * 滚动到评论部分
     */
    scrollToComment () {
      if (this.$el.nodeType !== 8) {
        const commentsEl = this.$el.querySelector('#comments')
        if (commentsEl) {
          commentsEl.scrollIntoView({ behavior: 'smooth' })
        }
      }
    },
    /**
     * 举报文章
     */
    reportIllegalArticle () {
      this.$store.commit('reportIllegalInfo/reportArticle', {
        preDefinedContent: window.location.href,
        reportedId: this.$route.params.id
      })
    },
    /**
     * 生成目录
     *
     * @return {void}
     */
    genereateCateList () {
      const list = this.$el.querySelector('.article-content').querySelectorAll('h1, h2, h3, h4, h5')
      const cateList = []
      let [maxDimension, dimension] = [5, '']

      if (!list.length) {
        return
      }

      for (let i = 0, len = list.length; i < len; i++) {
        dimension = parseInt(list[i].tagName.replace('H', ''))
        cateList.push({
          dimension,
          header: list[i].innerHTML
        })
        if (maxDimension < dimension) {
          maxDimension = dimension
        }
        list[i].id = `heading-${i}`
      }

      this.cateList = cateList
      if (this.maxDimension !== dimension) {
        this.maxDimension = dimension
      }
    },
    /**
     * 滚动到h标签
     *
     * @param {Event} e
     */
    scrollToSubTitle (e) {
      const href = e.target.href.replace(/.*#/i, '')
      const el = document.getElementById(href)
      el.scrollIntoView({ block: 'center' })
    }
  }
}
</script>

<style lang="scss">
@media screen and (min-width: 0) {
  .article-sidebar{
    width: 23rem;
    display: none;
  }
  .article-content-wrap{
    padding-right: 0;
    overflow-x: hidden;
  }
  .article-comment-box, .comment_num{
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .article-header-wrapper{
    padding: 2rem 0rem 5rem 0;
  }
}
@media screen and (min-width: $media-min-width) {
  .article-sidebar{
    width: 23rem;
    display: block;
  }
  .article-content-wrap{
    padding-right: 23rem;
  }
  .article-comment-box, .comment_num{
    padding-left: 0;
    padding-right: 0;
  }
  .article-header-wrapper{
    padding: 2rem 10rem 10rem 10rem;
  }
}

.article-header-wrapper {
  margin-bottom: 3rem;
  box-sizing: border-box;
  //--------------------------------------------- 文章作者信息样式
  .mega-header {
    max-width: 110rem;
    margin: 0 auto;
    // 作者 创建时间 阅读数量等数据的样式
    .detail {
      display: inline-block;
      height: 6rem;
      text-align: left;
      vertical-align: middle;
      margin-right: 1.2rem;
      margin-top: 1rem;
      p {
        display: inline-block;
      }
      span {
        display: block;
        &:first-child {
          color: #666;
        }
        .right-arrow-svg {
          left: 1.7rem;
        }
      }
      .hover-right-arrow {
        &:hover {
          color: #1e90ff;
          .right-arrow-svg {
            left: 2.3rem;
          }
        }
      }
    }

    span {
      font-size: 1.6rem;
      margin-right: 1.7rem;
      vertical-align: middle;
    }
    // ----------------------用户头像
    img {
      width: 6rem;
      height: 6rem;
      border-radius: 100%;
      display: inline-block;
    }

    .tags {
      display: block;
      margin-top: 9rem;
    }
  }

  .article-title {
    margin-top: 5.4rem;
    margin-bottom: 6rem;
    font-size: 6rem;
    text-align: left;
    letter-spacing: 0.5rem;
    @extend %text-gradient-blue;
  }
}
.margin-top-0 {
  margin-top: 0;
}
.article-container{
  width: 100%;
  background-color: #fff;
}
// -----------------------------------------文章内容容器
.article-content-wrap {
  color: #333;
  box-sizing: border-box;
  padding-top: 3rem;
  max-width: 110rem;
  margin-right: auto;
  margin-left: auto;
  .article-content {
    width: 100%;
    max-width: 110rem;
    overflow-y: auto;
    text-align: left;
    font-size: 1.6rem;
    line-height: 3rem;
    padding: 2rem 3rem;
    border-radius: 0.3rem;
    margin: 0 auto;
    box-sizing: border-box;
    flex: 1;
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.02),
      0 8px 10px 1px rgba(0, 0, 0, 0.04), 0 3px 14px 2px rgba(0, 0, 0, 0.02);
    pre {
      background-color: #f8f8f8;
      @extend %scroll-bar-base;
      &::-webkit-scrollbar {
        width: 100%;
        height: .3rem;
      }
      &::-webkit-scrollbar-thumb {
        @include compatible-style('', ('background-image': linear-gradient(to bottom right, #29bdd9, #276ace)) );
        &:hover {
          @include compatible-style('', ('background-image': linear-gradient(to bottom right, #276ace, #29bdd9)) );
        }
      }
    }
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.9rem;
    }
    h3 {
      font-size: 1.8rem;
    }
    h4 {
      font-size: 1.7rem;
    }
    h1, h2, h3, h4, h5 {
      padding: 3rem 0;
      box-sizing: border-box;
    }
    p{
      margin: 2rem 0;
    }
  }
  // ------------------------------------ 文章目录样式
  .cate-list {
    flex: 1;
    margin-left: 2rem;
    box-sizing: border-box;
    max-width: 65rem;
    list-style: none;
    top: 12rem;
    transform: top .3s;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      height: 100%;
      border-left: 0.1rem solid #ebedef;
    }
    li {
      padding: 0.7rem;
      &:hover {
        background-color: #ebedef;
      }
      &::before{
        content: '';
        background-color: #666;
        $dimension: .5rem;
        width: $dimension;
        height: $dimension;
        border-radius: $dimension;
        position: absolute;
        display: inline-block;
        left: -.2rem;
        z-index: 2;
      }
    }
  }
  .list-d-1 {
    font-weight: 1.8rem;
    font-weight: bold;
  }
  .list-d-2, .list-d-3, .list-d-4, .list-d-5{
    font-weight: 1.6rem;
  }
  .list-d-2{
    padding-left: 2em !important;
  }
  .list-d-3{
    padding-left: 3em !important;
  }
  .list-d-4{
    padding-left: 4em !important;
  }
  .list-d-5{
    padding-left: 5em !important;
  }
}
.article-sidebar{
  right: 0;
  top: 0
}
// -----------------------------------------文章不存在样式
.not_fond_article {
  margin-top: 4.5rem;
  margin-bottom: 4.5rem;
  text-align: center;
  font-size: 1.8rem;
  color: #787878;
}
// -----------------------------------------提交文章评论按钮
.submit-article-comment-btn-wrap {
  margin-top: 1.2rem;
  text-align: right;
}
.article-comment-box,
.comment_num {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: content-box;
}
// ---------------------------------------------评论数量的样式
.comment_num {
  font-size: 1.4rem;
  color: #666;
  max-width: 110rem;
  padding-bottom: 3rem;
  i {
    font-size: 2.5rem;
    color: #999;
  }
}
// ---------------------------------------------文章评论框样式
.article-comment-box {
  height: fit-content;
  max-width: 110rem;
  margin-top: 2.5rem;
  padding-top: 1.2rem;
  margin-bottom: 5.5rem;
  box-sizing: border-box;
  color: #233;
  .edui-container {
    z-index: 1 !important;
    margin-bottom: 3em;
  }
  .edui-container,
  .edui-toolbar {
    border-radius: 0.7rem;
    border-radius: 1rem;
  }
  .edui-editor-body {
    border-radius: 0.7rem;
  }
  .edui-icon {
    font-size: 1.6rem;
  }
}
// ============================================= 顶部的进度条
.article-scroll-process-bar {
  height: 0.5rem;
  position: fixed;
  top: $nav-height;
  left: 0;
  z-index: 99;
  @include compatible-style(
    '',
    (
      'background-image': linear-gradient(to right, #8debff, #6cacff),
    )
  );
  background-size: cover;
  animation-duration: 2000ms;
  border-radius: 0.3rem;
}
// -------------------------------------------- 点赞 -举报文章的容器
.article-sub-btn {
  height: 5.5rem;
  line-height: 5.5rem;
  max-width: 110rem;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  box-sizing: content-box;
  .icofont-warning {
    margin-top: 2rem;
  }
}
.report-article-btn {
  font-size: 1.6rem;
  margin-top: 0.5rem;
  color: #7f828b !important;
}
.article-main-wrap {
  max-width: 100%;
}
</style>
