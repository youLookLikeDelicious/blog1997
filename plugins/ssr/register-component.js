// 注册全局组件等
import Vue from 'vue'
import umeditor from '@blog1997/vue-umeditor/component'
import promptMessage from '@bit/blog1997.vue-collection.prompt-message/prompt-message.vue'
import VInput from '@bit/blog1997.vue-collection.v-input/v-input.vue'
import VHelper from '@bit/blog1997.vue-collection.v-helper/v-helper/index.vue'
import waiting from '~/components/common/waiting'
import backDrop from '~/components/common/back-drop'
import reportIllegalInfo from '~/components/common/report-illegal-info'
import Avatar from '~/components/common/avatar'

Vue.use({
  install (vue) {
    vue.component('promptMessage', promptMessage)
    vue.component('waiting', waiting)
    vue.component('umeditor', umeditor)
    vue.component('backDrop', backDrop)
    vue.component('reportIllegalInfo', reportIllegalInfo)
    vue.component('avatar', Avatar)
    vue.component('v-input', VInput)
    vue.component('v-helper', VHelper)
  }
})
