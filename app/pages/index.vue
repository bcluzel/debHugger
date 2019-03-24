<template lang="pug">
  LMain(style="max-width: 800px")
    LRow(justify-center align-center)
        v-btn(@click="previousLevel"
            :disabled="level === 0")
            v-icon
                | fast_rewind
        h1.title.mx-3 {{ level }}
        v-btn(@click="nextLevel"
            :disabled="level === levels.length - 1")
            v-icon
                | fast_forward

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
        v-btn#chk(
            @click="check_memory"
            :disabled="finished"
            )
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
                align-center
                )
                //- LCol(xs2)
                    sup.d-flex.justify-end(style="width: 100%") {{ variable }}
                LCol()
                    v-combobox(
                        v-if="Array.isArray(value)"
                        :label="variable"
                        multiple
                        chips
                        single-line
                        :value="value")
                    //- v-text-field( 
                        :value="value"
                            @input="memory[i].value = $event"
                        hide-details
                        :solo="state"
                        :disabled="state") 
                    
                v-chip(
                    contenteditable
                    close
                    @keypress.enter.stop=""
                    @input="valuePop(i)"
                    )
                    v-avatar(
                        class="teal"                     
                        )
                        | {{ variable }}
                    | {{ value }}
                //- LCol(xs2)
                    v-btn(icon @click="changeState(i)")
                    v-icon(v-if="state")
                        | edit
                    v-icon(v-else)
                        | check
                //- LCol(xs2)
                    v-btn(icon @dblclick="valuePop(i)")
                    v-icon()
                        | remove
</template>

<script>
import mixinPage from '@/mixins/page'
import SelfForm from '@/components/form'
import {
  getMethods,
  getState
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
    dict_test: { i : 0, j : 2 },
    confetti:require('canvas-confetti'),
    finished: false
  }),
  computed: {
    ...getState('debhugger')
  },
  methods: {
    ...getMethods('debhugger'),
    ...getMethods('snackbar', true),
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
    // FIXME : cette fonction supprime parfois trop d'élements
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
      if (this.dict_equals(this.levels[this.level][1][this.active][1], current_dict)) {
        this.nextStep()
        this.snackbarSet({
            content: 'Bravooooo',
            color: 'green'
        })
        if (this.active === -1) {
          this.finish()
        }
      } else {
          this.snackbarSet({
              content: 'Try again bro'
          })
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
        this.finished = true
        this.confetti()
    },
    nextLevel() {
        if (this.level + 1 == this.levels.length) alert("Il n'y a plus de niveaux suivants !")
        else this.setLevel(this.level + 1)
        this.setActive(0)
        this.memory = []
        this.finished = false
    },
    previousLevel() {
        if (this.level == 0) alert("Il n'y a plus de niveaux précedent !")
        else this.setLevel(this.level - 1)
        this.setActive(0)
        this.memory = []
        this.finished = false
    }
  }
}
</script>
