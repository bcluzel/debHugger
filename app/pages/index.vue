<template lang="pug">
  LMain(style="max-width: 800px")
    LRow
      LCol(xs6)
        self-form(@submit.prevent="add")
          v-card
            v-card-title.text-xs-center.d-block
              h2.title Ajouter une nouvelle variable
            v-card-text
              LRow
                LCol(xs6)
                  v-text-field(
                    v-model="variable"
                    label="Nom"
                    hide-details)
                LCol(xs6)
                  v-text-field(
                    v-model="value"
                    label="Valeur"
                    hide-details)
            v-card-actions
              v-spacer
              v-scale-transition
                v-btn(v-if="variable && value" icon @click="add")
                  v-icon
                    | add
              v-spacer
      LCol(xs6)
        v-card(width="100%" min-height="500px")
          v-card-title.text-xs-center.d-block
            h2.title Mémoire
          v-card-text
            LRow(
              v-for="({ variable, value }, i) in memory"
              :key="i"
              justify-center
              align-center)
              LCol(xs2)
                  sup.d-flex.justify-end(style="width: 100%") {{ variable }}
              LCol()
                v-text-field(
                  :label="value"
                  hide-details
                  solo
                  disabled)
              LCol(xs2)
                v-btn(icon)
                  v-icon
                    | edit
</template>

<script>
import mixinPage from '@/mixins/page'
import SelfForm from '@/components/form'

export default {
  components: {
    'self-form': SelfForm
  },
  mixins: [mixinPage],
  description: 'Accueil Page Description',
  data: () => ({
    variable: null,
    value: null,
    memory: []
  }),
  methods: {
    add () {
      const variable = this.variable
      const value = this.value
      this.memory.push({
        variable,
        value
      })
      this.variable = ''
      this.value = ''
    }
  }
}
</script>
