const path = require('path')

module.exports = {
  outputDir: 'dist/handsfree.js.org',
  transpileDependencies: ['vuetify'],

  css: {
    loaderOptions: {
      sass: {
        prependData: "@import '@/assets/sass/main.sass'",
        implementation: require('sass')
      }
    }
  },

  chainWebpack: (config) => {
    config
      .entry('app')
      .clear()
      .add('./handsfree.js.org/main.js')
      .end()
    config.resolve.alias.set('@', path.join(__dirname, './handsfree.js.org'))
  }
}
