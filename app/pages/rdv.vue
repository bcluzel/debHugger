<template lang="pug">
  LMain
    v-card(width="100%")
      v-card-title.justify-center
        h2.title Gathering points
      v-card-text
        self-location(v-model="location" label="Gathering points")
</template>

<script>
import mixinPage from '@/mixins/page'
import SelfLocation from '@/components/inputs/location'

export default {
  mixins: [mixinPage],
  description: 'Rendez-vous Page Description',
  components: {
    'self-location': SelfLocation
  },
  data: () => ({
    location: '',
  })
}
</script>
