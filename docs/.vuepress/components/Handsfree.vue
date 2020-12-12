<template lang="pug">
#handsfree-container
  #handsfree-debugger

  //- This will be moved into the Navbar
  HandsfreeToggle#navbar-handsfree-toggle(text-off='Activate Handsfree Mode' text-on='Stop Handsfree')

  //- This will be moved into the sidebar
  #handsfree-debug-window.window.handsfree-show-when-started
    .title-bar
      .title-bar-text Debugger
      .title-bar-controls
        button(aria-label='Minimize')
        button(aria-label='Maximize')
    .window-body
</template>

<script>
import HandsfreeToggle from './HandsfreeToggle'

/**
 * A global component designed to setup Handsfree.js
 * - Adds the Handsfree Toggle to navbar
 * - Adds a window component
 */
export default {
  name: 'HandsfreeContainer',

  data () {
    return {
      hasMovedToggle: false
    }
  },

  updated () {
    if (!this.hasMovedToggle) {
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
                $target: document.querySelector('#handsfree-debug-window .window-body')
              }
            },
            assetsPath: '/handsfree/'
          })
          window.app = this.$root
        })
      }

      // Move toggle and window
      this.$nextTick(() => {
        document.querySelector('header.navbar > .links').appendChild(
          document.querySelector('#navbar-handsfree-toggle')
        )
        
        // Move the sidebar
        document.querySelector('aside.sidebar').appendChild(
          document.querySelector('#handsfree-debug-window')
        )
      })

      this.hasMovedToggle = true
    }
  }
}
</script>