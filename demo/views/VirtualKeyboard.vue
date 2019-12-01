<template lang="pug">
  div
    v-container
      v-layout
        v-row
          v-col.col-12.col-lg-4
            v-card
              v-card-title Virtual Keyboard 
              v-card-text
                p This demo explores the idea of typing on a virtual keyboard with face gestures.
          
          v-col.col-12.col-lg-8
            v-card
              v-card-title Input
              v-card-text
                v-textarea#input(background-color='grey darken-4' dark filled ref='input' @input='onInputChange' :value='input' placeholder='Tap the keys on the virtual keyboard to start')
      v-layout
        v-row
          v-col.col-12
            SimpleKeyboard(@onChange='onChange' @onKeyPress='onChange' :input='input')
</template>

<script>
import SimpleKeyboard from '@/components/SimpleKeyboard'
import { throttle } from 'lodash'

export default {
  components: { SimpleKeyboard },

  data: () => ({
    input: ''
  }),

  /**
   * Maps an eyebrow to backspace
   */
  mounted() {
    let Component = this

    window.Handsfree.use('demo.eyebrowBackspace', {
      onFrame({ head }) {
        if (head.state.browLeftUp || head.state.browRightUp) {
          this.backSpace()
        }
      },

      backSpace: throttle(
        function() {
          if (Component.input.length)
            Component.input = Component.input.slice(0, -1)
        },
        500,
        { trailing: false }
      )
    })
  },

  beforeDestroy() {
    window.Handsfree.disable('demo.eyebrowBackspace')
  },

  methods: {
    onInputChange(input) {
      this.input = input
    },

    onChange(input) {
      this.input = input
    }
  }
}
</script>