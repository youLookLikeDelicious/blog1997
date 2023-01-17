<template>
  <div class="tags hid-overflow">
    <div class="tag-article-list-wrap">
      <div class="tag-detail font-size-14rem color-777">
        <span class="current-tag">{{ currentTag.name }}</span> <span>该标签共收录 {{ meta.total }} 篇文章</span>
      </div>
      <article-list
        v-if="data.length"
        :articles="data"
        :has-more-article="query.page < meta.last_page"
        :in-progress="inProgress"
        @getMoreArticle="getMoreArticle"
      />
    </div>
    <div class="tag-list">
      <div class="icofont-archive">
        标签
      </div>
      <ul v-if="tags.length">
        <li v-for="tag in tags" :key="tag.id">
          <nuxt-link :to="'/tag/' + tag.id" :class="{ active: currentTagId === tag.id }">
            {{ tag.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTagList } from '~/api/article'
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
      tags: [],
      data: [],
      query: { page: 1 },
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
      title: this.$config.title + ' | Tag'
    }
  },
  async asyncData ({ params }) {
    // 获取请求的头部
    const data = await getTagList(params)
      .then(response => ({ ...response.data }))
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
    li a {
      transition: color .3s;
    }
    .active {
      color: #00c6fb;
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
