<template lang="pug">
  v-btn.justify-end(
    icon
    :flat="loading"
    :loading="loading"
    :color="item._id === $get(currentItem, '_id') ? 'primary' : undefined"
    @click="changeTo(item)")
    v-icon linear_scale
    template(v-slot:loader)
      v-progress-linear(
        indeterminate
        :height="3"
        style="width: 18px")
</template>

<script>
import {
  getState,
  getMethods
} from '@/storeInterface/'

export default {
  props: {
    currentItem: {
      type: Object,
      default: null
    },
    item: {
      type: Object,
      required: true,
      validator: (value) => (
        value.hasOwnProperty('_id')
      )
    },
    entityName: {
      type: String,
      required: true
    }
  },
  computed: {
    ...getState('services'),
    loading () {
      return !!this[`${this.entityName}IsLoading`][this.item._id]
    }
  },
  methods: {
    ...getMethods('services'),
    ...getMethods('snackbar', true),
    changeTo (item) {
      if (!this.loading) {
        this.$emit('update:currentItem', item._id === this.$get(this.currentItem, '_id')
          ? null
          : item)
      }
    }
  }
}
</script>
