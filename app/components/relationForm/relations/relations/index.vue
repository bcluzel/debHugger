<template lang="pug">
    v-card
      v-card-title
        LRow(align-items justify-content)
          v-text-field(
            v-model="searchModel"
            :label="loading ? 'Chargement' : 'Rechercher'"
            single-line
            hide-details
            hide-actions
            :loading="loading"
            :disabled="loading"
            @keypress.enter="search = searchModel")
          v-btn(
            @click="search = searchModel"
            icon)
            v-icon
              | search
      v-card-text
        v-data-table(
          v-if="headerProp"
          :pagination.sync="pagination"
          hide-headers
          :headers="[{ value: headerProp, sortable: true }]"
          :search="search"
          :items="items"
          item-key="headerProp"
          rows-per-page-text="Lignes par page"
          no-data-text="Aucune donnée"
          must-sort)
          template(
            v-slot:items="{ item }")
            tr
              td.text-xs-left
                | {{ item[headerProp] }}
              td.text-xs-right
                self-btn(
                  :relationItem="item"
                  :currentItem="currentItem"
                  :currentEntityName="currentEntityName"
                  :relationEntityName="relationEntityName"
                  :currentRelationName="currentRelationName")
          template(
            slot="pageText"
            slot-scope="{ pageStart, pageStop, itemsLength }")
            | {{ pageStart }} - {{ pageStop }}, Total : {{ itemsLength }}
</template>

<script>
import {
  getState,
  getMethods
} from '@/storeInterface/'

import SelfBtn from './_btn'

export default {
  components: {
    SelfBtn
  },
  props: {
    headerProp: {
      type: String,
      required: true
    },
    currentEntityName: {
      type: String,
      required: true
    },
    currentItem: {
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
    searchModel: '',
    search: '',
    pagination: {}
  }),
  computed: {
    ...getState(['auth', 'services']),
    items () {
      return this[this.relationEntityName]
    },
    loading () {
      return this[`${this.relationEntityName}IsFetching`]
    },
    itemsLength () {
      return this[`${this.relationEntityName}Total`]
    }
  },
  watch: {
    a11d: {
      immediate: true,
      handler: 'refresh'
    },
    relationEntityName () {
      this.$set(this.pagination, 'page', 1)
      this.$set(this.pagination, 'sortBy', this.headerProp)
      this.refresh()
    }
  },
  methods: {
    ...getMethods('services'),
    async refresh () {
      if (this.a11d) {
        const count = await this[`count${this.$capitalize(this.relationEntityName)}`]()
        const items = await this[`fetch${this.$capitalize(this.relationEntityName)}`]({
          $limit: count, // this.pagination.rowsPerPage * 2,
          $skip: 0 // (this.pagination.page - 1) * this.pagination.rowsPerPage
        })
      }
    }
  }
}
</script>
