<template lang="pug">
  v-toolbar-items.hidden-sm-and-down
    v-btn(
      v-for="(name, i) in Object.keys($setup.links)"
      :key="i"
      :to="$setup.links[name]"
      flat
    ) {{ name }}
</template>
