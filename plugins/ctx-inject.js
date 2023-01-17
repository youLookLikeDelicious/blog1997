import axios from './axios'

export default (context, inject) => {
  inject('axios', axios)
  const key = context.$config.GOOGLE_ANALYTICS

  context.app.head.script = key
    ? [
      { src: `https://www.googletagmanager.com/gtag/js?id=${key}`, async: true },
      { innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}; gtag('js', new Date()); gtag('config', '${key}');` }
    ]
    : []
}
