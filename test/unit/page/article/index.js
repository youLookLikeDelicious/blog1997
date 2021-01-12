import { shallowMount } from '@vue/test-utils'
import ArticleNotFond from '~/pages/article/index'

describe('test about me page', () => {
  const wrapper = shallowMount(ArticleNotFond)
  expect(wrapper.get('.article-404').exists()).toBeTruthy()
})
