<template>
  <img v-if="src" class="avatar" :src="src" :alt="name">
  <div v-else class="inline-block avatar">
    <i class="icofont-user-alt-5" />
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    src: {
      type: String,
      default () {
        return ''
      }
    },
    name: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>

<style lang="scss">
.avatar {
  $size: 4.5rem;
  width: $size;
  height: $size;
  line-height: $size;
  border-radius: $size;
  text-align: center;
  i {
    font-size: 3rem;
  }
}
</style>
