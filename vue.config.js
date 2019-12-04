const path = require('path')

module.exports = {
  outputDir: 'dist/handsfree.js.org',
  transpileDependencies: ['vuetify'],

  chainWebpack: (config) => {
    config
      .entry('app')
      .clear()
      .add('./handsfree.js.org/main.js')
      .end()
    config.resolve.alias.set('@', path.join(__dirname, './handsfree.js.org'))
  }
}
