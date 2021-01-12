import { shallowMount } from '@vue/test-utils'
import AboutMe from '~/pages/about-me/index'

describe('test about me page', () => {
  const wrapper = shallowMount(AboutMe)
  expect(wrapper.get('.about-me').exists()).toBeTruthy()
  const head = AboutMe.head()
  expect(head.title).toContain('| About me')
})
