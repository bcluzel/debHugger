<template lang="pug">
  v-snackbar(
    v-model="model"
    bottom
    left
    fixed
    :timeout="0"
    :color="color"
    style="z-index: 3")
    | {{ content }}
    template(v-if="actions")
      v-layout(
        v-if="Object.keys(actions).length"
        justify-end)
        v-btn(
          v-for="(action, i) in Object.keys(actions)"
          :key="i"
          @click="call(actions[action])"
          dark
          flat)
          | {{ action }}
      v-progress-circular(
        v-else-if="Array.isArray(actions)"
        :size="24"
        :width="3"
        indeterminate)
      v-icon(
        dark
        v-else)
        | check
    v-progress-circular(
      v-else-if="timer"
      :size="24"
      :width="3"
      :value="value"
    ) {{ remainingSeconds }}
</template>

<script>
import {
  getMethods,
  getState
} from '@/storeInterface'

export default {
  data: () => ({
    interval: 0,
    remaining: 0,
    delay: 0
  }),
  computed: {
    ...getState('snackbar'),
    model: {
      get () {
        return this.canShow
      },
      set (value) {
        this.setIsActive(value)
      }
    },
    value () {
      return this.delay && (((this.delay - this.remaining) * 100) / this.delay)
    },
    remainingSeconds () {
      return Math.floor(this.remaining / 1000) + 1
    }
  },
  watch: {
    timer (value) {
      if (value) {
        this.delay = value.getDelay()
        this.remaining = value.getRemaining() - this.delayToSwitch
        this.refresh()
      }
    }
  },
  methods: {
    ...getMethods('snackbar'),
    call (callback) {
      this.$isFunction(callback) && callback()
    },
    refresh () {
      if (this.timer) {
        clearInterval(this.interval)
        var previous = this.timer.getStart()
        this.interval = setInterval(() => {
          const now = new Date()
          this.remaining -= now - previous
          previous = now
          if (this.remaining <= 0) {
            this.remaining = 0
            clearInterval(this.interval)
          }
        }, 200)
      }
    }
  }
}
</script>
