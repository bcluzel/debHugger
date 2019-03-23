const nodeExternals = require('webpack-node-externals')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  mode: 'spa',

  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/ssr.js', {
      src: '~/plugins/no-ssr.js',
      ssr: false
    }],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    'nuxt-vuex-router-sync'
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^vuetify/],
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    extractCSS: true,
    extend (config, ctx) {
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
