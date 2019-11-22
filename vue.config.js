const path = require('path')

module.exports = {
  outputDir: 'dist/demos',
  transpileDependencies: ['vuetify'],

  chainWebpack: (config) => {
    config
      .entry('app')
      .clear()
      .add('./demo/main.js')
      .end()
    config.resolve.alias.set('@', path.join(__dirname, './demo'))
  }
}
