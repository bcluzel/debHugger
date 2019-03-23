<template lang="pug">
  v-btn(
    :disabled="!(isCreating || hasDiff)"
    color="primary"
    @click="onClick"
    :loading="loading"
    :flat="loading")
      | {{ isCreating ? 'Ajouter' : 'Modifier' }}
</template>

<script>
import {
  getState,
  getMethods
} from '@/storeInterface/'
import { $capitalize } from '@/plugins/ssr'

export default {
  props: {
    propsErrors: {
      type: Object,
      required: true
    },
    propsInputs: {
      type: Object,
      required: true
    },
    entityName: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      required: true,
      validator: (value) => (
        value && value.hasOwnProperty('_id')
      )
    }
  },
  computed: {
    ...getState(['connectivity', 'services']),
    isCreating () {
      return this.item._id.startsWith('new')
    },
    hasDiff () {
      return Object.keys(this.propsInputs)
        .some(_ => (
          this.item[_] !== this.propsInputs[_]
        ))
    }
  },
  methods: {
    ...getMethods('services'),
    async onClick () {
      if (!this.loading) {
        this.$emit('update:propsErrors', {})
        if (this.item._id.startsWith('new')) {
          const {
            _id,
            doIt
          } = await this[`add${$capitalize(this.entityName)}`](this.propsInputs)
          this.$emit('tempId', _id)
          const item = await doIt()
          if (item) {
            if (item.isError && item.content && item.content.includes('~')) {
              const [ propName, message] = item.content.split('~')
              this.$emit('update:propsErrors', {
                ...this.propsErrors,
                 [propName]: message
              })
            } else {
              this.$emit('submit', item)
            }
          }
        } else {
          const item = await this[`patch${$capitalize(this.entityName)}`]({
            item: this.item,
            value: this.propsInputs
          })
          if (item) {
            if (item.isError && item.content && item.content.includes('~')) {
              const [ propName, message] = item.content.split('~')
              this.$emit('update:propsErrors', {
                ...this.propsErrors,
                 [propName]: message
              })
            } else {
              this.$emit('submit', item)
            }
          }
        }
      }
    }
  }
}
</script>
