<template lang="pug">
  v-app(:dark="themeDark")
    AppNav.hidden-md-and-up
    AppOverlay
    AppDrawer
    AppToolbar
    v-content
      AppAuth
      nuxt
    AppSnackbar
    AppFooter
</template>

<script>
import AppDrawer from './drawer/'
import AppToolbar from './toolbar/'
import AppOverlay from './_overlay'
import AppSnackbar from './_snackbar'
import AppFooter from './_footer'
import AppAuth from '~/components/auth'
import AppNav from './_nav'

import {
  getState,
  getMethods
} from '@/storeInterface'

import * as settings from '@/store/settings'

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppOverlay,
    AppSnackbar,
    AppAuth,
    AppFooter,
    AppNav
  },

  computed: {
    ...getState(['auth', 'settings']),
  },

  async mounted () {
    this.$domCall(() => {
      addEventListener('scroll', () => {
        this.setTop(this.$getOffsetTop())
      })
    })
  },

  methods: {
    ...getMethods(['auth', 'scroll']),
    ...getMethods(['snackbar', 'auth'], true),
  }
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
}
.bradius-a {
  border-radius: 22px !important;
}
.croppa-container canvas {
  border-radius: 100%;
}
.v-snack__wrapper {
}
.bradius-tr {
  border-bottom-left-radius: 22px !important;
  border-bottom-right-radius: 22px !important;
  border-top-left-radius: 22px !important;
}
.v-navigation-drawer {
  z-index: 1001 !important;
}
</style>
