<template lang="pug">
  LCol()
    LRow(
      justify-center)
      self-croppa(
        style="border-radius: 100% !important"
        v-model="croppa"
        :image-border-radius="100"
        :file-size-limit="300 * 1024"
        :placeholder-font-size="14"
        :width="100"
        :height="100"
        :show-remove-button="false"
        placeholder="Image ici 🖱️"
        @new-image-drawn="save"
        @move="changed = true"
        @zoom="changed = true"
        @rotate="changed = true"
        :initial-image="value"
        :disabled="$attrs.readonly")
    LRow(
      justify-center
      align-center
      wrap)
      v-btn(
        v-if="value && !$attrs.readonly"
        flat
        @click="deleteImage"
        :disabled="$attrs.disabled")
        | Retirer {{ label }}
      v-btn(
        v-if="changed && !$attrs.readonly"
        @click="save")
        | Sauvegarder
    LRow.my-3(
      v-if="palette && palette.length && theming"
      justify-center
      align-center
      wrap)
      h3.subheading Thème detecté
      LRow(
        justify-center)
        v-btn(
          v-for="(_, i) in palette"
          :key="i"
          depressed
          icon
          :color="_ | rgb")
</template>

<script>
const PALETTE_SIZE = 5

import 'vue-croppa/dist/vue-croppa.css'
import Croppa from 'vue-croppa'


export default {
  components: {
    'self-croppa': Croppa.component
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    theming: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    palette: [],
    croppa: {},
    changed: false
  }),
  watch: {
    value: {
      immediate: true,
      async handler (value) {
        if (value) {
          if (this.croppa.refresh) {
            this.croppa.refresh()
          }
        } else if (this.croppa.remove) {
          this.croppa.remove()
        }
        this.palette = value !== ''
          ? await new Promise(resolve => {
            const image = new Image()
            image.src = this.$options.filters.image(value)
            image.onload = (() => {
              resolve(this.$colorThief.getPalette(image, PALETTE_SIZE))
            })
          }) : []
      }
    }
  },
  methods: {
    async save (event) {
      this.changed = false
      this.$emit('input', this.croppa.generateDataUrl('image/png'))
    },
    deleteImage () {
      this.croppa.remove()
      this.$emit('input', '')
    }
  }
}
</script>
