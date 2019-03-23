<template lang="pug">
  v-list
    v-list-tile(
      v-for="(name, i) in instructions"
      :key="i")
      v-list-tile-action(
        v-if="i === active")
        v-icon arrow_right_alt
      v-list-tile-action(v-else)
      v-list-tile-content
        v-list-tile-title
          | {{ name }}
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
  data: () => ({
    instructions: [
      'a = 0',
      'a++',
      'b = a + 4'
    ]
  }),
  computed: {
    ...getState('debhugger')
  }
}
</script>
