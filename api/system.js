import axios from '~/plugins/axios'

export function getCsrfToken () {
  return axios.get('/csrf')
}
