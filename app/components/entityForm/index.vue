<template lang="pug">
  self-layout(v-bind="$attrs")
    self-remove-btn(
      v-if="entityName !== ''"
      slot="remove-btn"
      @click="remove"
      :value="removeMode"
      :isCreating="isCreating"
      :disabled="!canRemove")
    self-select(
      v-if="entityName !== ''"
      slot="select"
      :entityName.sync="entityName"
      :items="items")
    self-add-btn(
      v-if="entityName !== ''"
      slot="add-btn"
      @click="add"
      :isCreating="isCreating"
      :removeMode="removeMode"
      :disabled="!canCreate")
    self-current(
      v-if="entityName !== ''"
      slot="current"
      :entityName="entityName"
      :currentItem.sync="item"
      :removeMode="removeMode"
      :skeleton="skeleton")
    self-form(
      v-if="entityName !== ''"
      slot="form"
      v-show="item"
      :entityName="entityName"
      :item.sync="item"
      :skeleton="skeleton")
</template>

<script>
/**
 * To manage items
 */
import {
  getState,
  getMethods
} from '@/storeInterface/'

import Layout from './_layout'
import AddBtn from './_addBtn'
import RemoveBtn from './_removeBtn'
import Current from './currents/'
import Form from './form/'
import Select from './_select'

// const entityName = Object.keys(entities)[0]
export default {
  components: {
    'self-layout': Layout,
    'self-add-btn': AddBtn,
    'self-remove-btn': RemoveBtn,
    'self-current': Current,
    'self-form': Form,
    'self-select': Select
  },
  inheritAttrs: false,
  data: () => ({
    entityName: '',
    item: null,
    removeMode: false
  }),
  computed: {
    ...getState(['auth', 'services']),
    skeleton () {
      return this.$setup.services.entities[this.entityName]
    },
    isCreating () {
      return !!(this.item && this.item._id && this.item._id.startsWith('new'))
    },
    items () {
      return Object.keys(this.$setup.services.entities)
        .filter(_ => this[`canRead${this.$capitalize(_)}`])
    },
    canCreate () {
      return this[`canCreate${this.$capitalize(this.entityName)}`]
    },
    canRemove () {
      return this[`canDelete${this.$capitalize(this.entityName)}`]
    }
  },
  watch: {
    entityName: 'refresh',
    a11d: 'refresh',
    items: {
      immediate: true,
      handler () {
        this.entityName = this.last
          ? this.last
          : this.items.length
            ? this.items[0]
            : this.entityName
      }
    }
  },
  methods: {
    ...getMethods('services'),
   async refresh () {
      this.item = null
    },
    add (value) {
      this.removeMode = false
      this.item = !this.isCreating
        ? { _id: 'new' }
        : null
    },
    remove (value) {
      this.item = null
      this.removeMode = !this.removeMode
    },
  },
  mounted () {
  }
}
</script>
