<template lang="pug">
  LMain
    LRow
      v-flex(xs12)
        v-card(max-width="100%")
          v-card-title.text-xs-center.d-block
            h2.headline La fin du monde est là !
            div.subtitle À vous de nous rejoindre,
              i Survivors.
          v-card-text
</template>

<script>
import mixinPage from '@/mixins/page'

export default {
  mixins: [mixinPage],
  description: 'Home Page Description'
}
</script>
