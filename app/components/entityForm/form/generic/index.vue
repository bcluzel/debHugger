<template lang="pug">
  v-card
    v-card-title.justify-center
      h2 {{ propsInputs[Object.keys(skeleton).find(_ => skeleton[_].id)] || item[Object.keys(skeleton).find(_ => skeleton[_].id)] }}
    v-card-text
      self-form(@submit.prevent="submit")
        LRow(
          justify-center
          align-center
          wrap)
          LCol(
            v-for="(prop, i) in Object.keys(skeleton).filter(_ => _ !== 'has')"
            :key="i")
            self-prop(
              :prop="skeleton[prop]"
              :propValue.sync="propsInputs[prop]"
              :errorMessage="propsErrors[prop]"
              :disabled="loading"
              :readonly="!canUpdate")
    v-card-actions(v-if="canDelete || canUpdate")
      v-spacer
      self-remove(
        v-if="canDelete"
        v-show="!loading && item && !item._id.startsWith('new')"
        @remove="$emit('update:item', null)"
        :item="item"
        :entityName="entityName"
        :loading="loading")
      self-submit(
        v-if="canUpdate"
        ref="submit"
        :propsErrors.sync="propsErrors"
        @submit="$emit('update:item', $event)"
        @tempId="onTempId"
        :entityName="entityName"
        :propsInputs="propsInputs"
        :loading="loading"
        :item="item")
      v-spacer
</template>

<script>
import {
  getState,
  getMethods
} from '@/storeInterface/'
import SelfProp from './_prop'
import SelfSubmit from './_submit'
import SelfRemove from './_remove'
import SelfForm from '@/components/form'

export default {
  components: {
    'self-prop': SelfProp,
    'self-submit': SelfSubmit,
    'self-remove': SelfRemove,
    'self-form': SelfForm
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
      required: true,
      validator: (value) => (
        value && value.hasOwnProperty('_id')
      )
    }
  },
  data: () => ({
    propsInputs: {},
    propsErrors: {}
  }),
  computed: {
    ...getState('services'),
    loading () {
      return !!this[`${this.entityName}IsLoading`][this.item._id]
    },
    canDelete () {
      return this[`canDelete${this.$capitalize(this.entityName)}`]
    },
    canUpdate () {
      return this[`canUpdate${this.$capitalize(this.entityName)}`]
    }
  },
  watch: {
    item: {
      immediate: true,
      handler: 'refresh'
    }
  },
  methods: {
    submit () {
      this.$refs.submit.onClick()
    },
    ...getMethods('services'),
    async refresh () {
      this.propsInputs = {}
      if (this.item._id === 'new') {
        Object.keys(this.skeleton).forEach(name => {
          this.$set(this.propsInputs, name, '')
          this.$set(this.propsErrors, name, '')
        })
      } else {
        Object.keys(this.item)
          .filter(_ => !_.startsWith('_'))
          .forEach(key => {
            this.$set(this.propsInputs, key, this.item[key])
            this.$set(this.propsErrors, key, '')
          })
      }
      await this.$nextTick()
      if (this.$el) {
        const { y } = this.$getPosition(this.$el)
        this.$vuetify.goTo(y + 50)
      }
    },
    onTempId (value) {
      const item = { ...this.item, _id: value, ...this.propsInputs }
      this.$emit('update:item', item)
    }
  }
}
</script>
