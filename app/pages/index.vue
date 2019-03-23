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
        v-btn(@click="check_memory")
          | Check
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
                  :value="value"
                    @input="memory[i].value = $event"
                  hide-details
                  :solo="state"
                  :disabled="state")
              LCol(xs2)
                v-btn(icon @click="changeState(i)")
                  v-icon(v-if="state")
                    | edit
                  v-icon(v-else)
                    | check
              LCol(xs2)
                v-btn(icon @dblclick="valuePop(i)")
                  v-icon()
                    | remove
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
    mode: false,
    dict_test: { i : 0, j : 2 }
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
    },
    changeState (i) {
      this.memory[i].state = !this.memory[i].state
    },
    valuePop (i) {
      this.memory.splice(i);
    },
    getDict () {
      const memory_size = this.memory.length
      var dict = {}
      for (let i = 0; i < memory_size; i++) {
        dict[this.memory[i].variable] = this.memory[i].value;
      }
      return dict
    },
    check_memory() {
      const current_dict = this.getDict()
      // TODO : remplacer dict_test
      if (this.dict_equals(this.dict_test, current_dict)) {
        this.nextStep()
        if (this.active == this.memory.length) {
          this.finish();
        }
      }
    },
    dict_equals(dic1, dic2) {
      let rep = 1;
      for (let propriety in dic1) {
        if(dic1[propriety] != dic2[propriety]){
          rep = 0;
        }
      }
      return rep;
    },
    finish() {
      alert('VOUS AVEZ FINI')
    }
  }
}
</script>
