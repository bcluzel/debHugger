<template lang="pug">
  v-list
    template(
      v-for="(name, i) in instructions")
      v-list-tile(
        v-if="typeof name === 'string'"
        :key="i")
        v-list-tile-action(
          v-if="i === active")
          v-icon arrow_right_alt
        v-list-tile-action(v-else)
        v-list-tile-content
          v-list-tile-title
            | {{ name }}
      v-list-group(
        v-else
        :value="i === active")
        template(v-slot:activator)
          v-list-tile
            v-list-tile-action
            v-list-tile-content
              v-list-tile-title {{ name.name }}
        v-list-tile(
          v-for="(n, j) in name.instructions"
          :key="j")
          v-list-tile-action(
            v-if="j === name.active")
            v-icon arrow_right_alt
          v-list-tile-action(v-else)
          v-list-tile-content
            v-list-tile-title {{ n }}
</template>

<script>
import {
  getState
} from '@/storeInterface'
import {
  mapMutations
} from 'vuex'

export default {
  methods: {
    ...mapMutations('drawer', [
      'setIsActive'
    ])
  },
  computed: {
    ...getState('debhugger')
  },
  mounted () {
    console.log(this.instructions)
  }
}
</script>
