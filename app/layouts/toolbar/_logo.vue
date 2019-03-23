<template lang="pug">
  v-toolbar-side-icon(
    to="/"
    activeClass=""
    @click="click"
    :ripple="false"
    style="width: 28px; height: 28px;")
    v-img(
      style="border-radius: 100%"
      :src="$setup.logo")
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex'

export default {
  computed: {
    ...mapState('search', {
      searchIsActive: 'isActive'
    })
  },
  methods: {
    ...mapMutations('search', {
      searchSetActive: 'setIsActive',
      searchSetQuery: 'setQuery'
    }),
    ...mapMutations('overlay', {
      overlaySetActive: 'setIsActive'
    }),
    click () {
      this.$vuetify.goTo(0)
      this.searchSetActive(false)
      this.searchSetQuery('')
      this.overlaySetActive(false)
    }
  }
}
</script>
