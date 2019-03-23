export const baseState = {
  active: 0,
  instructions: [
    'a = 0',
    'a++',
    'b = a + 4',
    {
      name: 'for in in [1-5]',
      active: 0,
      times: 5,
      instructions: [
        'a++',
        'b--'
      ]
    }
  ],
  memories: [{
    a: 0
  }, {
    a: 1
  }, {
    b: 5,
    a: 1
  }]
}

export const state = () => (baseState)

export const mutations = {
  setActive (state, value) {
    state.active = value
  },
  nextStep (state) {
    if (typeof state.instructions[state.active] === 'object') {
      state.instructions[state.active].active++
      state.instructions[state.active].active %= state.instructions[state.active].instructions.length
    } else {
      state.active++
    }
  }
}

export const actions = {

}

export const getters = {

}
