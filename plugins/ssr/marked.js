import marked from 'marked'

// marked.setOptions({
//   highlight (code, lang) {
//     const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext'
//     return hljs.highlight(validLanguage, code).value
//   }
// })

const renderer = {
  image (href, title, text) {
    const pureSrc = href.replace(/\?.*/, '')

    return `<img class="lazy" data-src="${pureSrc}" alt="${text}" style="max-width: 97%; display: inline-block; margin: 0 auto;" />`
  }
}

marked.use({ renderer })
export default marked
