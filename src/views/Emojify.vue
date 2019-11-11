<template lang="pug">
  v-container
    v-row
      v-col.col-12
        v-card
          v-card-title Emojify
          v-card-text
            p Create different emojis by making different faces. How many can you find?
            h1(style='font-size: 256px; color: #000; text-align: center; margin-top: 150px; margin-bottom: 150px') {{emoji}}
</template>

<script>
export default {
  data: () => ({
    emoji: '😀'
  }),

  mounted() {
    window.Handsfree.use('emojify', (pointer, instance) => {
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
      if (isWinking && (isHappyLips || isSmirkingLips)) emoji = '😉'
      if (morphs[6]) emoji = '😮'
      if (isBothBrowsUp && morphs[6]) emoji = '😲'
      if (morphs[0] > thresholdLow && morphs[1] > thresholdLow) emoji = '🙂'

      this.emoji = emoji
    })
  },

  beforeDestroy() {
    window.Handsfree.disable('emojify')
  }
}
</script>