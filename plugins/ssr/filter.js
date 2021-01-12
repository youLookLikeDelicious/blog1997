import Vue from 'vue'
// vue管道符的过滤方法

const serializeMessage = function (obj) {
  let message = ''
  for (const i in obj) {
    message += `${obj[i]} \n`
  }

  return message
}

// 将后台返回的信息 拼接成字符串
Vue.filter('serializeMessage', serializeMessage)

const dateFormat = function (timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString()
}
// 将unix时间戳转为日期
Vue.filter('dateFormat', dateFormat)

const filterSearchType = function (type) {
  return { 'keyword': '关键字', 'tag': '标签' }[type]
}
Vue.filter('filterSearchType', filterSearchType)

export { filterSearchType, dateFormat, serializeMessage }
