<template lang="pug">
  v-app
    v-navigation-drawer.d-print-none(v-model='sidebar.main' app)
      v-layout(column fill-height)
        v-list(dense)
          v-list-item(:to='{name: "Home"}' exact)
            v-list-item-action
              v-icon mdi-home
            v-list-item-content Home
          v-list-group(prepend-icon='mdi-gamepad-variant-outline')
            template(v-slot:activator)
              v-list-item-content Experiments
            v-list-item(:to='{name: "SmileTiles"}')
              v-list-item-action
                v-icon mdi-emoticon-excited-outline
              v-list-item-content Smile Tiles
        v-spacer
        div(ref='debuggerTarget')

    v-app-bar(app)
      div.d-flex.align-center
        div(style='width: 60px')
          TensorMonkey.mr-3.ozramos-tensormonkey-mini(styles='height: 40px')
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

  computed: mapState(['handsfree', 'isTracking', 'sidebar']),

  data: () => ({}),

  mounted() {
    this.$store.commit('set', [
      'handsfree',
      new window.Handsfree({
        debugger: {
          target: this.$refs.debuggerTarget
        }
      })
    ])
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
