import pascalCase from 'pascal-case'
import vuex from 'vuex'

import * as auth from '@/store/auth'
import * as connectivity from '@/store/connectivity'
import * as drawer from '@/store/drawer'
import * as illicourse from '@/store/illicourse'
import * as nav from '@/store/nav'
import * as overlay from '@/store/overlay'
import * as scroll from '@/store/scroll'
import * as search from '@/store/search'
import * as services from '@/store/services'
import * as settings from '@/store/settings'
import * as snackbar from '@/store/snackbar'

const modules = {
  state: {
    auth: auth.baseState,
    connectivity: connectivity.baseState,
    drawer: drawer.baseState,
    illicourse: illicourse.baseState,
    nav: nav.baseState,
    overlay: overlay.baseState,
    scroll: scroll.baseState,
    search: search.baseState,
    services: services.baseState,
    settings: settings.baseState,
    snackbar: snackbar.baseState
  },
  mutations: {
    auth: auth.mutations,
    connectivity: connectivity.mutations,
    drawer: drawer.mutations,
    illicourse: illicourse.mutations,
    nav: nav.mutations,
    overlay: overlay.mutations,
    scroll: scroll.mutations,
    search: search.mutations,
    services: services.mutations,
    settings: settings.mutations,
    snackbar: snackbar.mutations
  },
  actions: {
    auth: auth.actions,
    connectivity: connectivity.actions,
    drawer: drawer.actions,
    illicourse: illicourse.actions,
    nav: nav.actions,
    overlay: overlay.actions,
    scroll: scroll.actions,
    search: search.actions,
    services: services.actions,
    settings: settings.actions,
    snackbar: snackbar.actions
  },
  gettersMethods: {
    auth: Object.keys(auth.getters)
      .filter(_ => auth.getters[_].length !== 4)
      .reduce((obj, _) => (obj[_] = auth.getters[_], obj), {}),
    connectivity: Object.keys(connectivity.getters)
      .filter(_ => connectivity.getters[_].length !== 4)
      .reduce((obj, _) => (obj[_] = connectivity.getters[_], obj), {}),
    drawer: Object.keys(drawer.getters)
      .filter(_ => drawer.getters[_].length !== 4)
      .reduce((obj, _) => (obj[_] = drawer.getters[_], obj), {}),
    illicourse: Object.keys(illicourse.getters)
      .filter(_ => illicourse.getters[_].length !== 4)
      .reduce((obj, _) => (obj[_] = illicourse.getters[_], obj), {}),
    nav: Object.keys(nav.getters)
      .filter(_ => nav.getters[_].length !== 4)
      .reduce((obj, _) => (obj[_] = nav.getters[_], obj), {}),
    overlay: Object.keys(overlay.getters)
      .filter(_ => overlay.getters[_].length !== 4)
      .reduce((obj, _) => (obj[_] = overlay.getters[_], obj), {}),
    scroll: Object.keys(scroll.getters)
      .filter(_ => scroll.getters[_].length !== 4)
      .reduce((obj, _) => (obj[_] = scroll.getters[_], obj), {}),
    search: Object.keys(search.getters)
      .filter(_ => search.getters[_].length !== 4)
      .reduce((obj, _) => (obj[_] = search.getters[_], obj), {}),
    services: Object.keys(services.getters)
      .filter(_ => services.getters[_].length !== 4)
      .reduce((obj, _) => (obj[_] = services.getters[_], obj), {}),
    settings: Object.keys(settings.getters)
      .filter(_ => settings.getters[_].length !== 4)
      .reduce((obj, _) => (obj[_] = settings.getters[_], obj), {}),
    snackbar: Object.keys(snackbar.getters)
      .filter(_ => snackbar.getters[_].length !== 4)
      .reduce((obj, _) => (obj[_] = snackbar.getters[_], obj), {})
  },
  gettersComputed: {
    auth: Object.keys(auth.getters)
      .filter(_ => auth.getters[_].length === 4)
      .reduce((obj, _) => (obj[_] = auth.getters[_], obj), {}),
    connectivity: Object.keys(connectivity.getters)
      .filter(_ => connectivity.getters[_].length === 4)
      .reduce((obj, _) => (obj[_] = connectivity.getters[_], obj), {}),
    drawer: Object.keys(drawer.getters)
      .filter(_ => drawer.getters[_].length === 4)
      .reduce((obj, _) => (obj[_] = drawer.getters[_], obj), {}),
    illicourse: Object.keys(illicourse.getters)
      .filter(_ => illicourse.getters[_].length === 4)
      .reduce((obj, _) => (obj[_] = illicourse.getters[_], obj), {}),
    nav: Object.keys(nav.getters)
      .filter(_ => nav.getters[_].length === 4)
      .reduce((obj, _) => (obj[_] = nav.getters[_], obj), {}),
    overlay: Object.keys(overlay.getters)
      .filter(_ => overlay.getters[_].length === 4)
      .reduce((obj, _) => (obj[_] = overlay.getters[_], obj), {}),
    scroll: Object.keys(scroll.getters)
      .filter(_ => scroll.getters[_].length === 4)
      .reduce((obj, _) => (obj[_] = scroll.getters[_], obj), {}),
    search: Object.keys(search.getters)
      .filter(_ => search.getters[_].length === 4)
      .reduce((obj, _) => (obj[_] = search.getters[_], obj), {}),
    services: Object.keys(services.getters)
      .filter(_ => services.getters[_].length === 4)
      .reduce((obj, _) => (obj[_] = services.getters[_], obj), {}),
    settings: Object.keys(settings.getters)
      .filter(_ => settings.getters[_].length === 4)
      .reduce((obj, _) => (obj[_] = settings.getters[_], obj), {}),
    snackbar: Object.keys(snackbar.getters)
      .filter(_ => snackbar.getters[_].length === 4)
      .reduce((obj, _) => (obj[_] = snackbar.getters[_], obj), {})
  }
}
const _get = (what, module, prefix) => {
  const vuexWhat = what.startsWith('getters') ? 'getters' : what
  return vuex['map' + pascalCase(vuexWhat)](module, modules[what].hasOwnProperty(module)
    ? prefix
      ? Object.keys(modules[what][module])
        .filter(_ => !_.startsWith('_'))
        .map(_ => ({
          key: module + pascalCase(_),
          value: _
        }))
        .reduce((obj, item) => (obj[item.key] = item.value, obj), {})
      : Object.keys(modules[what][module])
        .filter(_ => !_.startsWith('_'))
    : [])
}

const _getMethods = (module, prefix) => ({
  ..._get('actions', module, prefix),
  ..._get('mutations', module, prefix),
  ..._get('gettersMethods', module, prefix)
})

const _getState = (module, prefix) => ({
  ..._get('state', module, prefix),
  ..._get('gettersComputed', module, prefix)
})

export const getMethods = (modules, prefix) => {
  if (Array.isArray(modules)) {
    return modules.reduce((obj, _) => ({
      ...obj,
      ..._getMethods(_, prefix)
    }), {})
  } else {
    return _getMethods(modules, prefix)
  }
}

export const getState = (modules, prefix) => {
  if (Array.isArray(modules)) {
    return modules.reduce((obj, _) => ({
      ...obj,
      ..._getState(_, prefix)
    }), {})
  } else {
    return _getState(modules, prefix)
  }
}

