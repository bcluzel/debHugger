export const baseState = {
  isActive: false,
  query: ''
}

export const state = () => (baseState)

export const mutations = {
  setIsActive (state, value) {
    state.isActive = value
  },
  setQuery (state, value) {
    state.query = value
  }
}

export const actions = {

}

export const getters = {
  disabled: ({}, {},
    {
      connectivity,
    }, {}) => (!connectivity.hasConnexion)
}
