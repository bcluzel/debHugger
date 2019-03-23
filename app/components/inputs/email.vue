<template lang="pug">
  v-text-field(
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    :label="label"
    :suffix="correctAddress || badAddress ? undefined : suffix"
    box
    persistent-hint
    hint="Domaine valide"
    :hide-details="!(correctAddress || badAddress)"
    :error-messages="badAddress ? 'Domaine invalide' : undefined")
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    correctAddress () {
      return this.value.endsWith(this.suffix)
    },
    badAddress () {
      return this.value.includes('@') && !this.correctAddress
    },
    suffix () {
      return `@enseirb-matmeca.fr`
    }
  }
}
</script>
