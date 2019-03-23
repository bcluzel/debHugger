<template lang="pug">
  div
    v-card-title.justify-center
      h2 {{ item._id.startsWith('new') ? `Ajout Multiple` : 'Modification' }}
    self-form(
      :inputs="inputs"
      :label="`${prop.label}s`"
      @newInputs="onNewInputs"
      :loading="loading"
      :type="prop.type")
    self-new(
      :inputs.sync="inputs"
      :entityName="entityName"
      :propName="propName"
      :loading="loading"
      @tempId="$emit('update:item', { ...item, _id: $event })")
</template>

<script>
import {
  getState
} from '@/storeInterface/'

import SelfForm from './_form'
import SelfNew from './_new'

export default {
  components: {
    'self-form': SelfForm,
    'self-new': SelfNew
  },
  props: {
    prop: {
      type: Object,
      required: true,
      validator: (value) => (
        ['name', 'label', 'type'].every(_ => (
          value.hasOwnProperty(_)
        ))
      )
    },
    entityName: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true,
      validator: (value) => (
        value.hasOwnProperty('_id')
      )
    }
  },
  data: () => ({
    inputs: []
  }),
  computed: {
    ...getState('services'),
    propName () {
      return this.prop.name
    },
    currents () {
      return this[this.entityName].map(_ => (
        _[this.propName]
      ))
    },
    loading () {
      return !!this[`${this.entityName}IsLoading`][this.item._id]
    }
  },
  methods: {
    onNewInputs (value) {
      this.inputs.push(...value
        .filter(_ => !this.inputs.includes(_))
        .filter(_ => !this.currents.includes(_))
      )
    }
  }
}
</script>
