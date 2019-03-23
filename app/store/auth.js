import { api } from './connectivity'
import {
  title
} from '../assets/setup'
import { $localStorage, $safePromise } from '../plugins/ssr'

export const baseState = {
  token: null,
  user: null,

  form: null,
  email: '',
  password: ''
}

export const state = () => (baseState)

export const mutations = {
  setForm (state, value) {
    state.form = value
  },
  _setFormProp (state, { prop, value }) {
    const { form } = state
    state.form = {
      ...form,
      [prop]: value
    }
  },
  _setToken (state, value) {
    state.token = value
  },
  _setUser (state, value) {
    state.user = value
  }
}

export const actions = {
  logout ({ dispatch }) {
    return Promise.all([
      api.logout(),
      dispatch('_setToken', {
        accessToken: null
      })
    ])
  },
  verifyToken ({ dispatch }, accessToken) {
    return api.authenticate({
      strategy: 'jwt',
      accessToken
    }).then(async () => {
      await dispatch('_setToken', {
        accessToken,
        check: true
      })
    })
  },
  signin ({ state, commit, dispatch }) {
    const { form } = state
    const { email, password } = form
    commit('_setFormProp', {
      prop: 'loading',
      value: true
    })
    return api.authenticate({
      strategy: 'local',
      email,
      password
    }).then(({ accessToken }) => {
      form.callback()
      commit('setForm', null)
      dispatch('_setToken', {
        accessToken
      })
    }).catch(({ message }) => {
      commit('_setFormProp', {
        prop: 'loading',
        value: false
      })
      commit('_setFormProp', {
        prop: 'errorMessages',
        value: message
      })
    })
  },
  signup ({ state, commit, dispatch }) {
    const { form } = state
    const { email, password, passwordConfirm } = form
    if (passwordConfirm !== password) {
      commit('_setFormProp', {
        prop: 'errorMessages',
        value: `Les mots de passe sont différents`
      })
      return
    }
    commit('_setFormProp', {
      prop: 'loading',
      value: true
    })
    return api.service('users').create({
      email,
      password
    }).then(async () => {
      form.callback()
      await dispatch('signin')
      commit('setForm', null)
    }).catch(({ message }) => {
      commit('_setFormProp', {
        prop: 'loading',
        value: false
      })
      commit('_setFormProp', {
        prop: 'errorMessages',
        value: message
      })
    })
  },
  setFormField({ commit, dispatch }, { name, value }) {
    commit('_setFormProp', {
      prop: name,
      value: value
    })
    dispatch('_resetError')
  },
  _resetError ({ state, commit }) {
    const { form } = state
    if (form && form.errorMessages) {
      commit('_setFormProp', {
        prop: 'errorMessages',
        value: null
      })
    }
  },
  async _setToken ({ state, commit, dispatch }, {
    check, accessToken
  }) {
    $localStorage.set('token', accessToken)
    commit('_setToken', accessToken)
    if (accessToken) {
        const { userId } = await api.passport.verifyJWT(accessToken)
        const user = await api.service('users').get(userId)
        commit('_setUser', user)
      if (accessToken !== state.token && !check) {
        dispatch('snackbar/set', {
          content: `Connecté avec succès ${user.email}`,
          color: 'primary'
        }, {
            root: true
          })
      } else {
        dispatch('snackbar/set', {
          content: `Re ${user.email}`,
          timeout: 2000
        }, {
            root: true
          })
      }
    } else {
      commit('_setUser', null)
      dispatch('displaySnackbar')
    }
  },
  async displaySnackbar({ dispatch, commit }) {
    const snackbar = await dispatch('snackbar/set', {
      content: `${title}`,
      actions: {
        [`Se connecter`]: () => {
          commit('setForm', {
            name: 'signin',
            callback: snackbar.dismiss
          })
        },
        [`S'inscrire`]: () => {
          commit('setForm', {
            name: 'signup',
            callback: snackbar.dismiss
          })
        }
      }
    }, {
      root: true
    })
    return snackbar
  }
}

export const getters = {
  a11d: ({ token }, {},
    {
      connectivity
    }, {}) => (
      token && connectivity.hasConnexion
  )
}
