<template lang="pug">
  v-slide-x-transition
    v-flex(
      v-if="inputs.length"
      xs12)
      v-card
        v-card-title.justify-center
          h2 À ajouter
        v-card-text
          v-progress-linear(
            v-if="progress"
            :value="(progress.current / progress.total) * 100")
          div.text-xs-center(v-if="inputs.length <= 3")
            v-chip(
              v-for="(input, i) in inputs.slice(0, Math.min(3, inputs.length))"
              :key="i"
              :disabled="loading"
              close
              @input="remove(input)")
              | {{ input }}
          v-expansion-panel.elevation-0(v-else v-model="expansion")
            v-expansion-panel-content
              div.text-xs-center(slot="header")
                v-chip(
                  v-for="(input, i) in inputs.slice(0, Math.min(3, inputs.length))"
                  :key="i"
                  :disabled="loading")
                  | {{ input }}
                v-chip(
                  v-if="inputs.length > 3"
                  outline)
                  | et {{ inputs.length - 3 }} de plus
              v-text-field.mb-3(
                v-model="search"
                label="Rechercher"
                append-icon="search"
                single-line
                hide-details
                hide-actions
                must-sort)
              v-data-table(
                :headers="[{ value: 'name', sortable: true }]"
                hide-headers
                :items="inputs | arrayToObject"
                :search="search"
                rows-per-page-text="Lignes par page")
                template(
                  slot="items"
                  slot-scope="{ item }")
                  tr
                    td.text-xs-left {{ item.name }}
                    td.text-xs-right
                      v-btn(
                        icon
                        @click="remove(item.name)")
                        v-icon remove
                template(slot="pageText" slot-scope="{ pageStart, pageStop, itemsLength }")
                  | {{ pageStart }} - {{ pageStop }}, total : {{ itemsLength }}
        v-card-actions(v-if="!progress")
          v-spacer
          v-btn(
            @click="clear"
            v-if="!loading"
          ) Ignorer
          v-btn(
            @click="add"
            color="primary"
            :loading="loading"
            :flat="loading"
          ) Ajouter
          v-spacer
</template>

<script>
import {
  getMethods,
  getState
} from '@/storeInterface/'

export default {
  props: {
    inputs: {
      type: Array,
      required: true
    },
    entityName: {
      type: String,
      required: true
    },
    propName: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    search: '',
    progress: null,
    expansion: null
  }),
  computed: {
    ...getState('services')
  },
  watch: {
    async expansion (value) {
      if (value !== null) {
        await this.$deferredCall(() => {
          const { y } = this.$getPosition(this.$el)
          this.$vuetify.goTo(y + 100)
        }, 80)
      }
    },
    inputs (value) {
      const { y } = this.$getPosition(this.$el)
      this.$vuetify.goTo(y + 50)
    }
  },
  methods: {
    ...getMethods('services'),
    ...getMethods('snackbar', true),
    clear () {
      this.$emit('update:inputs', [])
    },
    async add () {
      const inputs = this.inputs
        .map(_ => ({
          [this.propName]: _
        }))
      const {
        _id,
        doIt
      } = await this[`add${this.$capitalize(this.entityName)}Array`](inputs)
      this.$emit('tempId', _id)
      const items = await doIt()
      if (items) {
        this.$emit('update:inputs', [])
        this.snackbarSet({
          content: `Ajoutés !`,
          color: 'primary'
        })
      }
    },
    remove (item) {
      this.$emit('update:inputs', this.inputs.filter(_ => _ !== item))
    }
  }
}
</script>
