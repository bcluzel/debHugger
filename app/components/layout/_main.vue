<template lang="pug">
  v-container(
    style="word-break: break-word;"
    v-bind="{ [`grid-list-${ size }`]: true }")
    v-layout(wrap)
      slot
</template>

<script>
export default {
  data: () => ({
    size: ''
  }),
  mounted () {
    this.size = this.$vuetify.breakpoint.name
  }
}
</script>
