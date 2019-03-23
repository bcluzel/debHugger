<template lang="pug">
  v-select(
    v-model="model"
    :items="labels"
    single-line
    box
    hide-details)
</template>

<script>
export default {
  props: {
    has: {
      type: Object,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({
    items: ''
  }),
  computed: {
    labels () {
      return Object.keys(this.has).map(_ => this.has[_].label)
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
    has: {
      immediate: true,
      handler (value) {
        this.model = this.labels[0]
      }
    }
  }
}
</script>
