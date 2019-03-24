export const baseState = {
  active: 0,
  levels: [
    [
      [
        "i = 0",
        "i++",
        "i++"
      ],
      [
        [1, { i : 0 }],
        [2, { i : 1 }],
        [-1, { i : 2 }]
      ]
    ],
    [
      [
        "l = [1, 2, 3]",
        "k = 2",
        "delete(k)"
      ],
      [
        [1, { l : [1, 2, 3]}],
        [2, { j : 1, k : 2}],
        [-1, { j : 1}]
      ]
    ],
    [
      [
        "i = 0"
      ],
      [
        [-1, {i : 0}]
      ]
    ]
  ],
  level: 0
}

export const state = () => (baseState)

export const mutations = {
  setActive (state, value) {
    state.active = value
  },
  setLevel (state, value) {
    state.level = value
  },
  nextStep (state) {
    state.active = state.levels[state.level][1][state.active][0]
  }
}

export const actions = {

}

export const getters = {
  instructions: (state) => {
    return state.levels[state.level][0]
  }
}
