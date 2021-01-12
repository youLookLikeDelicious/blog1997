window.setUserInfo = function (user) {
  window.$nuxt.$store.commit('user/setUser', user)
  window.$nuxt.$store.commit('globalState/setShowLogin', false)
  window.newWindow.close()
  window.newWindow = ''
}

window.addHandler = function (el, type, handler) {
  if (el.addEventListener) {
    el.addEventListener(type, handler)
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, handler)
  } else {
    el['on' + type] = handler
  }
}

window.removeHandler = function (el, type, handler) {
  if (el.removeEventListener) {
    el.removeEventListener(type, handler)
  } else if (el.detachEvent) {
    el.detachEvent('on' + type, handler)
  } else {
    el['on' + type] = ''
  }
}
