<template lang="pug">
v-slide-x-reverse-transition(v-if="m_mounted")
  v-btn(
    v-bind="$attrs"
    @click="click"
    :flat="value"
    :icon="value"
    :color="value ? 'primary' : undefined")
    v-icon
      | remove
</template>

<script>
import {
  getMethods
} from '@/storeInterface/'
import mixinMounted from '@/mixins/mounted'

export default {
  mixins: [mixinMounted],
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    ...getMethods('snackbar', true),
    click () {
      this.snackbarSet({
        content: this.value ? 'Mode suppression désactivé' : 'Mode suppression activé',
        color: this.value ? undefined : 'primary',
        timeout: 1000
      })
      this.$emit('click')
    }
  }
}
</script>
