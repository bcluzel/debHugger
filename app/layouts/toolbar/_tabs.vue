<template lang="pug">
  v-tabs(
    v-model="tab"
    fixed-tabs)
    v-tabs-slider(color="primary")
    v-tab(
      v-for="(name, i) in Object.keys($setup.links)"
      :key="i"
      :to="$setup.links[name]")
      v-icon
        | {{ $setup.linksIcon[name] }}
</template>

<script>
export default {
  data: () => ({
    tab: 0
  })
}
</script>
