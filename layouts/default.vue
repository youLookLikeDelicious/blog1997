<template>
  <div>
    <navigate />
    <nuxt class="container" />
    <foot />
  </div>
</template>
<script>
import navigate from '../components/layout/navigate'
import foot from '../components/layout/foot'
export default {
  components: {
    navigate,
    foot
  }
}
</script>
<style>

</style>
