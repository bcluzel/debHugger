export const baseState = {
  active: 0
}

export const state = () => (baseState)

export const mutations = {
  setActive (state, value) {
    state.active = value
  },
  nextStep (state) {
    state.active++
  }
}

export const actions = {

}

export const getters = {

}
