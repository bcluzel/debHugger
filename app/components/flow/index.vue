<template lang="pug">
  v-card
    v-toolbar(
      dark
      color="primary"
      flat)
      v-toolbar-side-icon
        v-icon
          | waves
      v-toolbar-title
        | Flow
      v-spacer
      v-toolbar-items
        v-btn(
          dark
          flat
          @click="save")
            | Valider
        v-btn(icon flat dark @click="$emit('close')")
          v-icon close
    v-card-text(style="max-width: 600px; margin: auto")
      div(ref="editor")
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
var Block = Quill.import('blots/block')
class Div extends Block {
}
Div.tagName = "div";
Div.blotName = "div";
Div.allowedChildren = Block.allowedChildren
Div.allowedChildren.push(Block)
Quill.register(Div)

export default {
  props: {
    value: {
      type: String,
      required: true
    },
    valueText: {
      type: String,
      required: true
    }
  },
  data: () => ({
    editor: null,
    dialog: false
  }),
  watch: {
    value () {
      this.editor.root.innerHTML = new DOMParser().parseFromString(this.value, 'text/html').body.innerHTML
    }
  },
  methods: {
    save () {
      this.$emit('save', this.valueText
        ? this.editor.root.innerHTML.split('\n').join('<br>')
        : '')
    }
  },
  mounted () {
    this.$deferredCall(() => {
      this.editor = new Quill(this.$refs.editor, {
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image']
          ]
        },
        theme: 'snow',
        formats: ['bold', 'underline', 'header', 'italic']
      })
      this.editor.root.innerHTML = new DOMParser().parseFromString(this.value, 'text/html').body.innerHTML

      this.editor.on('text-change', () => {
        this.$emit('update:valueText', this.editor.getText())
      })
    })
  }
}
</script>
