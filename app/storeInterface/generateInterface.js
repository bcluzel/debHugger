const {
  readdirSync,
  writeFileSync
} = require('fs')

const files = readdirSync('../store')
  .filter(_ => _.endsWith('.js'))
  .map(_ => _.split('.js')[0])
  .filter(_ => _ !== 'index')

writeFileSync('index.js', `import pascalCase from 'pascal-case'
import vuex from 'vuex'

${files.map(_ => `import * as ${_} from '@/store/${_}'`).join('\n')}

const modules = {
  state: {
${files.map(_ => `    ${_}: ${_}.baseState`).join(',\n')}
  },
  mutations: {
${files.map(_ => `    ${_}: ${_}.mutations`).join(',\n')}
  },
  actions: {
${files.map(_ => `    ${_}: ${_}.actions`).join(',\n')}
  },
  gettersMethods: {
${files.map(_ => `    ${_}: Object.keys(${_}.getters)
      .filter(_ => ${_}.getters[_].length !== 4)
      .reduce((obj, _) => (obj[_] = ${_}.getters[_], obj), {})`).join(',\n')}
  },
  gettersComputed: {
${files.map(_ => `    ${_}: Object.keys(${_}.getters)
      .filter(_ => ${_}.getters[_].length === 4)
      .reduce((obj, _) => (obj[_] = ${_}.getters[_], obj), {})`).join(',\n')}
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

`)