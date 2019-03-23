<template lang="pug">
  v-flex(xs12 data-debug="row")
    v-layout.ma-0(
      v-bind="$attrs")
      slot
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
