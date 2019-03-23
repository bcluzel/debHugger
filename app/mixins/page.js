export default {
  head () {
    return this.$createHeader({
      description: this.$options.description || '',
      desktop: this.$store.state.settings.versionOrdinateur
    })
  }
}
