<template lang="pug">
  v-container
    v-row
      v-col.col-12.col-lg-4
        v-card
          v-card-title Emojify
          v-card-text
            p This demo explores the <code>handsfree.head.morphs</code> and <code>handsfree.head.state</code> properties to match an emoji to your face!
            h3.mb-3 How to use
            p Create different emojis by making different faces:<br>😐 😗 🙂 🤨 😏 😠 😡 😑 😙 😴 😊 😃 😂 😫 🤤 😮 😲 
          v-card-actions
            v-btn.primary(block href="https://dev.to/heyozramos/puppeteering-emojis-with-face-morphs-with-handsfree-js-55kp") View the tutorial
      v-col.col-12.col-lg-8
        v-card
          v-card-text
            h1#emoji(:style='emojiStyles') {{emoji}}
          v-card-text
            v-simple-table
              template(dense v-slot:default)
                tbody
                  tr
                    td Left Smile
                    td {{morphs.lSmile}}
                    td Right Smile
                    td {{morphs.rSmile}}
                  tr
                    td Left Brow Down
                    td {{morphs.lBrowDown}}
                    td Right Brow Down
                    td {{morphs.rBrowDown}}
                  tr
                    td Left Brow Up
                    td {{morphs.lBrowUp}}
                    td Right Brow Up
                    td {{morphs.rBrowUp}}
                  tr
                    td Mouth open
                    td {{morphs.mouthOpen}}
                    td Mouth round
                    td {{morphs.mouthRound}}
                  tr
                    td Left eye closed
                    td {{morphs.lEyeClosed}}
                    td Right eye closed
                    td {{morphs.rEyeClosed}}
                  tr
                    td Upper lip
                    td {{morphs.mouthNasty}}
</template>

<script>
export default {
  data: () => ({
    headPOV: [],
    emoji: '😀',
    morphs: {
      lSmile: 0,
      rSmile: 0,
      lBrowDown: 0,
      rBrowDown: 0,
      lBrowUp: 0,
      rBrowUp: 0,
      mouthOpen: 0,
      mouthRound: 0,
      lEyeClosed: 0,
      rEyeClosed: 0,
      mouthNasty: 0
    }
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

      let emoji = '😐'
      let isFlipped = false
      let state = instance.head.state

      if (state.pursed && state.mouthClosed) emoji = '😗'
      if (state.browsUp) emoji = '🙄'
      if (state.smile) emoji = '🙂'
      if (state.browsHuh && !state.pursed) {
        if (state.browRightUp) isFlipped = true
        emoji = '🤨'
      }
      if (state.smirk && state.browsUp) {
        if (state.smileLeft) isFlipped = true
        emoji = '😏'
      }
      if (state.browsDown) emoji = '😠'
      if (state.browsDown && state.pursed) emoji = '😡'
      if (state.eyesClosed) emoji = '😑'
      if (state.eyesClosed && state.pursed) emoji = '😙'
      if (state.eyesClosed && state.pursed && !state.mouthClosed) emoji = '😴'
      if (state.eyesClosed && state.smile) emoji = '😊'
      if (state.mouthOpen) emoji = '😃'
      if (state.mouthOpen && state.eyesClosed) emoji = '😫'
      if (state.mouthOpen && state.eyesClosed && state.browsUp) emoji = '😂'
      if (state.eyesClosed && state.browsHuh) {
        if (state.eyebrowLeftRight) isFlipped = true
        emoji = '🤤'
      }
      if (!state.mouthClosed && state.pursed) emoji = '😮'
      if (!state.mouthClosed && state.pursed && state.browsUp) emoji = '😲'

      this.emoji = emoji
      this.isFlipped = isFlipped
      this.morphs = {
        rSmile: instance.head.morphs[0].toFixed(5),
        lSmile: instance.head.morphs[1].toFixed(5),
        lBrowDown: instance.head.morphs[3].toFixed(5),
        rBrowDown: instance.head.morphs[2].toFixed(5),
        rBrowUp: instance.head.morphs[4].toFixed(5),
        lBrowUp: instance.head.morphs[5].toFixed(5),
        mouthOpen: instance.head.morphs[6].toFixed(5),
        mouthRound: instance.head.morphs[7].toFixed(5),
        rEyeClosed: instance.head.morphs[8].toFixed(5),
        lEyeClosed: instance.head.morphs[9].toFixed(5),
        mouthNasty: instance.head.morphs[10].toFixed(5)
      }
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
  font-size: 200px
  color: #000
  text-align: center
  margin-top: 120px
  margin-bottom: 120px
</style>