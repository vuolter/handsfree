<template lang="pug">
  v-app
    v-navigation-drawer.d-print-none(v-model='sidebar.main' app)
      v-layout(column fill-height)
        v-list(dense)
          v-list-item(:to='{name: "Home"}' exact)
            v-list-item-action
              v-icon mdi-home
            v-list-item-content Home
          v-list-item(:to='{name: "SmileTiles"}')
            v-list-item-action
              v-icon mdi-emoticon-excited-outline
            v-list-item-content Smile Tiles
          v-list-item(:to='{name: "YouTube360"}')
            v-list-item-action
              v-icon mdi-youtube
            v-list-item-content YouTube 360
          v-list-item(:to='{name: "Emojify"}')
            v-list-item-action
              v-icon mdi-face-recognition
            v-list-item-content Emojify
          v-list-item(:to='{name: "1stPerson"}')
            v-list-item-action
              v-icon mdi-google-street-view
            v-list-item-content 1st Person View
          v-list-item(:to='{name: "FacePaint"}')
            v-list-item-action
              v-icon mdi-brush
            v-list-item-content Face Paint
          //- v-list-item(:to='{name: "Desktop"}')
          //-   v-list-item-action
          //-     v-icon mdi-laptop
          //-   v-list-item-content Desktop
        v-spacer
        div(ref='debuggerTarget')

    v-app-bar(app)
      v-app-bar-nav-icon.mr-3.d-print-none(@click.stop="sidebar.main = !sidebar.main")
      div.d-flex.align-center
        div(style='width: 60px')
          TensorMonkey.mr-3.ozramos-tensormonkey-mini(height='40px' perspective='5000px')
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

  computed: mapState(['isTracking', 'sidebar']),

  mounted() {
    // Setup handsfree
    this.$store.commit('set', [
      'handsfree',
      new window.Handsfree({
        debugger: {
          target: this.$refs.debuggerTarget
        }
      })
    ])
    window.App = this
    window.handsfree = this.$store.state.handsfree

    // Toggle sidebar (show on desktop, hide on mobile)
    // @fixem this stopped working with $nextTick
    setTimeout(() => {
      this.$store.commit('set', [
        'sidebar.main',
        this.$vuetify.breakpoint.lgAndUp
      ])
    }, 10)
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
