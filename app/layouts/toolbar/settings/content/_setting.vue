<template lang="pug">
  v-list-tile(
    ripple
    @click="model = !model"
    :disabled="disabled")
    v-list-tile-action
      v-switch(
        v-model="model"
        hide-details
        readonly
        :loading="loading")
    v-list-tile-content
      | {{ setting }}
</template>

<script>
import pascalCase from 'pascal-case'
import camelCase from 'camelcase'

export default {
  props: {
    setting: {
      type: String,
      required: true
    }
  },
  data: () => ({
    changing: false
  }),
  computed: {
    camelCaseSetting () {
      return camelCase(this.setting)
    },
    pascalCaseSetting () {
      return pascalCase(this.setting)
    },
    model: {
      get () {
        return this.$store.state.settings[this.camelCaseSetting]
      },
      async set (request) {
        this.changing = true
        const value = await this.$store.dispatch(`settings/set${this.pascalCaseSetting}`, request)
        this.$localStorage.set(this.camelCaseSetting, value)
        this.changing = false
      }
    },
    disabled: {
      get () {
        return this.$store.state.settings[`${this.camelCaseSetting}:disabled`] || this.loading
      },
      set (value) {
        this.$store.dispatch(`settings/set${this.pascalCaseSetting}:disabled`, value)
      }
    },
    loading () {
      return this.$store.state.settings[this.camelCaseSetting] === null || this.changing
    }
  },
  created () {
    const {
      getPrecise,
      settingsPrecised
    } = this.$setup
    const defaultValue = getPrecise(settingsPrecised, this.camelCaseSetting, 'default')
    const storedValue = this.$localStorage.get(this.camelCaseSetting)
    if (storedValue) {
      this.model = JSON.parse(storedValue)
    } else if (defaultValue) {
      this.model = defaultValue
    } else {
      this.model = false
    }
    const callback = getPrecise(settingsPrecised, this.camelCaseSetting, 'created')
    if (this.$isFunction(callback)) {
      callback(this)
    }
  }
}
</script>
