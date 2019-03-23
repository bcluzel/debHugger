<template lang="pug">
  LCol(xs12 sm6)
    v-select(
      :value="entityName"
      @input="onInput"
      label="Type"
      :items="items"
      hide-details
      outline)
</template>

<script>
import {
  getMethods
} from '@/storeInterface/'

export default {
  props: {
    entityName: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...getMethods('services'),
    onInput ($event) {
      this.setLast($event)
      this.$emit('update:entityName', $event)
    }
  }
}
</script>
