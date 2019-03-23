<template lang="pug">
  LMain(style="max-width: 800px")
    LRow
      LCol(xs6)
        LRow(justify-end)
          v-switch(label="Mode liste" v-model="mode")
        v-card(v-if="mode")
          v-card-title.text-xs-center.d-block
            h2.title Ajouter une nouvelle liste
          v-card-text
            LRow(wrap)
              LCol(xs6)
                v-text-field(
                  v-model="variable"
                  label="Nom"
                  hide-details)
              LCol(xs12)
                v-combobox(
                  multiple
                  chips
                  v-model="value"
                  label="Valeurs"
                  hide-details)
          v-card-actions
            v-spacer
            v-scale-transition
              v-btn(v-if="variable && value" icon @click="add")
                v-icon
                  | add
            v-spacer
        self-form(@submit.prevent="add" v-else)
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
              v-for="({ variable, value, state }, i) in memory"
              :key="i"
              justify-center
              align-center)
              LCol(xs2)
                  sup.d-flex.justify-end(style="width: 100%") {{ variable }}
              LCol()
                v-combobox(
                  v-if="Array.isArray(value)"
                  :label="variable"
                  multiple
                  chips
                  single-line
                  :value="value")
                v-text-field(
                  v-else
                  :label="value"
                  hide-details
                  :solo="state"
                  :disabled="state")
              LCol(xs2)
                v-btn(icon @click="changeState(i)")
                  v-icon(v-if="state")
                    | edit
                  v-icon(v-else)
                    | check
</template>

<script>
import mixinPage from '@/mixins/page'
import SelfForm from '@/components/form'
import {
  getMethods
} from '@/storeInterface'

export default {
  components: {
    'self-form': SelfForm
  },
  mixins: [mixinPage],
  description: 'Accueil Page Description',
  data: () => ({
    variable: null,
    value: null,
    memory: [],
    mode: false
  }),
  methods: {
    ...getMethods('debhugger'),
    add () {
      const variable = this.variable
      const value = this.value
      const state = true
      this.memory.push({
        variable,
        value,
        state
      })
      this.variable = ''
      this.value = ''
      this.nextStep()
    },
    changeState (i) {
      this.memory[i].state = !this.memory[i].state
    }
  }
}
</script>
