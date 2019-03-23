<template lang="pug">
  v-form(@submit="$listeners.submit")
    slot
    button.hidden-xs-and-up(type="submit")
</template>

<script>
export default {

}
</script>
