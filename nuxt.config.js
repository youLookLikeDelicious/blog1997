// import path from 'path'
// import fs from 'fs'

const env = require('dotenv').config()
const features = [
  'fetch',
  // 'Object.entries',
  // 'Object.assign',
  // 'Promise',
  // 'Promise.prototype.finally',
  // 'NodeList.prototype.%40%40iterator',
  'NodeList.prototype.forEach'
  // 'String.prototype.endsWith',
  // 'String.prototype.startsWith'
  // 'IntersectionObserver'
  // 'es2015',
  // 'es2016'
].join('%2C')

const googleSiteTag = []

if (process.env.ANALYTICS) {
  googleSiteTag.push(...[
    { src: `https://www.googletagmanager.com/gtag/js?id=${process.env.ANALYTICS}`, async: true },
    { innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}; gtag('js', new Date()); gtag('config', '${process.env.ANALYTICS}');` }
  ])
}
export default {
  ssr: true,
  env: env.parsed,
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.title,
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=Edge,chrome=1' },
      { hid: 'renderer', name: 'renderer', content: 'webkit' },
      { hid: 'force-renderer', name: 'force-rendering', content: 'webkit' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0', 'maximum-scale': '1.0', 'user-scalable': 'no' },
      { hid: 'description', name: 'description', content: process.env.description },
      { hid: 'og:description', name: 'og:description', content: process.env.description },
      { hid: 'keywords', name: 'keywords', content: process.env.keywords },
      { hid: 'applicable-device', name: 'applicable-device', content: 'pc,mobile' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'blog1997' },
      { hid: 'og:local', property: 'og:local', content: 'zh_cn' },
      { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    // script: [
    //   { src: `https://polyfill.io/v3/polyfill.min.js?features=${features}`, body: true }
    // ],
    script: googleSiteTag,
    __dangerouslyDisableSanitizers: ['script']
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#00c6fb'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/base.scss',
    '~/assets/style/icofont.min.css'
  ],
  styleResources: {
    // your settings here
    scss: [
      '~/assets/style/_variable.scss',
      '~/assets/style/_mixin.scss',
      '~/assets/style/_placeholder.scss'
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/ctx-inject',
    { ssr: true, src: '~/plugins/ssr/index' },
    { ssr: false, src: '~/plugins/client/index' },
    { ssr: false, src: '~/plugins/client-app/check-can-i-use/can-i-use-webp' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/style-resources'
  ],
  /*
  ** Nuxt.js modules
  */
  // modules: ['@nuxtjs/style-resources'], // run dev会报错
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    clientBaseURL: process.env.CLIENT_BASE_URL,
    weChatAppId: process.env.WEICHAT_APP_ID,
    weChatRedirect: process.env.WEICHAT_REDIRECT,
    gitClientId: process.env.GIT_CLIENT_ID,
    gitCallBack: process.env.GIT_CALL_BACK,
    title: process.env.title
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, { isClient }) {
    },
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: undefined,
      cacheGroups: {}
    },
    babel: {
    },
    extractCSS: true,
    transpile: [
      '@blog1997/vue-umeditor',
      '@blog1997/animate'
    ]
  },
  // 命名视图
  router: {
    mode: 'history',
    fallback: true
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    // }
  },
  watchers: {
    webpack: {
      aggregateTimeout: 1000,
      poll: 1200
    }
  }
}
