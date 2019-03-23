<template lang="pug">
  v-card.bradius-a
    v-form(@submit.prevent="")
      v-card-title.justify-center(primary-title)
        .display-1 Inscription
      v-card-text
        v-text-field(
          :value="$get(form, 'email')"
          @input="setFormField({ name: 'email', value: $event})"
          autofocus
          box
          label="Email"
          type="email"
          :error-messages="$get(form, 'errorMessages')"
          autocomplete="username")
        v-text-field(
          :value="$get(form, 'password')"
          @input="setFormField({ name: 'password', value: $event})"
          box
          label="Mot de passe"
          type="password"
          :error-messages="$get(form, 'errorMessages')"
          autocomplete="new-password")
        v-text-field(
          :value="$get(form, 'passwordConfirm')"
          @input="setFormField({ name: 'passwordConfirm', value: $event})"
          box
          label="Confirmation mot de passe"
          type="password"
          :error-messages="$get(form, 'errorMessages')"
          autocomplete="new-password")
      v-card-actions.justify-center
        v-scale-transition
          v-btn(
            flat
            @click="click('no')"
            :disabled="$get(form, 'loading')"
            :tabindex="-1")
            | Annuler
        v-btn(
          color="primary"
          flat
          type="submit"
          @click="click('yes')"
          :loading="$get(form, 'loading')")
          | S'inscrire
</template>

<script>
import {
  getState,
  getMethods
} from '@/storeInterface'

export default {
  computed: {
    ...getState('auth')
  },
  methods: {
    ...getMethods('auth'),
    click (action) {
      switch (action) {
        case 'yes':
        this.signup()
        break;
        case 'no':
        this.setForm(null)
        break;
      }
    }
  }
}
</script>
