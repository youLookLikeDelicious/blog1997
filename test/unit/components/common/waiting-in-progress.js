import {
  mount
} from '@vue/test-utils'
import WaitingInProgress from '~/components/common/waiting-in-progress'

test('test waiting in progress component', () => {
  const wrapper = mount(WaitingInProgress)
  expect(wrapper.vm.$el.className).toBe('in-progress-loader')
})
