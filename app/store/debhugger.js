export const baseState = {
  active: 0,
  levels: [
    [
      [
        "i = 0",
        "j = 4",
        "i += 1",
        "i = i + j"
      ],
      [
        [1, { i : 0 }],
        [2, { i : 0, j : 4 }],
        [3, { i : 1, j : 4 }],
        [-1, { i : 5, j : 4 }]
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
    ],
      [
        [
          "l = [3,4,8,8,2]",
          "max = l[0]",
          "for elem in l:",
          "&nbsp;&nbsp;if(elem > max):",
          "&nbsp;&nbsp;&nbsp;&nbsp;max = elem"
        ],
        [
          [(1,{ l:[3,4,8,8,2]}),
          (2,{ l:[3,4,8,8,2],
              max :3}),
          (3,{ l:[3,4,8,8,2],
              elem : 3,
              max : 3}),
          (2,{ l:[3,4,8,8,2],
              elem : 3,
              max : 3}),
          (3,{ l:[3,4,8,8,2],
              elem : 4,
              max : 3
              }),
          (4,{ l:[3,4,8,8,2],
            elem : 4,
            max : 3}),
          (2,{ l:[3,4,8,8,2],
              elem : 4,
              max : 4,
              }),
          (3,{ l:[3,4,8,8,2],
              elem : 8,
              max : 4
              }),
            (4,{ l:[3,4,8,8,2],
            elem : 8,
            max : 4
            }),
          (2,{ l:[3,4,8,8,2],
              elem : 8,
              max : 8
              }),
            (3,{ l:[3,4,8,8,2],
              elem : 8,
              max : 8
              }),
            (2,{ l:[3,4,8,8,2],
              elem : 8,
              max : 8
              }),
            (3,{ l:[3,4,8,8,2],
              elem : 8,
              max : 8
              }),
          (2,{ l:[3,4,8,8,2],
              elem : 2,
              max : 8
              }),
          (3,{ l:[3,4,8,8,2],
              elem : 2,
              max : 8
              }),
            (-1,{ l:[3,4,8,8,2],
              elem : 2,
              max : 8
              })
        ]
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
