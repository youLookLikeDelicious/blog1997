<template>
  <div v-if="!searchInProgress" class="search-wrapper clear-float">
    <div class="search-header">
      <section>
        <span>{{ currentKeyword }}</span>
      </section>

      <div class="order-by">
        <div>
          <span>结果排序</span>
          <a
            href="/"
            :class="{on: orderBy === 'mixed'}"
            @click.stop.prevent
            @click="search('mixed')"
          >综合排序</a>
          <a
            href="/"
            :class="{on: orderBy === 'visit'}"
            @click.stop.prevent
            @click="search('visit')"
          >热门文章</a>
          <a
            href="/"
            :class="{on: orderBy === 'new'}"
            @click.stop.prevent
            @click="search('new')"
          >最新发布</a>
          <a
            href="/"
            :class="{on: orderBy === 'commented'}"
            @click.stop.prevent
            @click="search('commented')"
          >评论最多</a>
        </div>
        <div>共 {{ meta.total }} 个结果</div>
      </div>
    </div>
    <article-list
      v-if="data.length"
      :articles="data"
      :has-more-article="query.page < meta.last_page"
      :in-progress="inProgress"
      @getMoreArticle="getMoreArticle"
    />
    <div v-else class="search-not-fond">
      <i class="icofont-mathematical" />
      <p>未找到相关内容</p>
    </div>
  </div>
  <WaitingInProgress v-else />
</template>

<script>
import { searchArticle } from '~/api/article'
import ArticleList from '~/components/common/article-list'
import articleListMixin from '~/mixins/article/article-list-mixin'
import WaitingInProgress from '~/components/common/waiting-in-progress'

export default {
  name: 'Search',
  components: {
    ArticleList,
    WaitingInProgress
  },
  mixins: [articleListMixin],
  data () {
    return {
      searchInProgress: false,
      orderBy: 'mixed' // 当前的排序方式
    }
  },
  computed: {
    currentKeyword () {
      return this.$store.state.search.keyword
    },
    /**
     * 请求分页的额外数据
     * 在mixin中被调用
     * 默认返回''
     */
    getMoreCondition () {
      return `keyword=${this.currentKeyword}&orderBy=${this.orderBy}`
    },
    /**
     * 获取更多内容连接
     * 在mixin中被调用
     */
    getMoreUrl () {
      return `${this.$route.path}`
    }
  },
  mounted () {
    /**
     * 在 $route.query.keyword更改之后调用, 否则keyword还是之前的值（kyeword当前的值不能获取）
     */
    window.setTimeout(() => {
      this.search()
    }, 0)
  },
  methods: {
    /**
     * 查询关键字 在客户端使用
     *
     * @param conditon 排序的条件,默认是综合排序
     */
    search (orderBy = 'mixed') {
      if (this.searchInProgress) {
        return
      }
      // 不能使用this.currentSearchType === this.searchType
      // console.log(this.currentSearchType === this.$route.query.type)
      if (this.currentKeyword === this.$route.query.keyword && this.orderBy === orderBy) {
        return
      }
      this.searchInProgress = true
      this.orderBy = orderBy
      const query = this.getQueryStack(orderBy)
      searchArticle(query)
        .then(response => response.data)
        .then((data) => {
          const keyword = data.currentKeyword
          this.data = data.data
          this.$store.commit('search/setSearchConfig', { keyword })
          this.meta = data.meta
        })
        .catch(() => {})
        .finally(() => {
          this.searchInProgress = false
        })
    },
    /**
     * 从query中生成查询的结果
     *
     * @param string orderBy
     * @returns {array}
     */
    getQueryStack (orderBy) {
      const thisQuery = this.$route.query
      const query = { orderBy }

      if (thisQuery.keyword) {
        query.keyword = thisQuery.keyword
      }
      if (thisQuery.tag_id) {
        query.tag_id = thisQuery.tag_id
      }

      return query
    }
  }
}
</script>

<style lang="scss">
.search-wrapper {
  .search-header {
    margin-bottom: 8rem;
    .order-by {
      font-size: 1.4rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      div{
        margin-top: .7rem;
        white-space: nowrap;
      }
      a {
        margin-left: 1rem;
      }
      .on {
        color: $light-font-color;
      }
    }
    section {
      font-size: 2.7rem;
      margin-bottom: 0.7rem;
      font-weight: bold;
      span {
        font-size: 5rem;
        @extend %text-gradient-blue;
      }
      margin-bottom: 2rem;
    }
  }
  .search-not-fond {
    i {
      font-size: 5rem;
    }
    p {
      margin-top: 1rem;
    }
    text-align: center;
  }
}
</style>
