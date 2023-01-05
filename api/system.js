import axios from '~/plugins/axios'

export function getCsrfToken () {
  return axios.get('/csrf')
}

export function sso (data) {
  return axios.post('oauth/authorize', data)
}
