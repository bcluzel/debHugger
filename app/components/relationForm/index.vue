<template lang="pug">
  self-layout(v-bind="$attrs")
    self-select(
      v-if="entityName !== ''"
      slot="select"
      :entityName.sync="entityName"
      :items="items")
    self-current(
      v-if="entityName !== ''"
      slot="current"
      :entityName="entityName"
      :currentItem.sync="currentItem"
      :headerProp="headerProp")
    self-relations(
      v-if="currentItem && entityName !== ''"
      slot="relations"
      :currentEntityName="entityName"
      :currentItem="currentItem"
      :has="has")
</template>

<script>
/**
 * To link services
 */
import {
  getState,
  getMethods
} from '@/storeInterface/'
import {
  services
} from '@/assets/setup'

import Layout from './_layout'
import Current from './currents/'
import Relations from './relations/'
import Select from './_select'

export default {
  components: {
    'self-layout': Layout,
    'self-current': Current,
    'self-relations': Relations,
    'self-select': Select
  },
  inheritAttrs: false,
  data: () => ({
    entityName: '',
    currentItem: null
  }),
  computed: {
    ...getState(['auth', 'services']),
    skeleton () {
      return this.$setup.services.entities[this.entityName]
    },
    headerProp () {
      return Object.keys(this.skeleton).find(key => this.skeleton[key].id)
    },
    has () {
      return this.$setup.services.relations[this.entityName]
    },
    items () {
      return this.user
        ? this.user._role === 'owner'
          ? Object.keys(this.$setup.services.permissions)
            .filter(_ => !_.startsWith('_'))
          : []
        : []
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
      this.currentItem = null
    }
  }
}
</script>
