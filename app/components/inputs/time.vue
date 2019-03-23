<template lang="pug">
  v-dialog(
    ref="dialog"
    v-model="dialog"
    :return-value.sync="model"
    lazy
    full-width
    :width="290"
    :disabled="$attrs.readonly")
    template(v-slot:activator="{ on }")
      div(
        v-on="on"
        style="width: 100%")
        v-text-field(
          v-bind="$attrs"
          :value="model"
          :label="label"
          readonly
          hide-details
          box)
    v-time-picker(
      v-model="model"
      v-bind="$attrs"
      scrollable
      format="24hr"
      locale="fr")
      v-spacer
      v-btn(
        flat
        @click="dialog = false")
        | Annuler
      v-btn(
        flat
        @click="$refs.dialog.save(model)"
        color="primary")
        | Choisir
</template>

<script>
export default {
  inheritAttrs: false,

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
    dialog: false
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
