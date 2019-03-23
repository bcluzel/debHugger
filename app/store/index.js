import { api } from './connectivity'
import {
  $bind,
  $deferredCall,
  $capitalize
} from '../plugins/ssr'
import {
  services
} from '@/assets/setup'
const { entities } = services

const { io } = api

const bindConnectivityEvents = ({ dispatch }) => {
  io.on('connect', async () => {
    await $deferredCall(() => dispatch('connectivity/set', true), 300)
  })
  $bind(io, 'on', [
    'disconnect',
    'connect_error'
  ], async () => {
    await $deferredCall(() => dispatch('connectivity/set', false), 300)
  })
}

const bindRealtimeEvents = ({ commit }) => {
  Object.keys(entities)
    .filter(_ => !_.startsWith('_'))
    .map(_ => ({ _, capitalized: $capitalize(_) }))
    .forEach(({ capitalized, _ }) => {
      api.service(_).on('created', data => {
        commit(`services/_add${capitalized}`, data)
      })
      api.service(_).on('removed', data => {
        commit(`services/_remove${capitalized}`, data)
      })
      api.service(_).on('patched', data => {
        commit(`services/_patch${capitalized}`, data)
      })
    })
}

const pluginConnectivity = (store) => {
  //bindConnectivityEvents(store)
  //bindRealtimeEvents(store)
}

export const plugins = [
  pluginConnectivity
]
