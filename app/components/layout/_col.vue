<template lang="pug">
  v-flex(v-bind="$attrs" data-debug="col")
    v-layout.ma-0(wrap)
      slot
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
