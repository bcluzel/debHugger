<template lang="pug">
  v-toolbar-items.hidden-sm-and-down
    v-btn(
      v-for="(name, i) in []"
      :key="i"
      :to="$setup.links[name]"
      flat
    ) {{ name }}
</template>
