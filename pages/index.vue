<template>
  <div>
    <NewArticle v-if="articles.length" :article="articles[0]" />
    <div class="article_list_rail clear-float">
      <Rail
        :article-num="articleNum"
        :message-num="messageNum"
        :pop-articles="popArticles"
      />
      <ArticleList
        v-if="articles.length > 1"
        :articles="articles.slice(1)"
        :p="p"
        :pages="pages"
        :in-progress="inProgress"
        @getMoreArticle="getMoreArticle"
      />
    </div>
  </div>
</template>

<script>
import Rail from '~/components/index/rail'
import NewArticle from '~/components/index/new-article'
import ArticleList from '~/components/common/article-list'
import articleListMixin from '~/mixins/article/article-list-mixin'

export default {
  name: 'Index',
  components: {
    NewArticle,
    ArticleList,
    Rail
  },
  mixins: [articleListMixin],
  data () {
    return {
      messageNum: 0,
      articles: [],
      popArticles: [],
      getMoreUrl: 'article',
      articleNum: 0,
      pages: 0,
      p: 1 // 当前页
    }
  },
  async asyncData ({ app, $responseHandler, req, res }) {
    const data = await app.$axios.get('', req)
      .then(response => $responseHandler(response, res))
      .catch((e) => {
      })
    return data
  },
  head () {
    return {
      title: 'Blog1997',
      meta: [
        { hid: 'keywords', name: 'keywords', content: 'blog1997,个人博客' },
        { hid: 'description', name: 'description', content: 'PHP,JavaScript,Docker,Linux' }
      ]
    }
  }
}
</script>

<style lang="scss">
.article_list_rail{
    margin-top: 13rem;
}
</style>
