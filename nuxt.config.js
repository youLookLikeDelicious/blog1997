
const env = require('dotenv').config()
export default {
  mode: 'spa',
  env: env.parsed,
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/style/base.scss'
  ],
  styleResources: {
    // your settings here
    scss: [
      '@/assets/style/_mixin.scss',
      '@/assets/style/_placeholder.scss',
      '@/assets/style/_variable.scss'
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/filter',
    '@/plugins/registComponent',
    '@/plugins/vuePrototype'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  // 命名视图
  router: {
    extendRoutes (routes, resolve) {
      routes.forEach((route, index) => {
        routes[index] = {
          ...route,
          components: {
            default: route.component,
            'navigate': resolve(__dirname, 'components/layout/navigate'),
            'foot': resolve(__dirname, 'components/layout/foot')
          },
          chunkNames: {
            'navigate': 'components/layout/navigate',
            'foot': 'components/layout/foot'
          }
        }
      })
    }
  },
  server: {
    port: 3001, // default: 3000
    host: '0.0.0.0' // default: localhost
  }
}
