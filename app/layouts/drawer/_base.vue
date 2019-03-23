<template lang="pug">
  v-navigation-drawer.hidden-md-and-up(
    v-model="isActive"
    app
    disable-route-watcher
    disable-resize-watcher
    temporary
    :width="240")
    slot
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'

export default {
  computed: {
    ...mapState('drawer', {
      drawerActive: 'isActive'
    }),
    isActive: {
      get () {
        return this.drawerActive
      },
      set (value) {
        this.setIsActive(value)
      }
    }
  },
  methods: {
    ...mapMutations('drawer', [
      'setIsActive'
    ])
  }
}
</script>
