<template lang="pug">
  LCol.pa-0(xs12 wrap)
    LRow.pa-0(align-center justify-center)
      v-textarea(
        v-bind="$attrs"
        :label="`${label} (aperçu)`"
        :value="$truncateText(valueText, 200)"
        auto-grow
        solo
        disabled
        hide-details)
    LRow.pa-0(align-center justify-center)
      self-flow-btn(
        v-model="model"
        v-bind="$attrs"
        :valueText.sync="valueText")
</template>

<script>
import SelfFlowBtn from '@/components/flow/btn'

export default {
  components: {
    'self-flow-btn': SelfFlowBtn
  },
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  data: () => ({
    editor: null,
    dialog: false,
    valueText: ''
  }),
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
