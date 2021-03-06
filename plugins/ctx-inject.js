import axios from './axios'

/**
 * 获取 request中的cookie
 * @param {} request
 */
// function getCookie (request) {
//   const conf = {}

//   if (request && request.headers && request.headers.cookie) {
//     conf.headers = {
//       Cookie: request.headers.cookie
//     }
//   }

//   return conf
// }

function $responseHandler (response, res) {
  const data = response.data.data
  const headers = response.headers
  const cookie = headers['set-cookie']
  if (cookie) {
    res.setHeader('Set-Cookie', cookie)
  }

  // 在nodejs中 设置cookie
  if (process.server) {
    res.setHeader('x-ratelimit-limit', headers['x-ratelimit-limit'])
    res.setHeader('x-ratelimit-remaining', headers['x-ratelimit-remaining'])
  }
  return data
}

export default (context, inject) => {
  inject('axios', axios)
  context.$responseHandler = $responseHandler
}
