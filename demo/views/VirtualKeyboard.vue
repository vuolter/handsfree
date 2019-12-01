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
            SimpleKeyboard(@onChange='onChange' :input='input')
</template>

<script>
import SimpleKeyboard from '@/components/SimpleKeyboard'

export default {
  components: { SimpleKeyboard },

  data: () => ({
    input: ''
  }),

  methods: {
    onInputChange(input) {
      this.input = input.target.value
    },

    onChange(input) {
      this.input = input
    }
  }
}
</script>