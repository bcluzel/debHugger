import Timer from '@/assets/timer'

export const baseState = {
  id: 0,
  isActive: false,
  timer: null,
  content: '',
  actions: [],
  color: '',

  stacked: [],
  delayToSwitch: 500,
  nextId: 0
}

export const state = () => (baseState)

export const mutations = {
  _setIsActive(state, value) {
    state.isActive = value
  },
  _set (state, { timer, content, actions, color, id }) {
    state.timer = timer
    state.content = content && content.trim() === '' ? undefined : content
    state.actions = actions
    state.color = color
    state.id = id !== undefined ? id : state.nextId++
  },
  _stack ({ stacked, timer, content, actions, color, id }) {
    stacked.unshift({
      timer,
      content,
      actions,
      color,
      id
    })
  },
  _unstack ({ stacked }) {
    stacked.shift()
  },
  _removeFromStack ({ stacked }, id) {
    stacked = stacked.filter(_ => _.id !== id)
  }
}

export const actions = {
  async patch ({ commit, state }, { payload, id }) {
    if (!id || state.id === id) {
      state.timer.pause()
      commit('_set', {
        ...state,
        ...payload
      })
    } else {
      const { stacked } = state
      const snackbar = stacked.find(_ => id === _.id)
      if (snackbar) {
        snackbar.timer.pause()
        snackbar = {
          ...snackbar,
          ...payload
        }
      }
    }
  },
  async dismiss ({ dispatch, commit, state }, id) {
    if (!id || state.id === id) {
      await dispatch('setIsActive', false)
    } else {
      commit('_removeFromStack', id)
    }
  },
  async set({ state, commit, dispatch }, { content, actions, color, id, timer, timeout }) {
    await dispatch('setIsActive', true)
    commit('_set', {
      timer: timer || (actions && !timeout
        ? null
        : new Timer(async () => (
          await dispatch('setIsActive', false)
        ), (timeout || 4000) + state.delayToSwitch)),
      content,
      actions,
      color,
      id
    })
    return {
      dismiss: async () => {
        await dispatch('dismiss', state.id)
      },
      patch: async (payload) => {
        await dispatch('patch', {
          id: state.id,
          payload
        })
      }
    }
  },
  async setIsActive ({ state, commit, dispatch }, value) {
    if (value) {
      if (state.isActive) {
        await dispatch('_stack')
      }
      commit('_setIsActive', true)
    } else if (state.stacked.length) {
      const { timer, content, actions, color, id } = await dispatch('_unstack')
      await dispatch('set', {
        content,
        actions,
        color,
        timer,
        id
      })
    } else {
      commit('_setIsActive', false)
    }
  },
  async _stack({ state, commit, dispatch }) {
    commit('_setIsActive', false)
    await dispatch('_delayToSwitch')
    if (state.timer) {
      state.timer.pause()
    } else {
      commit('_stack')
    }
  },
  async _unstack ({ state, commit, dispatch }) {
    const { stacked } = state
    const _ = stacked[0]
    _.timer && _.timer.resume()
    commit('_unstack')
    commit('_setIsActive', false)
    await dispatch('_delayToSwitch')
    return _
  },
  async _delayToSwitch ({ state }) {
    await (() => new Promise(resolve => setTimeout(resolve, state.delayToSwitch)))()
  }
}

export const getters = {
  canShow: ({ isActive }, {},
    {
      drawer,
      search,
      auth
    }, {}) => (
    isActive
      && ![
          drawer.isActive,
          search.isActive,
          auth.form
        ].some(_ => _)
    )
}

