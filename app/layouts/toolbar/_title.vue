<template lang="pug">
  v-toolbar-title.ml-0
    span.hidden-sm-and-down
      | {{ $setup.title }}
    span.hidden-md-and-up(style="text-transform: capitalize")
      | {{ $route.name === 'index'
      |  ? $setup.title
      |  : Object.keys($setup.links).find(_ => $route.path.toLowerCase() === $setup.links[_]) || $setup.title }}
</template>
