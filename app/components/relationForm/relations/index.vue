<template lang="pug">
  v-slide-x-transition
    LCol(
      xs12
      sm5)
      v-flex(
        xs12)
        v-card
          self-select(
            v-model="tw_currentRelationLabel"
            :has="has")
        self-relations(
          v-if="tw_currentRelationLabel !== ''"
          :headerProp="c_headerProp"
          :currentEntityName="c_currentEntityName"
          :currentItem="c_currentItem"
          :relationEntityName="c_relationEntityName"
          :currentRelationName="c_currentRelationName")
</template>

<script>
import {
  getState,
  getMethods
} from '@/storeInterface/'

import SelfRelations from './relations/'
import SelfSelect from './_select'

export default {
  components: {
    SelfRelations,
    SelfSelect
  },
  props: {
    has: {
      type: Object,
      required: true
    },
    currentEntityName: {
      type: String,
      required: true
    },
    currentItem: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    tw_currentRelationLabel: ''
  }),
  computed: {
    m_relation () {
      return Object.keys(this.has)
        .map(_ => this.has[_])
        .find(({ label }) => label === this.tw_currentRelationLabel)
    },
    m_relationSkeleton () {
      return this.$setup.services.entities[this.c_relationEntityName]
    },
    ///////////////////////////////////////////////////////////////////////////
    c_headerProp () {
      return Object.keys(this.m_relationSkeleton).find(key => this.m_relationSkeleton[key].id)
    },
    c_currentEntityName () {
      return this.currentEntityName
    },
    c_currentItem () {
      return this.currentItem
    },
    c_relationEntityName () {
      return this.$get(this.m_relation, 'type')
    },
    c_currentRelationName () {
      return [Object.keys(this.has)
        .map(_ => ({
          _,
          value: this.has[_]
        }))
        .find(({ value }) => value.label === this.tw_currentRelationLabel)]
        .filter(_ => _)
        .map(({ _ }) => _)[0]
    }
  },
  mounted () {
    const { y } = this.$getPosition(this.$el)
    this.$vuetify.goTo(y + 50)
  }
}
</script>
