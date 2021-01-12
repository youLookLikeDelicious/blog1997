<!--
<articleKeywords :keywords="1,2,3" :id="id" :showReadMore="boolean">
-->
<template>
  <div class="article-btn">
    <!-- 关键字信息 -->
    <div v-if="tags.length" class="tag">
      <a v-for="(tag, index) in tags" :key="index" href="/" @click.prevent="searchByTag(tag.id)">{{ tag.name }}</a>
    </div>
    <!-- 关键字信息结束 -->
    <div v-if="showReadMore" class="read-more">
      <nuxt-link :to="'/article/' + id">
        阅读全文 >
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleTags',
  inject: ['reload'],
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    },
    id: {
      type: [String, Number],
      default () {
        return ''
      }
    },
    showReadMore: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  methods: {
    /**
     * 搜索标签的行为
     * @param int tagId
     */
    searchByTag (tagId) {
      const searchFullPath = `/search?tag_id=${tagId}`
      // 如果当前路由不是查询路由
      if (this.$route.fullPath === searchFullPath) {
        return
      }

      this.$router.push(searchFullPath)
      if (this.$route.name === 'search') {
        this.reload()
      }
    }
  }
}
</script>

<style lang="scss">
.tag{
  font-size: 1rem;
  margin-top: 1.2rem;
  a{
    margin-right:1.2rem;
    border: .2rem solid #c6c6c6;
    padding: .4rem .7rem;
    text-align: center;
    border-radius: .7rem;
    font-weight: bolder;
    box-sizing: border-box;
    display: inline-block;
    @extend %text-gradient;
    &:hover{
      @extend %text-gradient-blue;
      border: .2rem solid $light-font-color;
    }
  }
}
.read-more{
  margin-top: 1.3rem;
  a{
    font-size: 1.4rem;
    margin-right:1.2rem;
    padding: .4rem .7rem;
    text-align: center;
    font-weight: bold;
    box-sizing: border-box;
    display: inline-block;
    color: #fff !important;
    @extend %text-gradient-blue;
    border-bottom: .2rem solid #00c6fb;
    &:hover{
      border-bottom: .2rem solid #005bea;
    }
  }
}
.article-btn{
  margin-top: .7rem;
  div{
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
