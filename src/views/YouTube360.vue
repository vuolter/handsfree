<template lang="pug">
  v-container
    v-row
      v-col.col-12.col-lg-4
        v-card
          v-card-title YouTube 360
          v-card-text
            p This demo explores the <code>handsfree.head.rotation</code> properties to control a 360 video's POV with your head
              <br>(I apologize for the ad)
            h3.mb-3 How to use
            p After pressing Start Webcam, move your head around to "look" around in the video handsfree. <b>Try it full screen!</b>
          v-card-actions
            v-btn(block color='primary' href="https://dev.to/heyozramos/controlling-youtube-360-videos-handsfree-2801") View the Tutorial
      v-col.col-12.col-lg-8
        v-card
          v-card-text
            div(ref='youtubePlayerWrap')
              #youtube-player
</template>

<script>
import { TweenMax } from 'gsap/all'

export default {
  data: () => ({
    // The YouTube player object
    YTPlayer: null,

    // Contains the smoothened out POV values
    tween: {}
  }),

  mounted() {
    this.maybeInitVideo()
    this.resizePlayer()
    window.addEventListener('resize', this.resizePlayer)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizePlayer)
    window.Handsfree.disable('youtube360')
  },

  methods: {
    /**
     * - Adds Youtube Iframe api if it hasn't been added yet
     * @see https://developers.google.com/youtube/iframe_api_reference
     */
    maybeInitVideo() {
      if (!this.$store.state.dependenciesLoaded.youtubeIframe) {
        const $script = document.createElement('script')
        $script.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild($script)
        this.$store.commit('set', ['dependenciesLoaded.youtubeIframe', true])
      }

      this.setupPlayer()
    },

    /**
     * Recursively calls this method until the YouTube Iframe API is ready, then sets it up
     */
    setupPlayer() {
      if (window.YT && window.YT.Player) {
        this.YTPlayer = new window.YT.Player('youtube-player', {
          // Picked because of no ads
          // @see https://www.youtube.com/watch?v=Crv1hbk9HuM&list=PLxf-CDjxvNVoxF27Pj3VV5pIy4SsqPNcI&index=5&t=0s
          // videoId: 'Crv1hbk9HuM',

          // Blue Angles (has ad)
          videoId: 'H6SsB3JYqQg'
        })
        this.handleHandsfree()
      } else {
        setTimeout(() => {
          this.setupPlayer()
        }, 100)
      }
    },

    /**
     * Setup the handsfree controls
     */
    handleHandsfree() {
      window.Handsfree.use('youtube360', ({ pose }) => {
        if (!this.YTPlayer || !document.contains(this.YTPlayer.a)) return
        this.YTPlayer.getSphericalProperties &&
          this.YTPlayer.setSphericalProperties(this.tween)

        this.tweenPOV(pose)
      })
    },

    /**
     * Smoothens out the POV
     */
    tweenPOV(pose) {
      TweenMax.to(this.tween, 500 / 1000, {
        pitch: ((-pose.head.rotation[0] * 180) / Math.PI) * 8 + 90,
        yaw: ((-pose.head.rotation[1] * 180) / Math.PI) * 10,
        roll: ((pose.head.rotation[2] * 180) / Math.PI) * 2,
        ease: 'Linear.easeNone',
        overwrite: true,
        immediate: true
      })
    },

    /**
     * Resizes the player ot be as tall as the display
     */
    resizePlayer() {
      const $player = this.$refs.youtubePlayerWrap
      if ($player) $player.style.height = `${window.innerHeight - 150}px`
    }
  }
}
</script>

<style lang="sass">
#youtube-player
  width: 100%
  height: 100%
  position: relative
  z-index: 9999999
</style>