<template lang="pug">
  v-bottom-nav(
    v-if="isActive"
    app
    :value="canShow")
    v-btn(
      v-for="(link, i) in Object.keys($setup.links)"
      :key="i"
      color="primary"
      flat
      :value="i"
      :to="$setup.links[link]")
      span {{ link }}
      v-icon {{ $setup.linksIcon[link] }}
</template>

<script>
import {
  getState,
  getMethods
} from '@/storeInterface/'

export default {
  computed: {
    ...getState('nav')
  },
  methods: {
    ...getMethods('nav')
  },
  watch: {
    '$vuetify.breakpoint.smAndDown': {
      immediate: true,
      handler (value) {
        this.setIsActive(value)
      }
    }
  }
}
</script>
