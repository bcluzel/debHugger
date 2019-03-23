<template lang="pug">
  LCol(v-bind="$attrs")
    LRow(
      align-center
      wrap)
      self-image(
        v-model="m_image"
        label="Avatar"
        :theming="false")
    LRow.my-2(
      align-center
      wrap)
      v-text-field(
        v-model="m_surname"
        hide-details
        label="Prénom"
        box
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        :spellcheck="false")
    LRow.my-2(
      align-center
      wrap)
      v-text-field(
        v-model="m_name"
        hide-details
        label="Nom"
        box
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        :spellcheck="false")
    LRow.my-2(
      align-center
      wrap)
      self-location(
        v-model="m_location"
        label="Adresse")
</template>

<script>
import Image from '@/components/inputs/image'
import Location from '@/components/inputs/location'
import {
  getState,
  getMethods
} from '@/storeInterface/'

export default {
  components: {
    'self-image': Image,
    'self-location': Location
  },
  computed: {
    ...getState('illicourse'),
    m_name: {
      get () {
        return this.name
      },
      set (value) {
        this.setName(value)
      }
    },
    m_surname: {
      get () {
        return this.surname
      },
      set (value) {
        this.setSurname(value)
      }
    },
    m_location: {
      get () {
        return this.location
      },
      set (value) {
        this.setLocation(value)
      }
    },
    m_image: {
      get () {
        return this.image
      },
      set (value) {
        this.setImage(value)
      }
    }
  },
  methods: {
    ...getMethods('illicourse')
  }
}
</script>
