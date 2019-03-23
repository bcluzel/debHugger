export const baseState = {
  isActive: true
}

export const state = () => (baseState)

export const mutations = {
  setIsActive (state, value) {
    state.isActive = value
  }
}

export const actions = {

}

export const getters = {

}
