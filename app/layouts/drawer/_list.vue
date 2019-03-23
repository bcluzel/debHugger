<template lang="pug">
  v-list
    v-list-tile(
      v-for="(name, i) in Object.keys($setup.links)"
      :key="i"
      :to="$setup.links[name]"
      @click="setIsActive(false)")
      v-list-tile-content
        v-list-tile-title
          | {{ name }}
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
