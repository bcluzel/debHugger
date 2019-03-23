<template lang="pug">
  v-dialog(
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    :disabled="$attrs.readonly")
    template(
      v-slot:activator="{ on }")
      v-btn(
        v-on="on"
        flat)
        | Flow
        v-icon(right)
          | waves
    self-flow(
      @keypress.native.esc="quit"
      v-model="model"
      :valueText="valueText"
      @close="dialog = false"
      @save="save"
      @update:valueText="$emit('update:valueText', $event)")
</template>

<script>
import SelfFlow from './'

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    valueText: {
      type: String,
      required: true
    }
  },
  components: {
    'self-flow': SelfFlow
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
      }
    }
  },
  methods: {
    save (value) {
      this.$emit('input', value)
      this.dialog = false
    },
    quit (){
      console.log('quit')
    }
  }
}
</script>
