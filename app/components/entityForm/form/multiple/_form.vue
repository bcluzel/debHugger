<template lang="pug">
  v-card
    v-card-text
      LRow(:wrap="false" align-center)
        v-tooltip(bottom)
          template(#activator='data')
            v-icon.mr-3(v-on="data.on" style="cursor: help") help
          span(v-if="delimiter !== endLine")
            | Si {{ label }} = {{ 'abcd'.split('').join(delimiter) }}
            | alors vous ajoutez a, b, c, et d.
          span(v-else)
            | Si {{ label }} =
            div(v-for="(letter, i) in 'abcd'.split('')" :key="i") {{ letter }}
            | alors vous ajoutez a, b, c, et d.
            div (C'est le cas si du copier-coller d'une colonne d'un tableur)
        v-select(
          v-model="delimiterChoice"
          :items="['Saut de ligne', 'Espace', 'Virgule', 'Deux-points', 'Blanc souligné', `Trait d'union`]"
          box
          label="Délimiteur"
          hide-details
          :disabled="loading")
    v-card-text
      LRow
        v-text-field(
          v-if="type === 'string'"
          v-model="model"
          @paste.prevent="onPaste"
          @input="onInput"
          @keypress="onKeypress"
          box
          hide-details
          :label="label"
          :disabled="loading")
        InputEmail(
          v-else-if="type === 'email'"
          v-model="model"
          @paste.prevent="onPaste"
          @input="onInput"
          @keypress="onKeypress"
          box
          hide-details
          :label="label"
          :disabled="loading"
        )
</template>

<script>
import InputEmail from '@/components/inputs/email'

export default {
  components: {
    InputEmail
  },
  props: {
    inputs: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data: () => ({
    model: '',
    delimiterChoice: 'Saut de ligne'
  }),
  computed: {
    endLine () {
      return '\n'
    },
    delimiter () {
      return {
        'Saut de ligne': this.endLine,
        'Espace': ' ',
        'Virgule': ',',
        'Deux-points': ':',
        'Blanc souligné': '_',
        'Trait d\'union': '-'
      }[this.delimiterChoice]
    }
  },
  watch: {
    async delimiter () {
      await this.onInput(this.model)
    }
  },
  methods: {
    onKeypress ({ key }) {
      if (key === 'Enter') {
        this.emitNewInputs([this.model])
        this.model = ''
      }
    },
    async onPaste ({ clipboardData }) {
      const value = (clipboardData || window.clipboardData).getData('text')
      await this.onInput(value)
    },
    async onInput (value) {
      const inputs = value.split(this.delimiter)
      if (inputs.length > 1) {
        this.emitNewInputs(inputs.filter(_ => _ !== ''))
        await this.$nextTick()
        this.model = ''
      } else {
        this.model = value
      }
    },
    emitNewInputs (value) {
      if (this.type === 'email') {
        value = value.map(_ => (
          !_.endsWith('@enseirb-matmeca.fr')
            ? _ + '@enseirb-matmeca.fr'
            : _
        ))
      }
      this.$emit('newInputs', value)
    }
  }
}
</script>
