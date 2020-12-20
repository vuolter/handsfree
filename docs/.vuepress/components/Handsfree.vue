<template lang="pug">
#handsfree-container
  #handsfree-debugger

  //- This will be moved into the Navbar
  #navbar-handsfree-toggle
    HandsfreeToggle.handsfree-show-when-started(:opts='opts' text-off='Activate Handsfree Mode' text-on='Stop Handsfree')
    //- button.handsfree-show-when-started-without-hands.handsfree-hide-when-loading(@click='startDemo')
    //-   Fa-Video
    //-   | Scroll page with hands

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
      opts: {
        weboji: false,
        hands: true,
        pose: false,
        holistic: false,
        facemesh: false
      },
      
      hasMovedToggle: false,
      isMaximized: false,
      isMinimized: false
    }
  },

  mounted () {
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
              8.0.4

Repo: https://github.com/midiblocks/handsfree
Discord: https://discord.gg/TWemTd85
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
              hands: true,
              // holistic: true,
              // facemesh: true,
              // pose: true,
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
      const $window = document.querySelector('#handsfree-debug-window')
      
      $window.classList.add('minimized')
      $window.classList.remove('maximized')
      this.isMinimized = true
      this.isMaximized = false
    },

    /**
     * Maximize the debugger
     */
    maximize () {
      const $window = document.querySelector('#handsfree-debug-window')
      
      $window.classList.add('maximized')
      $window.classList.remove('minimized')
      this.isMinimized = false
      this.isMaximized = true
    },

    /**
     * Restore the debugger to its normal size
     */
    restore () {
      const $window = document.querySelector('#handsfree-debug-window')
      
      $window.classList.remove('maximized', 'minimized')
      this.isMinimized = false
      this.isMaximized = false      
    },

    startDemo () {
      this.$root.handsfree.update(this.opts)
    }
  }
}
</script>