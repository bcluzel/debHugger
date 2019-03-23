import feathers from '@feathersjs/client'
import io from 'socket.io-client'
import { $localStorage } from '../plugins/ssr'
import { apiUrl, auth } from '@/assets/setup'

export const api = {} /*feathers()
  .configure(feathers.socketio(io(apiUrl)))
  .configure(feathers.authentication())*/

export const baseState = {
  hasConnexion: null,

  snackbar: null
}

export const state = () => (baseState)

export const mutations = {
  _set(state, value) {
    state.hasConnexion = value
  },
  _setSnackbar (state, value) {
    state.snackbar = value
  }
}

export const actions = {
  async set({ state, commit, dispatch }, value) {
    if (state.hasConnexion !== value) {
      commit('_set', value)
      if (state.snackbar) {
        await state.snackbar.dismiss()
      }
      await dispatch(value ? '_tryAuth' : '_handleNoConnexion')
    }
  },
  async _tryAuth ({ dispatch, commit }) {
    if (auth) {
      dispatch('auth/verifyToken', $localStorage.get('token'), {
        root: true
      }).catch(async () => {
        commit('_setSnackbar', await dispatch('auth/displaySnackbar', {}, {
          root: true
        }))
      })
    }
  },
  _handleNoConnexion ({ dispatch, commit }) {
    [
      'search/setIsActive',
      'overlay/setIsActive',
      '!auth/setForm'
    ].map(_ => (_.startsWith('!')
      ? {
        name: _.substr(1),
        value: null
      } : {
        name: _,
        value: false
      }
    )).forEach(({ name, value }) => {
      commit(name, value, {
        root: true
      })
    })
    dispatch('_displayNoConnexion')
  },
  async _displayNoConnexion ({ dispatch, commit }) {
    commit('_setSnackbar', await dispatch('snackbar/set', {
      content: `Tentative de connexion...`,
      actions: []
    }, {
      root: true
    }))
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
