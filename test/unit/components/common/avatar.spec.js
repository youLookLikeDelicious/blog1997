import { shallowMount, createLocalVue } from '@vue/test-utils'
import Avatar from '~/components/common/avatar'

const localVue = createLocalVue()

/**
 * 测试 avatar组件
 */
describe('Test avatar component', () => {
  it('Basic test when there is src attribute', () => {
    const wrapper = shallowMount(Avatar, {
      localVue,
      propsData: {
        src: 'https://www.blog1997.com/src',
        name: 'name'
      }
    })

    expect(wrapper.vm.$el.tagName).toBe('IMG')
    expect(wrapper.vm.$el.src).toBe('https://www.blog1997.com/src')
    expect(wrapper.vm.$el.alt).toBe('name')
  })
  it('Basic test when there is no src attribute', () => {
    const wrapper = shallowMount(Avatar, {
      localVue,
      propsData: { }
    })

    expect(wrapper.vm.$el.tagName).toBe('DIV')
  })
})
