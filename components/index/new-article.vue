<!--
<new-article :article={}>
-->
<template>
  <article v-if="article.identity" class="hero-article">
    <backDrop :gallery="article.gallery" :is-hero="true" />
    <header class="article_header">
      <span>最新文章</span> <span>{{ article.created_at | dateFormat }}</span>
    </header>
    <h1 class="title">
      <nuxt-link :to="'/article/' + article.identity">
        {{ article.title }}
      </nuxt-link>
    </h1>
    <div class="user_info_wrap">
      <div class="display-inline-block">
        <a href="/" class="relative-position" @click.stop.prevent>
          <avatar :src="article.author.avatar" />
          <svg class="half-circle-svg" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#005bea;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#00c6fb;stop-opacity:1" />
              </linearGradient>
            </defs>
            <circle
              stroke-width="5"
              stroke-linecap="round"
              stroke="url(#grad1)"
              stroke-dasharray="100 100"
              stroke-dashoffset="7"
              fill="none"
              cx="50"
              cy="50"
              r="30"
            />
          </svg>
        </a>
      </div>
      <div class="user_info">
        <div class="user_info">
          <p>作者</p>
          <a href="/" class="user-name">{{ article.author.name }}</a>
        </div>
        <div class="user_info">
          <p>评论 {{ article.commented }}</p>
          <p class="relative-position">
            <a href="/" class="join-comment" :data-id="article.identity" @click.stop.prevent @click="joinComment($event)">
              加入评论
              <svg
                class="right-arrow-svg"
                :data-id="article.identity"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000 1000"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <glyph glyph-name="swoosh-right" unicode="&#xeac4;" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#005bea;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#00c6fb;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <path fill="url(#grad1)" d="M200.2 509.3l2.3000000000000114-17.100000000000023c0.5999999999999943-2.8999999999999773 2.6999999999999886-5.199999999999989 5.199999999999989-5.199999999999989h124.10000000000002l2.099999999999966-16.399999999999977h-98.29999999999998c-1.6999999999999886 0-3.0999999999999943-0.8000000000000114-4.199999999999989-2.3000000000000114-0.8000000000000114-1.1999999999999886-1.200000000000017-3.1000000000000227-1-4.800000000000011l2.9000000000000057-20c0.39999999999997726-3.1000000000000227 2.5-5.199999999999989 5-5.199999999999989h350.99999999999994l-109.79999999999995-109.69999999999999c-8.100000000000023-8.100000000000023-9.300000000000011-22.30000000000001-2.6000000000000227-31.600000000000023l41.60000000000002-57.900000000000006c6.7000000000000455-9.299999999999983 18.799999999999955-10.299999999999983 26.899999999999977-2.1999999999999886l248.39999999999998 248.4c8.100000000000023 8.099999999999966 8.100000000000023 21.30000000000001 0 29.400000000000034l-248.29999999999995 248.5c-8.100000000000023 8.099999999999909-20 7.099999999999909-26.600000000000023-2.400000000000091l-40.89999999999998-58.799999999999955c-6.600000000000023-9.399999999999977-5.300000000000011-23.700000000000045 2.8000000000000114-31.799999999999955l108.40000000000003-108.40000000000009h-331.6c-1.5 0-2.900000000000034-0.7999999999999545-4.000000000000028-2.2999999999999545-1-1.2000000000000455-1.5-3.1000000000000227-1-5l2.3000000000000114-16.200000000000045c0.4000000000000057-2.8999999999999773 2.700000000000017-5.199999999999932 5.200000000000017-5.199999999999932h93.5l2.099999999999966-16.399999999999977h-150.5c-1.5 0-2.8999999999999773-0.8000000000000682-4-2.300000000000068-1-1.3999999999999773-1.5-3.1999999999999886-1-5.099999999999966z" />
              </svg>
            </a>
          </p>
        </div>
      </div>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="article-summary" v-html="$initHTML(article)" />
    <div class="article-btn">
      <tags :id="article.identity" :tags="article.tags" />
    </div>
  </article>
</template>

<script>
// 最新文章组件
import tags from './article-tags'
import articleLinkMixin from '~/mixins/article/article-link-mixin'

export default {
  name: 'NewArticle',
  components: {
    tags
  },
  mixins: [articleLinkMixin],
  props: {
    article: {
      type: Object,
      default () {
        return {
          article: {
            title: '',
            commented: 0,
            author: {},
            summary: '',
            gallery: {
              id: '',
              url: ''
            },
            identity: '',
            is_origin: '',
            keywords: '',
            updated_at: ''
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
    .hero-article {
        width: 100%;
        box-sizing: border-box;
        position: relative;
        margin-top: 2rem;
        padding:  0 2rem 2rem 2rem;
        .article-summary{
          margin-bottom: 2rem;
          overflow: hidden;
          line-height: 2.7rem;
          pre{
            width: 100%;
            white-space: pre-wrap;
            color: #f5f7fa;
          }
        }
        .user_info_wrap{
          margin-top: 2rem;
          margin-bottom: 5rem;
          @extend %user_info_wrap;
          .user_info{
            display: inline-block;
            margin-left: 1rem;
          }
        }
        .title{
            padding: 0 0 .9rem 0;
            font-size: 4.3rem;
            letter-spacing: .3rem;
            box-sizing: border-box;
            display: table;
            margin-bottom: 1.2rem;
            a{
              @extend %text-gradient-blue;
            }
        }
    }
</style>
