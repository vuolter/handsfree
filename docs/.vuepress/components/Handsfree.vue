<template lang="pug">
#handsfree-container
  #handsfree-debugger

  HandsfreeToggle#navbar-handsfree-toggle(text-off='Activate Handsfree Mode' text-on='Stop Handsfree')
</template>

<script>
import HandsfreeToggle from './HandsfreeToggle'

/**
 * A global component designed to setup Handsfree.js
 * - Adds the Handsfree Toggle to navbar
 */
export default {
  name: 'HandsfreeContainer',

  data () {
    return {
      hasMovedToggle: false
    }
  },

  mounted () {
    // Import Handsfree
    if (!window.Handsfree) {
      import('@handsfree/handsfree.js').then(module => {
        const Handsfree = module.default
        window.Handsfree = Handsfree
        window.handsfree = this.$root.handsfree = new Handsfree({
          holistic: true,
          // weboji: true,
          // handpose: true,
          showDebug: true,
          setup: {
            wrap: {
              $target: document.querySelector('aside.sidebar')
            }
          },
          assetsPath: '/handsfree/'
        })
        window.app = this.$root
      })
    }
  },

  updated () {
    if (!this.hasMovedToggle) {
      // Add toggle to navbar
      this.$nextTick(() => {
        document.querySelector('header.navbar > .links').appendChild(
          document.querySelector('#navbar-handsfree-toggle')
        )
      })

      this.hasMovedToggle = true
    }
  }
}
</script>