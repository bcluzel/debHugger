<template lang="pug">
  v-toolbar-side-icon.hidden-md-and-up(
    @click="setIsActive(true)")
</template>

<script>
import {
  mapMutations
} from 'vuex'

export default {
  methods: {
    ...mapMutations('drawer', [
      'setIsActive'
    ])
  }
}
</script>
