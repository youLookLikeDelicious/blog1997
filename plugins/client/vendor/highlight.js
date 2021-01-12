import hljs from 'highlight.js'
import 'highlight.js/styles/color-brewer.css'

/**
 * 将代码高亮显示
 * 
 * @param {HTMLElement} container
 */
function highLightCode (container) {
  const preTags = container ? container.getElementsByTagName('pre') : document.getElementsByTagName('pre')
  // 使用highlisght更改代码样式
  for (let i = 0, len = preTags.length; i < len; i++) {
    if (preTags[i].dataset.light) {
      return
    }
    preTags[i].dataset.light = 'highlight'
    hljs.highlightBlock(preTags[i])
  }
}

export default highLightCode
