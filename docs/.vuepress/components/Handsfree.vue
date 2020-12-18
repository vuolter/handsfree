<template lang="pug">
#handsfree-container
  #handsfree-debugger

  //- This will be moved into the Navbar
  HandsfreeToggle#navbar-handsfree-toggle(text-off='Activate Handsfree Mode' text-on='Stop Handsfree')

  //- This will be moved into the sidebar
  #handsfree-debug-window.window.handsfree-show-when-started(ref='window')
    .title-bar
      .title-bar-text Debugger
      .title-bar-controls
        button(aria-label='Minimize' @click='minimize')
        button(aria-label='Restore' @click='restore')
        button(aria-label='Maximize' @click='maximize')
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
      hasMovedToggle: false,
      isMaximized: false,
      isMinimized: false
    }
  },

  updated () {
    setTimeout(() => {
      console.log(`
        ✨
        (\\.   \\      ,/)
          \\(   |\\     )/
          //\\  | \\   /\\\\
        (/ /\\_#oo#_/\\ \\)
          \\/\\  ####  /\\/
              \`##'


         🧙‍♂️ Presenting 🧙‍♀️

            Handsfree.js
              8.0.0

  Repo:       https://github.com/midiblocks/handsfree
  Discord:    https://discord.gg/TWemTd85
  Newsletter: http://eepurl.com/hhD7S1
`)
      
      if (!this.hasMovedToggle) {
        // Import Handsfree
        if (!window.Handsfree) {
          import('@handsfree/handsfree.js').then(module => {
            const Handsfree = module.default
            window.Handsfree = Handsfree
            window.handsfree = this.$root.handsfree = new Handsfree({
              // weboji: true,
              // hands: true,
              // holistic: true,
              facemesh: true,
              showDebug: true,
              // showVideo: true,
              setup: {
                wrap: {
                  $parent: document.querySelector('#handsfree-debug-window .window-body')
                }
              },
              assetsPath: '/handsfree'
            })
            window.app = this.$root
            handsfree.enablePlugins('browser')
          })
        }
  
        // Move toggle and window
        document.querySelector('header.navbar > .links').appendChild(
          document.querySelector('#navbar-handsfree-toggle')
        )
        
        // Move the sidebar
        document.querySelector('aside.sidebar').appendChild(
          this.$refs.window
        )
        this.hasMovedToggle = true
      }
    }, 50)
  },

  methods: {
    /**
     * Minimize the debugger
     */
    minimize () {
      this.$refs.window.classList.add('minimized')
      this.$refs.window.classList.remove('maximized')
      this.isMinimized = true
      this.isMaximized = false
    },

    /**
     * Maximize the debugger
     */
    maximize () {
      this.$refs.window.classList.add('maximized')
      this.$refs.window.classList.remove('minimized')
      this.isMinimized = false
      this.isMaximized = true
    },

    /**
     * Restore the debugger to its normal size
     */
    restore () {
      this.$refs.window.classList.remove('maximized', 'minimized')
      this.isMinimized = false
      this.isMaximized = false      
    }
  }
}
</script>