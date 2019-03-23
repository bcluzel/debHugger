import {
  settings,
  settingsPrecised,
  getPrecise
} from '../assets/setup'

import camelCase from 'camelcase'
import pascalCase from 'pascal-case'

const settingsNames = [
  ...settings.map(_ => camelCase(_)),
  ...settings.map(_ => `${camelCase(_)}:disabled`)
]

const getPreciseSettings = (_, what) => getPrecise(settingsPrecised, _, what)

export const baseState =
  settings ? {
  ...(settingsNames
    .map(_ => ({
      key: _,
      value: null
    })).reduce((obj, item) => (obj[item.key] = item.value, obj), {}))
} : {}

export const state = () => (baseState)

export const mutations = settingsNames
  .map(_ => ({
    key: [`_set${pascalCase(_)}`],
    value: (state, value) => {
      state[_] = value
    }
  }))
  .reduce((obj, item) => (obj[item.key] = item.value, obj), {})

export const actions = settingsNames
  .map(_ => ({
    name: `set${pascalCase(_)}`,
    action: getPreciseSettings(_, 'action')
  }))
  .map(({ name, action }) => ({
    key: name,
    value: (action && action(`_set${name}`)) || (async ({ commit }, value) => {
      commit(`_${name}`, value)
      return value
    })
  }))
  .reduce((obj, item) => (obj[item.key] = item.value, obj), {})

export const getters = {

}
