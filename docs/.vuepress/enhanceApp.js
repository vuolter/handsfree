import Handsfree from '@handsfree/handsfree.js'

// @see https://vuepress.vuejs.org/guide/basic-config.html#theme-configuration
export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
  isServer // is this enhancement applied in server-rendering or client
}) => {
  /**
   * Setup Handsfree
   */
  window.Handsfree = Handsfree
  Vue.prototype.$handsfree = window.handsfree = new Handsfree({
    assetsPath: '/handsfree/',
    weboji: true
  })
}