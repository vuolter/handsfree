import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '../handsfree/handsfree.js'
import '@/assets/sass/main.sass'

// We set this to the root because our models are in the public folder
window.Handsfree.libSrc = '/'

// Highlight.js
// @TODO only load on required pages
import hljs from 'highlight.js'
require('highlight.js/styles/shades-of-purple.css')
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
hljs.registerLanguage(
  'javascript',
  require('highlight.js/lib/languages/javascript')
)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
