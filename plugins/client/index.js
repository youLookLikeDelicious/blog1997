import Vue from 'vue'
import './global'
import verify from '@bit/blog1997.vue-collection.verify-plugin/index.js'
import JSEncrypt from 'jsencrypt'
import utile from './utile/index'
import articleInitAnimate from './article-init-animate/index'
import currentUser from './current-user'
import vender from './vendor'
import lazy from './lazy-load/index.js'
export default function ({ $config, $axios }) {
  Vue.use(verify)
  Vue.use(vender)
  Vue.use(utile)
  Vue.use(articleInitAnimate)
  Vue.use(currentUser)
  Vue.use({
    install (vue) {
      const encryptor = new JSEncrypt()
      if (!$config.RSA_PUB_KEY) {
        vue.prototype.$encryptor = {
          encrypt (value) {
            return value
          }
        }
      } else {
        encryptor.setPublicKey($config.RSA_PUB_KEY)
        vue.prototype.$encryptor = encryptor
      }
      vue.prototype.$lazy = lazy
    }
  })
  $axios.defaults.baseURL = $config.clientBaseURL
}
