<template lang="pug">
  LCol(v-bind="$attrs")
    LRow(
      align-center
      wrap)
      LCol(xs12 sm7)
        LRow(
          align-center
          justify-center)
          slot(name="select")
        slot(name="current")
      slot(name="relations")
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
