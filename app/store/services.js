import {
  $capitalize,
  $safePromise,
  $deferredCall,
  $dynamicSort
} from "@/plugins/ssr"
import { api } from './connectivity'
import {
  services,
  lag
} from '@/assets/setup'
import Vue from 'vue'
const $set = Vue.set
const $delete = Vue.delete

export const baseState = {
  last: null,
  lastItem: null,
  ...Object.keys(services.entities)
  .map(_ => ({
    keys: [
      `${_}Total`,
      `${_}IsFetching`,
      _,
      `${_}IsLoading`,
      `${_}-temp`
    ],
    values: [
      0,
      false,
      [],
      {},
      []
    ]
  }))
  .reduce((obj, _) => (_.keys.forEach((key, i) => {
    obj[key] = _.values[i]
  }), obj), {})
}

export const state = () => (baseState)

export const mutations = {
  setLast (state, value) {
    state.last = value
  },
  setLastItem (state, value) {
    state.lastItem = value
  },
  ...Object.keys(services.entities)
    .map(_ => ({
      _,
      capitalized: $capitalize(_)
    }))
    .map(({ _, capitalized }) => ({
      keys: [
        `_setTotal${capitalized}`,
        `_setIsFetching${capitalized}`,
        `_patch${capitalized}`,
        `_set${capitalized}`,
        `_add${capitalized}`,
        `_remove${capitalized}`,
        `_setIsLoading${capitalized}`,
        `_addTemp${capitalized}`,
        `_removeTemp${capitalized}`
      ],
      values: [
        (state, value) => {
          state[`${_}Total`] = value
        },
        (state, value) => {
          state[`${_}IsFetching`] = value
        },
        (state, { value, id }) => {
          const toPatch = state[_].find(({ _id }) => _id === id)
          if (toPatch && !Object.keys(value).every(v => toPatch[v] === value[v])) {
            Object.keys(value)
              .forEach(__ => {
                $set(toPatch, __, value[__])
              })
          }
        },
        (state, __) => {
          state[_] = __
          state[`${_}IsLoading`] = {}
          __.forEach(({ _id }) => {
            $set(state[`${_}IsLoading`], _id, 0)
          })
        },
        (state, __) => {
          if (!state[_].find(({ _id }) => _id === __._id)) {
            state[_].push(__)
            $set(state[`${_}IsLoading`], __._id, 0)
            const propId = Object.keys(services.entities[_]).find(prop => services.entities[_][prop].id)
            state[_].sort($dynamicSort(propId))
          }
        },
        (state, __) => {
          const item = state[_].find(({ _id }) => _id === __._id)
          if (item) {
            const index = state[_].indexOf(item)
            state[_].splice(index, 1)
          }
        },
        (state, { value, loading }) => {
          state[`${_}IsLoading`][value._id] = loading
            ? state[`${_}IsLoading`][value._id] + 1
            : state[`${_}IsLoading`][value._id] - 1
        },
        (state) => {
          const temp = state[`${_}-temp`]
          const _id = temp.length
            ? `new-${parseInt(temp[temp.length - 1].split('-')[1]) + 1}`
            : `new-${0}`
          temp.push(_id)
          $set(state[`${_}IsLoading`], _id, 0)
        },
        (state, value) => {
          const temp = state[`${_}-temp`]
          if (temp.includes(value)) {
            temp.splice(temp.indexOf(value), 1)
            $delete(state[`${_}IsLoading`], value)
          }
        }
      ]
    }))
    .reduce((obj, _) => (_.keys.forEach((key, i) => {
      obj[key] = _.values[i]
    }), obj), {})
}

export const actions = {
  ...Object.keys(services.entities)
    .map(_ => ({
      _,
      capitalized: $capitalize(_)
    }))
    .map(({ _, capitalized }) => ({
      functionNames: [
        `_cancelRemove${capitalized}`,
        `_addTemp${capitalized}`,
        `count${capitalized}`,
        `fetch${capitalized}`,
        `add${capitalized}`,
        `remove${capitalized}`,
        `add${capitalized}Array`,
        `remove${capitalized}Array`,
        `patch${capitalized}`
      ],
      functionCodes: [
        async ({ dispatch }, removed)  => {
          const { dismiss, patch } = await dispatch('snackbar/set', {
            content: 'Supprimé !',
            color: 'primary',
            timeout: 3000,
            actions: {
              'Annuler': async () => {
                await patch({
                  content: 'Annulation...',
                  actions: [],
                  color: undefined
                })
                const { doIt } = await dispatch(`add${capitalized}`, removed)
                await doIt()
                await patch({
                  content: 'Annulé !',
                  color: 'primary',
                  actions: {}
                })
                $deferredCall(dismiss, 1000)
              }
            }
          }, {
              root: true
            })
        },
        ({ commit, state }) => {
          commit(`_addTemp${capitalized}`)
          return state[`${_}-temp`][state[`${_}-temp`].length - 1]
        },
        async () => {
          const count = await $safePromise(api.service(_).find({
            query: {
              $limit: 0
            }
          }))
          return Promise.resolve(count.total)
        },
        async ({ commit, dispatch, state }, pagination) => {
          commit(`_setIsFetching${capitalized}`, true)
          const items = pagination === undefined
            || pagination.$limit === undefined
            || pagination.$skip === undefined
              ? await $safePromise(api.service(_).find({
              query: {
                $sort: {
                  [Object.keys(services.entities[_]).find(prop => services.entities[_][prop].id)]: 1
                }
              }
              })) : await $safePromise(api.service(_).find({
                query: {
                  ...pagination,
                  $sort: {
                    [Object.keys(services.entities[_]).find(prop => services.entities[_][prop].id)]: 1
                  }
                }
              }))

          commit(`_setIsFetching${capitalized}`, false)
          if (items) {
            if (Array.isArray(items)) {
              items.forEach(d => (
                commit(`_add${capitalized}`, d)
              ))
              commit(`_setTotal${capitalized}`, items.length)
              // throw new Error('no pagination from server')
            } else if (typeof items === 'object' && items.hasOwnProperty('data') && Array.isArray(items.data)) {
              items.data.forEach(d => (
                commit(`_add${capitalized}`, d)
              ))
              commit(`_setTotal${capitalized}`, items.total)
              if (items.data.length + items.skip < items.total
                && items.data.length < pagination.$limit) {
                  return Promise.resolve(dispatch(`fetch${capitalized}`, {
                    $limit: pagination.$limit - items.data.length,
                    $skip: state[_].length
                  }))
              } else {
                return Promise.resolve(items)
              }
            }
          }
        },
        async ({ commit, dispatch }, value) => {
          if (value && typeof value === 'object') {
            const _id = await dispatch(`_addTemp${capitalized}`)
            return {
              _id,
              async doIt () {
                commit(`_setIsLoading${capitalized}`, {
                  value: {
                    ...value,
                    _id
                  },
                  loading: true
                })
                const created = await $deferredCall(
                  async () => await $safePromise(api.service(_).create(value)),
                  lag || 0)
                commit(`_setIsLoading${capitalized}`, {
                  value: {
                    ...value,
                    _id
                  },
                  loading: false
                })
                commit(`_removeTemp${capitalized}`, _id)
                if (created && created.hasOwnProperty('_id')) {
                  commit(`_add${capitalized}`, created)
                  dispatch('snackbar/set', {
                    content: `Ajouté !`,
                    color: 'primary'
                  }, {
                    root: true
                  })
                }
                return Promise.resolve(created)
              }
            }
          }
        },
        async ({ commit, dispatch }, value) => {
          if (value && typeof value === 'object' && value.hasOwnProperty('_id')) {
            commit(`_setIsLoading${capitalized}`, {
              value,
              loading: true
            })
            const removed = await $deferredCall(
              async () => await $safePromise(api.service(_).remove(value._id))
              , lag || 0)
            if (removed && removed.hasOwnProperty('_id')) {
              commit(`_remove${capitalized}`, removed)
              commit(`_setIsLoading${capitalized}`, {
                value,
                loading: false
              })
              await dispatch(`_cancelRemove${capitalized}`, removed)
              return Promise.resolve(removed)
            }
          }
        },
        // addArray
        async ({ dispatch, commit }, values) => {
          if (values && Array.isArray(values) && values.every(value => typeof value === 'object')) {
            const _id = await dispatch(`_addTemp${capitalized}`)
            return {
              _id,
              async doIt () {
                commit(`_setIsLoading${capitalized}`, {
                  value: {
                    _id
                  },
                  loading: true
                })
                const created = await $deferredCall(
                  async () => await $safePromise(api.service(_).create(values)),
                  lag || 0)
                commit(`_setIsLoading${capitalized}`, {
                  value: {
                    _id
                  },
                  loading: false
                })
                commit(`_removeTemp${capitalized}`, _id)
                if (created && Array.isArray(created)) {
                  created.forEach(c => {
                    if (c.hasOwnProperty('_id')) {
                      commit(`_add${capitalized}`, c)
                    }
                  })
                  return Promise.resolve(created)
                }
              }
            }
          }
        },
        async ({ dispatch, commit }, values) => {
          if (values && Array.isArray(values) && values.every(value => typeof value === 'object' && value.hasOwnProperty('_id'))) {
            const removed = await $safePromise(api.service(_).remove(null, {
              query: {
                _id: {
                  $in: values.map(({_id }) => _id)
                }
              }
            }))
            if (removed && Array.isArray(removed)) {
              removed.forEach(r => {
                if (r.hasOwnProperty('_id')) {
                  commit(`_remove${capitalized}`, r)
                }
              })
              return Promise.resolve(removed)
            }
          }
        },
        // patch
        async ({ commit, rootState, state, dispatch }, { item, value, noSnack }) => {
          if (item
            && typeof item === 'object'
            && item.hasOwnProperty('_id')
            && value
            && typeof value === 'object') {
            if (Object.keys(value).every(_ => (
              item[_] === value[_]
            ))) {
              return Promise.resolve(true)
            }
            commit(`_setIsLoading${capitalized}`, {
              value: item,
              loading: true
            })
            const patched = await $deferredCall(
              async () => await $safePromise(api.service(_).patch(item._id, value)),
              lag || 0)
            commit(`_setIsLoading${capitalized}`, {
              value: item,
              loading: false
            })
            if (patched) {
              if (patched.hasOwnProperty('_id')) {
                if (!noSnack) {
                  dispatch('snackbar/set', ({
                    content: `Modifié !`,
                    color: 'primary'
                  }), {
                      root: true
                    })
                }
                commit(`_patch${capitalized}`, {
                  id: patched._id,
                  value
                })
                if (_ === 'users' && patched._id === rootState.auth.user._id) {
                  commit('auth/_setUser', state[_].find(({ _id }) => _id === patched._id), {
                    root: true
                  })
                }
              }
            }
            return Promise.resolve(patched)
          }
        }
      ]
    }))
    .reduce((obj, { functionNames, functionCodes }) => (functionNames.forEach((name, i) => {
      obj[name] = functionCodes[i]
    }), obj), {})
}

const calcPermission = (value, user) => {
  return value === true
    ? true
    : (typeof value === 'string' && value.startsWith('$'))
      ? value.substr(2)
      : false
}

export const getters = {
  ...Object.keys(services.entities)
    .map(_ => ({
      _,
      capitalized: $capitalize(_)
    }))
    .map(({ _, capitalized }) => ({
      functionNames: [
        `canCreate${capitalized}`,
        `canRead${capitalized}`,
        `canUpdate${capitalized}`,
        `canDelete${capitalized}`
      ],
      functionCodes: Array.from({ length: 4 }, (item, i) => {
        return ({ }, { },
          {
            auth,
          }, { }) => {
          if (auth.user && auth.user._role === 'owner') { return true }
          return calcPermission(Object.keys(services.permissions)
            .filter(permissionName => permissionName === _)
            .map(permissionName => services.permissions[permissionName])[0]['CRUD'[i]], auth.user)
        }
      })
    }))
    .reduce((obj, { functionNames, functionCodes }) => (functionNames.forEach((name, i) => {
      obj[name] = functionCodes[i]
    }), obj), {})
}
