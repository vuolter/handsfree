<template lang="pug">
  v-container
    v-row
      v-col.col-12
        v-card
          v-card-title YouTube 360
          v-card-text
            p After pressing Start Webcam, move your head around to "look" around in the video handsfree!
            div(ref='youtubePlayer')
</template>

<script>
export default {
  mounted() {
    this.maybeInitVideo()
    this.resizePlayer()
    window.addEventListener('resize', this.resizePlayer)
  },

  destroyed() {
    window.removeEventListener('resize', this.resizePlayer)
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
        console.log('READY')
      } else {
        console.log('retrying...')
        setTimeout(() => {
          this.setupPlayer()
        }, 100)
      }
    },

    /**
     * Resizes the player ot be as tall as the display
     */
    resizePlayer() {
      const $player = this.$refs.youtubePlayer
      if ($player) $player.style.height = `${window.innerHeight - 250}px`
    }
  }
}
</script>