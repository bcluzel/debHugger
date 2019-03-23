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
          :value="computedDateFormatted"
          :label="label"
          readonly
          hide-details
          box)
    v-date-picker(
      v-model="model"
      no-title
      v-bind="$attrs"
      scrollable
      :first-day-of-week="1"
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

  data: vm => ({
    dateFormatted: vm.formatDate(vm.value.substr(0, 10)),
    dialog: false
  }),

  computed: {
    computedDateFormatted () {
      return this.formatDate(this.model)
    },
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },

  watch: {
    model (value) {
      this.dateFormatted = this.formatDate(value)
    }
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>
