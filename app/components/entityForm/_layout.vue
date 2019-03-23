<template lang="pug">
  LCol(v-bind="$attrs")
    LRow(
      align-center
      wrap)
      LCol(xs12 sm7)
        LRow(
          align-center
          justify-center)
          slot(name="remove-btn")
          slot(name="select")
          slot(name="add-btn")
        slot(name="current")
      slot(name="form")
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
