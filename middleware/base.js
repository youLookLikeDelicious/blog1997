export default function ({ store, route }) {
  store.commit('globalState/hidDialog')
  store.commit('globalState/clearVisibleBackDrop')
  if (route.name !== 'search') {
    store.commit('search/setSearchConfig', {})
  }
}
