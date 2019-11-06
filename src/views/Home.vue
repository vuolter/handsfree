<template lang="pug">
  v-container
    v-layout(text-center wrap)
      v-flex.xs12
        TensorMonkey.my-5(style='height: 150px')

      v-flex.xs12.md6.offset-md-3.mb-4
        h1.display-2.font-weight-bold.mb-3 Handsfree.js
        p
          <a href="https://github.com/handsfreejs/handsfree" class="mr-3"><img class="mr-1" src="https://img.shields.io/github/stars/handsfreejs/handsfree?style=social"></a>
          <a href="https://github.com/handsfreejs/handsfree"><img class="mr-1" src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg"></a>
        p
          small With support from the <a href="https://www.cmu.edu/cfa/studio/index.html">STUDIO at CMU</a>, <a href="https://glitch.com/@handsfreejs">Glitch.com</a>, the <a href="https://youtu.be/CJDpF4xUieY?t=58">School of AI</a>, and you!
        p.subheading.font-weight-regular.text-left A wrapper library around web-based computer vision models for the purpose of interacting with the web handsfree. <b>Works with Chrome and Firefox</b>
        p.my-5
          v-btn(v-if='isTracking' color='error' x-large @click='stopWebcam') Stop Webcam
          v-btn(v-else color='primary' x-large @click='startWebcam') Start Webcam
        p
          small Powered by <a href="https://github.com/jeeliz/jeelizWeboji">Jeeliz Weboji</a>
</template>

<script>
import TensorMonkey from '@/components/TensorMonkey'
import { mapState } from 'vuex'

export default {
  components: { TensorMonkey },

  computed: mapState(['isTracking']),

  methods: {
    startWebcam() {
      this.$store.dispatch('startTracking')
    },
    stopWebcam() {
      this.$store.dispatch('stopTracking')
    }
  }
}
</script>
