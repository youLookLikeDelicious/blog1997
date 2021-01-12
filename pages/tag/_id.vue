<template>
  <div class="tags hid-overflow">
    <div class="tag-article-list-wrap">
      <div class="tag-detail font-size-14rem color-777">
        <span class="current-tag">{{ currentTag.name }}</span> <span>该标签共收录 {{ articleNum }} 篇文章</span>
      </div>
      <articleList
        v-if="articles.length"
        :articles="articles"
        :p="p"
        :in-progress="inProgress"
        :pages="pages"
        @getMoreArticle="getMoreArticle"
      />
    </div>
    <div class="tag-list">
      <div class="icofont-archive">
        标签
      </div>
      <ul v-if="tags.length">
        <li v-for="tag in tags" :key="tag.id">
          <nuxt-link :to="'/tag/' + tag.id">
            {{ tag.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ArticleList from '~/components/common/article-list'
import articleListMixin from '~/mixins/article/article-list-mixin'

export default {
  name: 'Tag',
  components: {
    ArticleList
  },
  mixins: [articleListMixin],
  data () {
    return {
      articleNum: 0, // 专题下文章的数量
      tags: [],
      articles: [],
      currentTagId: '',
      getMoreUrl: 'article'
    }
  },
  computed: {
    getMoreCondition () {
      if (!this.currentTagId) {
        return ''
      }
      return `tagId=${this.currentTag.id}`
    },
    currentTag () {
      if (!this.currentTagId) {
        return { name: '' }
      }
      const findHandler = item => item.id === this.currentTagId
      return this.tags.find(findHandler)
    }
  },
  head () {
    return {
      title: process.env.title + ' | Tag'
    }
  },
  async asyncData ({ app, $responseHandler, params, req, res }) {
    const url = params.id ? `/article/tags?tag_id=${params.id}` : '/article/tags'
    // 获取请求的头部
    const data = await app.$axios.get(url, req)
      .then(response => $responseHandler(response, res))
      .then((response) => {
        return response
      })
      .catch(() => {
        return {}
      })

    return data
  }
}
</script>

<style lang="scss">
.tags{
  font-size: 1rem;
  .current-tag{
    color: #fff;
    font-size: 2rem;
    font-weight: bolder;
    padding: 0 .7rem;
    @extend %text-gradient-blue;
  }
  .tag-list{
    padding-left: .7rem;
    padding-top: 1.2rem;
    box-sizing: border-box;
    float: right;
    height: 100%;
      .icofont-archive{
        padding-left: .2rem;
        letter-spacing: .3rem;
        font-size: 1.6rem;
      }
  }
  @media screen and (min-width: 0) {
    .tag-list{
      width: 100%;
      border-left: 0;
      border-top: .1rem solid #c6c6c6;
    }
  }
  @media screen and (min-width: $media-min-width) {
    .tag-list{
      width: auto;
      border-left: .1rem solid #c6c6c6;
      border-top: 0;
    }
  }
  .tag-detail{
    margin-top: 1rem;
    margin-bottom: 2rem;
    float: left;
    width: 100%;
  }
  ul{
    list-style: none;
    margin-top: 1.2rem;
    font-size: 1.4rem;
    li{
        padding: .2rem .4rem;
        box-sizing: border-box;
    }
  }
  .article_list{
    width: 100%;
  }
  .tag-article-list-wrap{
    width: 80%;
    overflow: left;
  }
}
</style>
