export const baseState = {
  isActive: false,
  callbacks: []
}

export const state = () => (baseState)

export const mutations = {
  setIsActive (state, value) {
    state.isActive = value
  },
  setCallbacks (state, value) {
    state.callbacks = value
  }
}

export const actions = {

}

export const getters = {

}
