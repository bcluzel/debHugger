<template lang="pug">
  v-btn(
    @click="remove"
    :loading="loading"
    :flat="loading"
  ) Supprimer
</template>

<script>
import {
  getMethods,
  getState
} from '@/storeInterface/'

export default {
  props: {
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
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...getState('services')
  },
  methods: {
    ...getMethods('services'),
    ...getMethods('snackbar', true),
    async remove () {
      if (!this.loading) {
        const removed = await this[`remove${this.$capitalize(this.entityName)}`](this.item)
        this.$emit('remove')
      }
    }
  }
}
</script>
