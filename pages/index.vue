<template>
  <div>
    <new-article v-if="data.length" :article="data[0]" />
    <div class="article_list_rail clear-float">
      <rail
        :article-num="articleNum"
        :message-num="messageNum"
        :pop-articles="popArticles"
      />
      <article-list
        v-if="data.length > 1"
        :articles="data.slice(1)"
        :has-more-article="query.page < meta.last_page"
        :in-progress="inProgress"
        @getMoreArticle="getMoreArticle"
      />
    </div>
  </div>
</template>

<script>
import { getIndex } from '~/api/system'
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
      data: [],
      popArticles: [],
      articleNum: 0
    }
  },
  async asyncData ({ params }) {
    const data = await getIndex(params)
      .then(res => res.data)
      .catch((e) => {
        return {}
      })
    return data
  },
  head () {
    return {
      title: this.$config.title
    }
  }
}
</script>

<style lang="scss">
.article_list_rail{
    margin-top: 13rem;
}
</style>
