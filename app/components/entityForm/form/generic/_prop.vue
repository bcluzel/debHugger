<template lang="pug">
  v-text-field(
    v-if="prop.type === 'string'"
    v-model="model"
    chips
    multiple
    box
    :label="label"
    rows-per-page-text="Lignes par page"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    :spellcheck="false"
    :disabled="disabled"
    :hide-details="!errorMessage"
    :error-messages="errorMessage"
    :readonly="readonly")
  v-textarea(
    v-else-if="prop.type === 'textarea'"
    v-model="model"
    chips
    multiple
    box
    hide-details
    :label="label"
    rows-per-page-text="Lignes par page"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    auto-grow
    :spellcheck="false"
    :disabled="disabled"
    :readonly="readonly")
  input-image(
    v-else-if="prop.type === 'img'"
    v-model="model"
    :label="label"
    :disabled="disabled"
    :readonly="readonly")
  input-email(
    v-else-if="prop.type === 'email'"
    v-model="model"
    :label="label"
    :disabled="disabled"
    :readonly="readonly")
  input-date(
    v-else-if="prop.type === 'date'"
    v-model="model"
    :label="label"
    :disabled="disabled"
    :readonly="readonly")
  input-time(
    v-else-if="prop.type === 'time'"
    v-model="model"
    :label="label"
    :disabled="disabled"
    :readonly="readonly")
  input-rich(
    v-else-if="prop.type === 'rich'"
    v-model="model"
    :label="label"
    :disabled="disabled"
    :readonly="readonly")
</template>

<script>
import InputImage from '@/components/inputs/image/index'
import InputEmail from '@/components/inputs/email'
import InputDate from '@/components/inputs/date'
import InputTime from '@/components/inputs/time'
import InputRich from '@/components/inputs/rich'

export default {
  components: {
    'input-image': InputImage,
    'input-email': InputEmail,
    'input-date': InputDate,
    'input-time': InputTime,
    'input-rich': InputRich
  },
  props: {
    errorMessage: {
      type: String,
      default: ''
    },
    prop: {
      type: Object,
      required: true
    },
    propValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: true
    },
    readonly: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    label () {
      return `${this.prop.label}${this.prop.id ? '*' : ''}`
    },
    model: {
      get () {
        return this.propValue
      },
      set (value) {
        this.$emit('update:propValue', value)
      }
    }
  }
}
</script>
