<template lang="pug">
  v-app
    v-app-bar(app)
      div.d-flex.align-center
        TensorMonkey.mr-3(style='height: 40px')
        h1.title Handsfree.js<small style='font-size: 16px'>.org</small>
      v-spacer
      v-btn(v-if='isTracking' color='error' @click='stopWebcam') Stop Webcam
      v-btn(v-else color='primary' @click='startWebcam') Start Webcam
    v-content
      router-view
</template>

<script>
import TensorMonkey from '@/components/TensorMonkey'
import { mapState } from 'vuex'

export default {
  components: { TensorMonkey },

  computed: mapState(['handsfree', 'isTracking']),

  data: () => ({}),

  mounted() {
    this.$store.commit('set', ['handsfree', new window.Handsfree()])
    window.App = this
    window.handsfree = this.handsfree
  },

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
