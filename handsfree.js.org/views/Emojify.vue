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

        v-card.mt-5
          v-card-text
            <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Finished the Face Emoji tutorial! This tutorial explores face morphs and activations to puppeteer 17 different emojis.<br><br>Tutorial: <a href="https://t.co/00gWBwJxrC">https://t.co/00gWBwJxrC</a><br>Demo: <a href="https://t.co/FUiLX0igsp">https://t.co/FUiLX0igsp</a><br><br>Day 8 of <a href="https://twitter.com/hashtag/100DaysofMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofMLCode</a> and <a href="https://twitter.com/hashtag/100DaysofCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofCode</a> <a href="https://t.co/RmgoayXulB">pic.twitter.com/RmgoayXulB</a></p>&mdash; Oz Ramos (@HeyOzRamos) <a href="https://twitter.com/HeyOzRamos/status/1194480061761519616?ref_src=twsrc%5Etfw">November 13, 2019</a></blockquote>

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
    this.$store.dispatch('loadScripts', [
      'https://platform.twitter.com/widgets.js'
    ])

    window.Handsfree.disable('head.vertScroll')
    window.Handsfree.use('head.emojify', ({ head }) => {
      // Map the head rotation
      this.$set(this.headPOV, 0, -head.rotation[0])
      this.$set(this.headPOV, 1, head.rotation[1])
      this.$set(this.headPOV, 2, -head.rotation[2])

      let emoji = '😐'
      let isFlipped = false
      let state = head.state

      if (state.pursed && state.mouthClosed) emoji = '😗'
      if (state.browsUp) emoji = '🙄'
      if (state.smile) emoji = '🙂'
      if (state.browsUpDown && !state.pursed) {
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
      if (state.eyesClosed && state.browsUpDown) {
        if (state.eyebrowLeftRight) isFlipped = true
        emoji = '🤤'
      }
      if (!state.mouthClosed && state.pursed) emoji = '😮'
      if (!state.mouthClosed && state.pursed && state.browsUp) emoji = '😲'

      this.emoji = emoji
      this.isFlipped = isFlipped
      this.morphs = {
        rSmile: head.morphs[0].toFixed(5),
        lSmile: head.morphs[1].toFixed(5),
        lBrowDown: head.morphs[3].toFixed(5),
        rBrowDown: head.morphs[2].toFixed(5),
        rBrowUp: head.morphs[4].toFixed(5),
        lBrowUp: head.morphs[5].toFixed(5),
        mouthOpen: head.morphs[6].toFixed(5),
        mouthRound: head.morphs[7].toFixed(5),
        rEyeClosed: head.morphs[8].toFixed(5),
        lEyeClosed: head.morphs[9].toFixed(5),
        mouthNasty: head.morphs[10].toFixed(5)
      }
    })
  },

  beforeDestroy() {
    window.Handsfree.disable('head.emojify')
    window.Handsfree.enable('head.vertScroll')
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