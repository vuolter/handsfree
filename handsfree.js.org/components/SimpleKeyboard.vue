<template lang="pug">
  div(:class="keyboardClass")
</template>

<script>
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'

export default {
  name: 'SimpleKeyboard',

  props: {
    keyboardClass: { default: 'simple-keyboard', type: String },
    input: { type: String }
  },

  data: () => ({
    keyboard: null
  }),

  watch: {
    input(input) {
      this.keyboard.setInput(input)
    }
  },

  mounted() {
    this.keyboard = new Keyboard({
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      useMouseEvents: true
    })
  },

  methods: {
    onChange(input) {
      this.$emit('onChange', input)
    },

    onKeyPress(button) {
      this.$emit('onKeyPress', button)
      // If you want to handle the shift and caps lock buttons
      if (button === '{shift}' || button === '{lock}') this.handleShift()
    },

    handleShift() {
      let currentLayout = this.keyboard.options.layoutName
      let shiftToggle = currentLayout === 'default' ? 'shift' : 'default'
      this.keyboard.setOptions({
        layoutName: shiftToggle
      })
    }
  }
}
</script>

<style>
body .simple-keyboard.hg-theme-default .hg-button {
  height: 60px;
  color: #000;
}
</style>
