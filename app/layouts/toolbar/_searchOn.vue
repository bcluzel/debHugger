<template lang="pug">
  v-btn.ma-2(
    v-if="$setup.search"
    icon
    large
    @click="click"
    :disabled="disabled")
    v-icon
      | search
</template>

<script>
import {
  getState,
  getMethods
} from '@/storeInterface'

export default {
  computed: {
    ...getState('search')
  },
  methods: {
    ...getMethods('search'),
    ...getMethods('overlay', true),
    click () {
      this.setIsActive(true)
      this.overlaySetIsActive(true)
      this.overlaySetCallbacks([() => {
        this.setIsActive(false)
        this.overlaySetIsActive(false)
      }])
    }
  }
}
</script>
