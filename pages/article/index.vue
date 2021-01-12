<!--文章详情-->
<template>
  <div>
    <div class="article-404">
      <p>芝麻芝麻快开门</p>
      <p>请检查url是否正确</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: undefined,
      userInfo: undefined,
      appendComment: false,
      UM: undefined
    }
  }
}
</script>

<style lang="scss">
    .article-404{
        text-align: center;
        font-size: 1.7rem;
    }
</style>
