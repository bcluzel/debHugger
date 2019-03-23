<template lang="pug">
  v-toolbar(
    app
    :flat="isFlat"
    style="z-index: 5")
    slot
    template(
      v-if="tabs"
      v-slot:extension)
      slot(name="tabs")
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  data: () => ({
    tabs: false
  }),
  computed: {
    ...mapState('scroll', [
      'top'
    ]),
    isFlat () {
      return this.top === 0
    }
  },
  watch: {
    '$vuetify.breakpoint.smAndDown' (value) {
      this.tabs = value
    }
  },
  mounted () {
    this.tabs = this.$vuetify.breakpoint.smAndDown
  }
}
</script>
