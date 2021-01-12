import { shallowMount, createLocalVue } from '@vue/test-utils'
import promptMessage from '@bit/blog1997.vue-collection.prompt-message/prompt-message.vue'
import login from '~/layouts/login'
import Waiting from '~/components/common/waiting'
import nuxt from '~/.nuxt/components/nuxt'

const localVue = createLocalVue()

localVue.use({
  install (vue) {
    vue.component('waiting', Waiting)
    vue.component('nuxt', nuxt)
    vue.component('promptMessage', promptMessage)
  }
})
describe('test login layout', () => {
  const wrapper = shallowMount(login, { localVue })
  const waitingComponent = wrapper.findComponent(Waiting)
  const nuxtComponent = wrapper.findComponent(nuxt)
  const promptMessageComponent = wrapper.findComponent(promptMessage)
  expect(waitingComponent.exists()).toBeTruthy()
  expect(nuxtComponent.exists()).toBeTruthy()
  expect(promptMessageComponent.exists()).toBeTruthy()
})
