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
     * Attempts to instantiate the video repeteadly until it works
     */
    maybeInitVideo() {
      console.log('maybeInitVideo')
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