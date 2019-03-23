export const baseState = {
  isActive: false
}

export const state = () => (baseState)

export const mutations = {
  setIsActive (state, isActive) {
    state.isActive = isActive
  }
}

export const actions = {

}

export const getters = {
  canShow: ({ isActive }, {},
    {
      drawer,
      search,
      auth,
      route,
      snackbar
    }, {}) => (
    isActive
      && ![
          drawer.isActive,
          search.isActive,
          auth.form,
          route.name === 'products-id',
          snackbar.isActive
        ].some(_ => _)
    )
}
