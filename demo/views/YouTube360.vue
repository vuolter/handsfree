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

        v-card.mt-5
          v-card-text
            <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Added a more exciting 360 video so that you can really check out the handsfree controls: <a href="https://t.co/Lmbv5sTIJl">https://t.co/Lmbv5sTIJl</a><br><br>Also wrote a step-by-step tutorial on how to set this demo up with Handsfree.js: <a href="https://t.co/SDXOrpuncb">https://t.co/SDXOrpuncb</a><br><br>Day 6 of <a href="https://twitter.com/hashtag/100DaysofMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofMLCode</a> and <a href="https://twitter.com/hashtag/100DaysofCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofCode</a> <a href="https://t.co/cJkAP0CtWd">pic.twitter.com/cJkAP0CtWd</a></p>&mdash; Oz Ramos (@HeyOzRamos) <a href="https://twitter.com/HeyOzRamos/status/1193377112100503552?ref_src=twsrc%5Etfw">November 10, 2019</a></blockquote>

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
    this.$store.dispatch('loadScripts', [
      'https://platform.twitter.com/widgets.js'
    ])
    window.Handsfree.disable('head.vertScroll')

    this.maybeInitVideo()
    this.resizePlayer()
    window.addEventListener('resize', this.resizePlayer)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizePlayer)
    window.Handsfree.disable('youtube360')
    window.Handsfree.enable('head.vertScroll')
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
      window.Handsfree.use('youtube360', ({ head }) => {
        if (!this.YTPlayer || !document.contains(this.YTPlayer.a)) return
        this.YTPlayer.getSphericalProperties &&
          this.YTPlayer.setSphericalProperties(this.tween)

        this.tweenPOV(head)
      })
    },

    /**
     * Smoothens out the POV
     */
    tweenPOV(head) {
      TweenMax.to(this.tween, 500 / 1000, {
        pitch: ((-head.rotation[0] * 180) / Math.PI) * 8 + 90,
        yaw: ((-head.rotation[1] * 180) / Math.PI) * 10,
        roll: ((head.rotation[2] * 180) / Math.PI) * 2,
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