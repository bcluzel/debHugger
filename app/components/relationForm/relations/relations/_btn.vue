<template lang="pug">
  v-btn(
    @click="m_click"
    icon
    :loading="m_loading")
    v-icon
      | {{ m_icon }}
</template>

<script>
import {
  getState,
  getMethods
} from '@/storeInterface/'

export default {
  props: {
    currentItem: {
      type: Object,
      required: true
    },
    currentEntityName: {
      type: String,
      required: true
    },
    relationItem: {
      type: Object,
      required: true
    },
    relationEntityName: {
      type: String,
      required: true
    },
    currentRelationName: {
      type: String,
      required: true
    }
  },
  data: () => ({
    m_selfLoading: false
  }),
  computed: {
    ...getState('services'),
    m_isLinked () {
      return Object.keys(this.currentItem)
        .filter(_ => _.startsWith(`_${this.currentRelationName}`)
          && this.currentItem[_])
        .map(_ => _.split(this.currentRelationName)[1])
        .includes(this.relationItem._id)
    },
    m_loading () {
      return !!this[`${this.relationEntityName}IsLoading`][this.relationItem._id]
        || this.m_selfLoading
    },
    m_icon () {
      return this.m_isLinked
        ? 'check_box'
        : 'check_box_outline_blank'
    },
    m_relationRelatioName () {
      return this.$setup.services.relations[this.currentEntityName][this.currentRelationName].shared
    }
  },
  methods: {
    ...getMethods('services'),
    ...getMethods('snackbar', true),
    async m_linkCurrent () {
      return this[`patch${this.$capitalize(this.currentEntityName)}`]({
        item: this.currentItem,
        value: {
          [`_${this.currentRelationName}${this.relationItem._id}`]: true
        },
        noSnack: true
      })
    },
    async m_linkRelation () {
      return this[`patch${this.$capitalize(this.relationEntityName)}`]({
        item: { ...this.relationItem },
        value: {
          [`_${this.m_relationRelatioName}${this.currentItem._id}`]: true
        },
        noSnack: true
      })
    },
    async m_unlinkCurrent () {
      return this[`patch${this.$capitalize(this.currentEntityName)}`]({
        item: { ...this.currentItem },
        value: {
          [`_${this.currentRelationName}${this.relationItem._id}`]: false
        },
        noSnack: true
      })
    },
    async m_unlinkRelation () {
      return this[`patch${this.$capitalize(this.relationEntityName)}`]({
        item: { ...this.relationItem },
        value: {
          [`_${this.m_relationRelatioName}${this.currentItem._id}`]: false
        },
        noSnack: true
      })
    },
    async m_click () {
      this.m_selfLoading = true
      if (this.m_isLinked) {
        await Promise.all([
          this.m_unlinkCurrent(),
          this.m_unlinkRelation()
        ])
        this.snackbarSet({
          content: `Relation supprimée`,
        })
      } else {
        await Promise.all([
          this.m_linkCurrent(),
          this.m_linkRelation()
        ])
        this.snackbarSet({
          content: `Relation ajoutée`,
          color: 'primary'
        })
      }
      this.m_selfLoading = false
    }
  }
}
</script>
