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
      }rad) rotateY(${this.headPOV[1]}rad) rotateZ(${this.headPOV[2]}rad)`
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
      const morphs = instance.head.morphs
      // 😀😂😉😥😮😯😒😔😲😧😊😚🤨😐😏😯😡🤢
      let emoji = '😐'
      let thresholdLow = 0.25
      let threshold = 0.65
      let thresholdHigh = 0.8
      let isHappyLips = morphs[0] > threshold && morphs[1] > threshold
      let isSmirkingLips =
        (morphs[0] > thresholdHigh && morphs[1] < thresholdHigh) ||
        (morphs[0] < thresholdHigh && morphs[1] > thresholdHigh)
      let isMehLips = morphs[0] < threshold && morphs[0] < threshold
      let isOppositeBrow =
        (morphs[2] > thresholdHigh && morphs[5] > thresholdHigh) ||
        (morphs[3] > thresholdHigh && morphs[4] > thresholdHigh)
      let isBothBrowsDown = morphs[2] > thresholdLow && morphs[3] > thresholdLow
      let isBothBrowsUp = morphs[4] > thresholdLow && morphs[5] > thresholdLow
      let isWinking =
        (morphs[8] > thresholdHigh && morphs[9] < thresholdHigh) ||
        (morphs[8] < thresholdHigh && morphs[9] > thresholdHigh)

      if (isOppositeBrow && isMehLips && !isWinking) emoji = '🤨'
      if (isBothBrowsDown) emoji = '😡'
      if (morphs[6] > thresholdLow) emoji = '😮'
      if (isBothBrowsUp && morphs[6] > thresholdLow) emoji = '😲'
      if (isHappyLips) emoji = '🙂'
      if (isHappyLips && isBothBrowsUp) emoji = '😀'
      if (isWinking && (isHappyLips || isSmirkingLips)) emoji = '😉'

      this.emoji = emoji
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