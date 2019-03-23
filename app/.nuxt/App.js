import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import _6926e604 from '../layouts/_footer.vue'
import _2d20795a from '../layouts/_nav.vue'
import _b99bbdf2 from '../layouts/_overlay.vue'
import _9884b9a4 from '../layouts/_snackbar.vue'
import _6f6c098b from '../layouts/default.vue'
import _73ef9008 from '../layouts/drawer/_base.vue'
import _73f439d5 from '../layouts/drawer/_list.vue'
import _7481f92a from '../layouts/drawer/index.vue'
import _63e55be6 from '../layouts/toolbar/_base.vue'
import _1931354b from '../layouts/toolbar/_items.vue'
import _63ea1ac0 from '../layouts/toolbar/_logo.vue'
import _786b044d from '../layouts/toolbar/_searchInput.vue'
import _d7b72f88 from '../layouts/toolbar/_searchOn.vue'
import _6c18cd05 from '../layouts/toolbar/_sideIcon.vue'
import _63ed8893 from '../layouts/toolbar/_tabs.vue'
import _19c76fe3 from '../layouts/toolbar/_title.vue'
import _6477c508 from '../layouts/toolbar/index.vue'
import _64114376 from '../layouts/toolbar/settings/activator/index.vue'
import _60449838 from '../layouts/toolbar/settings/content/_base.vue'
import _58a1af89 from '../layouts/toolbar/settings/content/_setting.vue'
import _60d7015a from '../layouts/toolbar/settings/content/index.vue'
import _72c0f720 from '../layouts/toolbar/settings/index.vue'

const layouts = { "__footer": _6926e604,"__nav": _2d20795a,"__overlay": _b99bbdf2,"__snackbar": _9884b9a4,"_default": _6f6c098b,"_drawer/_base": _73ef9008,"_drawer/_list": _73f439d5,"_drawer/index": _7481f92a,"_toolbar/_base": _63e55be6,"_toolbar/_items": _1931354b,"_toolbar/_logo": _63ea1ac0,"_toolbar/_searchInput": _786b044d,"_toolbar/_searchOn": _d7b72f88,"_toolbar/_sideIcon": _6c18cd05,"_toolbar/_tabs": _63ed8893,"_toolbar/_title": _19c76fe3,"_toolbar/index": _6477c508,"_toolbar/settings/activator/index": _64114376,"_toolbar/settings/content/_base": _60449838,"_toolbar/settings/content/_setting": _58a1af89,"_toolbar/settings/content/index": _60d7015a,"_toolbar/settings/index": _72c0f720 }

export default {
  head: {"meta":[],"link":[],"style":[],"script":[]},

  render(h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if(layout && typeof layout !== 'string') throw new Error('[nuxt] Avoid using non-string value as layout property.')

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
