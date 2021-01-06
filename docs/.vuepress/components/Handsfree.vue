<template lang="pug">
#handsfree-container
  #handsfree-debugger

  //- This will be moved into the Navbar
  #navbar-handsfree-toggle
    HandsfreeToggle.handsfree-show-when-started(:opts='opts' text-off='Activate Handsfree Mode' text-on='Stop Handsfree')

  //- This will be moved into the sidebar
  Window#handsfree-debug-window.handsfree-show-when-started.handsfree-hide-when-not-debugging.mb-0(title='Debugger' :minimize='true' :maximize='true')
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
        handpose: false,
        facemesh: false
      },
      
      hasMovedToggle: false,
      isMaximized: false,
      isMinimized: false
    }
  },

  mounted () {
    if (!this.hasMovedToggle) {
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
          8.1.2

https://github.com/midiblocks/handsfree
https://github.com/sponsors/midiblocks
`)
      
        // Import Handsfree
        // - Don't start with any models since they will be loaded by examples
        if (!window.Handsfree) {
          import('@handsfree/handsfree.js').then(module => {
            const Handsfree = module.default
            window.Handsfree = Handsfree
            window.handsfree = this.$root.handsfree = new Handsfree({
              showDebug: true,
              setup: {
                wrap: {
                  $parent: document.querySelector('#handsfree-debug-window .window-body')
                }
              },
              assetsPath: '/handsfree'
            })
            window.app = this.$root

            // Move toggle and window
            document.querySelector('header.navbar > .links').appendChild(
              document.querySelector('#navbar-handsfree-toggle')
            )
            
            // Move the sidebar
            document.querySelector('aside.sidebar').appendChild(
              document.querySelector('#handsfree-debug-window')
            )
          })
        }
        this.hasMovedToggle = true
      }, 50)
    }
  },

  methods: {
    startDemo () {
      this.$root.handsfree.update(this.opts)
    }
  }
}
</script>