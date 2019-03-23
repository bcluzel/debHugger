<template lang="pug">
  v-slide-x-transition
    LCol(
      xs12
      sm5)
      v-flex(
        xs12)
        template(v-if="item")
          self-multiple(
            v-if="!editing && multiple"
            :prop="prop"
            :entityName="entityName"
            :item="item"
            @update:item="$emit('update:item', $event)")
          self-generic(
            v-else
            :skeleton="skeleton"
            :entityName="entityName"
            :item="item"
            @update:item="$emit('update:item', $event)")
</template>

<script>
import {
  getState,
  getMethods
} from '@/storeInterface/'

import SelfGeneric from './generic/'
import SelfMultiple from './multiple/'

export default {
  components: {
    'self-generic': SelfGeneric,
    'self-multiple': SelfMultiple
  },
  props: {
    skeleton: {
      type: Object,
      required: true
    },
    entityName: {
      type: String,
      required: true,
      validator: (value) => (
        value !== ''
      )
    },
    item: {
      type: Object,
      default: null
    }
  },
  computed: {
    editing () {
      return this.item && !this.item._id.startsWith('new')
    },
    props () {
      return Object.keys(this.skeleton)
    },
    prop () {
      return {
        ...this.skeleton[this.props[0]],
        name: this.props[0]
      }
    },
    multiple () {
      return this.props.length === 1 &&
        ['string', 'email'].some(_ => this.prop.type === _)
    }
  },
  mounted () {
    const { y } = this.$getPosition(this.$el)
    this.$vuetify.goTo(y + 50)
  }
}
</script>
