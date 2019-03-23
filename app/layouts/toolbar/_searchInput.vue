<template lang="pug">
  v-text-field(
    v-if="$setup.search"
    v-model="model"
    ref="self"
    solo
    label="Rechercher"
    hide-details
    append-outer-icon="search"
    @click:append-outer="enter"
    @keypress.enter="enter"
    :disabled="disabled")
</template>

<script>
import {
  getState,
  getMethods
} from '@/storeInterface'

export default {
  props: {
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...getState('search'),
    model: {
      get () {
        return this.query
      },
      set (value) {
        this.setQuery(value)
      }
    }
  },
  watch: {
    isActive (value) {
      if (value && this.autofocus) {
        this.$refs.self.focus()
      }
    }
  },
  methods: {
    ...getMethods('search'),
    ...getMethods('overlay', true),
    enter () {
      this.overlaySetIsActive(false)
      this.$router.push(`/results?search_query=${this.model}`)
      this.$refs.self.blur()
    }
  }
}
</script>
