<template lang="pug">
  v-menu(
    v-model="model"
    close-on-click
    :nudge-bottom="20"
    :close-on-content-click="false"
    offset-x
    offset-y
    fixed
    contentClass="bradius-tr")
    self-activator(slot="activator")
    self-content(
      @close="model = false"
    )
</template>

<script>
import SelfActivator from './activator/'
import SelfContent from './content/'

export default {
  components: {
    'self-activator': SelfActivator,
    'self-content': SelfContent
  },
  data: () => ({
    model: false
  })
}
</script>
