<template lang="pug">
  v-navigation-drawer(
    v-model="isActive"
    app
    :width="240"
    clipped)
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
