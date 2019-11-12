<template lang="pug">
  v-container
    v-row
      v-col.col-12.col-lg-4
        v-card
          v-card-title YouTube 360
          v-card-text
            p This demo explores the <code>handsfree.head.morphs</code> properties to match an emoji to your face!
            h3.mb-3 How to use
            p Create different emojis by making different faces: 😐 🙂 😮 😲 😉 😡 
      v-col.col-12.col-lg-8
        v-card
          v-card-text
            h1#emoji(:style='emojiStyles') {{emoji}}
</template>

<script>
export default {
  data: () => ({
    headPOV: [],
    emoji: '😀'
  }),

  computed: {
    emojiStyles() {
      return `transform: perspective(1000px) rotateX(${
        this.headPOV[0]
      }rad) rotateY(${this.headPOV[1]}rad) rotateZ(${
        this.headPOV[2]
      }rad) scale(${this.isFlipped ? -1 : 1}, 1)`
    }
  },

  mounted() {
    window.Handsfree.disable('vertScroll')
    window.Handsfree.use('emojify', (pointer, instance) => {
      // Map the head rotation
      this.$set(this.headPOV, 0, -instance.head.rotation[0])
      this.$set(this.headPOV, 1, instance.head.rotation[1])
      this.$set(this.headPOV, 2, -instance.head.rotation[2])
      /*
      0: smileRight → closed mouth smile right
      1: smileLeft → closed mouth smile left
      2: eyeBrowLeftDown → eyebrow left frowned
      3: eyeBrowRightDown → eyebrow right frowned
      4: eyeBrowLeftUp → eyebrow left up (surprised)
      5: eyeBrowRightUp → eyebrow right up (surprised)
      6: mouthOpen → mouth open
      7: mouthRound → mouth round
      8: eyeRightClose → close right eye
      9: eyeLeftClose → close left eye
      10: mouthNasty → mouth nasty (upper lip raised)
     */
      let emoji = '😐'
      let isFlipped = false

      if (instance.head.state.pursed) emoji = '😗'
      if (instance.head.state.smile) emoji = '🙂'
      if (instance.head.state.eyebrowsHuh && !instance.head.state.pursed) {
        if (instance.head.state.eyebrowUpRight) isFlipped = true
        emoji = '🤨'
      }
      if (instance.head.state.smirk && instance.head.state.eyebrowsUp) {
        if (instance.head.state.smileLeft) isFlipped = true
        emoji = '😏'
      }
      if (instance.head.state.eyebrowsDown) emoji = '😠'
      if (instance.head.state.eyebrowsDown && instance.head.state.pursed)
        emoji = '😡'
      if (instance.head.state.eyesClosed) emoji = '😑'
      if (instance.head.state.eyesClosed && instance.head.state.pursed)
        emoji = '😙'
      if (instance.head.state.eyesClosed && instance.head.state.smile)
        emoji = '😊'

      this.emoji = emoji
      this.isFlipped = isFlipped
    })
  },

  beforeDestroy() {
    window.Handsfree.disable('emojify')
    window.Handsfree.enable('vertScroll')
  }
}
</script>

<style lang="sass" scoped>
#emoji
  font-size: 256px
  color: #000
  text-align: center
  margin-top: 150px
  margin-bottom: 150px
</style>