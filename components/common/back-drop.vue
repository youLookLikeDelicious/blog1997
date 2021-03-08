<template>
  <style v-if="gallery && gallery.id">
    .{{ className }}::before{
    position: absolute;
    content: '';
    width: {{ width }};
    height: {{ height }};
    z-index: -2;
    right: {{ right }};
    top: {{ top }};
    background-image: radial-gradient(ellipse closest-side, rgba(50, 0, 0, 0.3), #100e17), url({{ gallery.thumbnail }});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.7;
    }
    {{ enhancedStyle }}
  </style>
</template>

<script>
export default {
  name: 'BackDrop',
  props: {
    gallery: {
      type: Object,
      default () {
        return {}
      }
    },
    height: {
      type: String,
      default () {
        return '100%'
      }
    },
    top: {
      type: String,
      default () {
        return '0'
      }
    },
    width: {
      type: String,
      default () {
        return '100%'
      }
    },
    right: {
      type: String,
      default () {
        return '0px'
      }
    },
    isHero: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      realdGallery: ''
    }
  },
  computed: {
    className () {
      return this.isHero ? 'hero-article' : 'post-' + this.gallery.id
    },
    enhancedStyle () {
      if (!this.realdGallery) {
        return ''
      }

      return `.${this.className}::after{
    position: absolute;
    content: '';
    width: ${this.width};
    height: ${this.height};
    z-index: -2;
    right: 0px;
    top: ${this.top};
    background-image: radial-gradient(ellipse closest-side, rgba(50, 0, 0, 0.3), #100e17), url(${this.realdGallery});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    animation: back-drop-animation .7s forwards`
    }
  },
  mounted () {
    this.getRealGallery()
  },
  methods: {
    getRealGallery () {
      if (!this.gallery) {
        return
      }
      this.$axios({
        url: this.gallery.url + '?t=origin',
        baseURL: '/',
        responseType: 'blob'
      })
        .then(response => response.data)
        .then(data => this.setRealGallery(data))
    },
    /**
     * 设置没有被压缩的gallery url
     * @param Blob gallery
     * @return void
     */
    setRealGallery (gallery) {
      this.realdGallery = URL.createObjectURL(gallery)
    }
  }
}
</script>
<style lang="scss">
@keyframes back-drop-animation {
  from {
    filter: blur(20px);
    opacity: 0;
  }
  to {
    filter: blur(0);
    opacity: .7;
  }
}
</style>
