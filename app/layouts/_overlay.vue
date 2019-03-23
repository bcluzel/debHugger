<template lang="pug">
  div.overlay(
    v-if="isActive"
    @click="click")
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  computed: {
    ...mapState('overlay', [
      'isActive',
      'callbacks'
    ])
  },
  methods: {
    click () {
      this.callbacks.forEach(_ => this.$isFunction(_) && _())
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: hsla(0, 0, 6.7%, .8);
  z-index: 4;
  cursor: pointer;
}
</style>
