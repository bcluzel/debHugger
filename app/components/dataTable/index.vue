<template lang="pug">
  v-flex(xs12)
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
          item-key="name"
          rows-per-page-text="Lignes par page"
          no-data-text="Aucune donnée"
          must-sort)
          template(
            v-slot:items="{ item }")
            tr
              td.text-xs-left
                | {{ item[headerProp] }}
              td.text-xs-right
                self-button(
                  :item="item"
                  :removeMode="removeMode"
                  :currentItem="currentItem"
                  @update:currentItem="$emit('update:currentItem', $event)"
                  :serviceName="serviceName")
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
import Button from './_button'

export default {
  components: {
    'self-button': Button
  },
  props: {
    skeleton: {
      type: Object,
      required: true
    },
    serviceName: {
      type: String,
      required: true
    },
    currentItem: {
      type: Object,
      default: null
    },
    removeMode: {
      type: Boolean,
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
      return this[this.serviceName]
    },
    headerProp () {
      return Object.keys(this.skeleton).find(key => this.skeleton[key].id)
    },
    loading () {
      return this[`${this.serviceName}IsFetching`]
    },
    itemsLength () {
      return this[`${this.serviceName}Total`]
    }
  },
  watch: {
    a11d: {
      immediate: true,
      handler: 'refresh'
    },
    pagination: 'refresh',
    serviceName () {
      this.$set(this.pagination, 'page', 1)
      this.$set(this.pagination, 'sortBy', this.headerProp)
      this.refresh()
    }
  },
  methods: {
    ...getMethods('services'),
    async refresh () {
      if (this.a11d && this.pagination.rowsPerPage && this.pagination.page) {
        const items = await this[`fetch${this.$capitalize(this.serviceName)}`]({
          $limit: this.pagination.rowsPerPage * 2,
          $skip: (this.pagination.page - 1) * this.pagination.rowsPerPage
        })
      }
    }
  }
}
</script>
