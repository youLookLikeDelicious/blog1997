import marked from 'marked'

// marked.setOptions({
//   highlight (code, lang) {
//     const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext'
//     return hljs.highlight(validLanguage, code).value
//   }
// })

const renderer = {
  image (href, title, text) {
    let width = href.match(/width=(\d+)/)

    width = width ? 'width=' + width[1] : ''

    const pureSrc = href.replace(/\?.*/, '')

    return `<img src="${href}" class="lazy" data-src="${pureSrc}" alt="${text}" ${width} />`
  }
}

marked.use({ renderer })
export default marked
