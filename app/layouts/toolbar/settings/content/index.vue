<template lang="pug">
  ContentBase
    ContentSetting(
      v-for="(setting, i) in $setup.settings"
      :key="i"
      :setting="setting")
    v-list-tile(
      v-if="a11d"
      ripple
      @click="click")
      v-list-tile-content
        | Se déconnecter
      v-list-tile-action
        v-icon
          | logout
</template>

<script>
import {
  getMethods,
  getState
} from '@/storeInterface/'
import ContentBase from './_base'
import ContentSetting from './_setting'

export default {
  components: {
    ContentBase,
    ContentSetting
  },
  computed: {
    ...getState('auth')
  },
  methods: {
    ...getMethods('auth'),
    click () {
      this.$emit('close')
      this.logout()
    }
  }
}
</script>
