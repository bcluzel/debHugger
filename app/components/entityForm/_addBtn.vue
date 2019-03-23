<template lang="pug">
v-slide-x-transition(v-if="m_mounted")
  v-btn(
    @click="click"
    :flat="isCreating"
    :icon="isCreating"
    :color="color"
    v-bind="$attrs")
    v-icon
      | add
</template>

<script>
import {
  getMethods
} from '@/storeInterface/'
import mixinMounted from '@/mixins/mounted'

export default {
  mixins: [mixinMounted],
  props: {
    isCreating: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    color () {
      return this.isCreating
        ? 'primary'
        : undefined
    }
  },
  methods: {
    ...getMethods('snackbar', true),
    click () {
      this.snackbarSet({
        content: this.isCreating ? 'Mode ajout désactivé' : 'Mode ajout activé',
        color: this.isCreating ? undefined : 'primary',
        timeout: 1000
      })
      this.$emit('click')
    }
  }
}
</script>
