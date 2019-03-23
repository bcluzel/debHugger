import Vue from 'vue'
import LRow from '@/components/layout/_row'
import LCol from '@/components/layout/_col'
import LMain from '@/components/layout/_main'
import ColorThief from 'color-thief-browser'

const $setup = require('../assets/setup')

export const $createHeader = ({ title, description, desktop }) => ({
  title: title ? `${title} — ${$setup.title}` : $setup.title,
  meta: [
    { hid: 'description', name: 'description', content: description },
    { charset: 'utf-8' },
    desktop
      ? {}
      : { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: $setup.logo },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
  ]
})

export const $isFunction = (callback) => (
  callback && {}.toString.call(callback) === '[object Function]'
)

export const $call = (callback) => (
  $isFunction(callback) ? callback() : undefined
)

export const $domCall = (callback) => (
  process.client ? $call(callback) : undefined
)

export const $refreshCache = () => {
  $domCall(() => {
    for (var i in localStorage) {
      localStorage.removeItem(i)
    }
    location.reload()
  })
}

export const $get = (obj, prop) => (
  obj && obj[prop]
)

export const $localStorage = {
  set: (key, value) => (
    $domCall(() =>
      localStorage.setItem(key, value)
    )
  ),
  get: (key) => (
    $domCall(() =>
      localStorage.getItem(key)
    )
  )
}

export const $bind = (obj, verb, events, callback) => {
  events.forEach(_ => {
    obj[verb](_, callback)
  })
}

export const $deferredCall = (callback, timeout) => (
  new Promise(resolve => setTimeout(() => {
    resolve(callback())
  }, timeout || 0))
)

export const $safePromise = (promise) => (
  promise.catch(_ => Promise.resolve({
    isError: true,
    content: _.message
  }))
)

export const $promiseAll = (promises) => (
  Promise.all(promises.map(_ => Promise.resolve(_)))
)

export const $capitalize = value => (
  [String(value)]
    .filter(_ => _ !== '')
    .map(_ => _[0].toUpperCase() + _.slice(1))[0]
)

export const $colorThief = new ColorThief()

const $getPosition = (element) => {
  var xPosition = 0
  var yPosition = 0
  while (element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft)
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop)
    element = element.offsetParent
  }
  return { x: xPosition, y: yPosition }
}

const $plurialize = (str, count) => (
  count ? str + 's' : str
)

export const $dynamicSort = (property) => {
  const sortOrder = property[0] === '-' ? -1 : 1
  if (property[0] === "-") {
    property = property.substr(1);
  }
  return (a, b) => (
    ((a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0) * sortOrder
  )
}

export const $truncateText = (input, length) => (
  input === undefined || input.trim() === ''
    ? ''
    : input.substr(0, length) + '...'
)

Vue.component('LRow', LRow)
Vue.component('LCol', LCol)
Vue.component('LMain', LMain)

Vue.filter('arrayToObject', array => (
  array.map(name => ({ name }))
))
Vue.filter('prevail', arg => (
  arg === undefined ? true : arg
))
Vue.filter('capitalize', value => (
  $capitalize(value)
))
Vue.filter('rgb', value => (
  `rgb(${value.join(',')})`
))
Vue.filter('image', value => (
  value && value.startsWith('data:image/') ? value : `${$setup.appUrl}${value}`
))

Vue.use({
  install: (Vue) => {
    Object.assign(Vue.prototype, {
      $setup,
      $createHeader,
      $isFunction,
      $domCall,
      $call,
      $localStorage,
      $refreshCache,
      $get,
      $bind,
      $deferredCall,
      $safePromise,
      $promiseAll,
      $capitalize,
      $getPosition,
      $colorThief,
      $plurialize,
      $dynamicSort,
      $truncateText
    })
  }
})
