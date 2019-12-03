<template lang="pug">
  div
    #canvas(ref='canvas')
    v-container
      v-row
        v-col.col-12.col-lg-4
          v-card
            v-card-title Face Paint
            v-card-text
              p This experiment explores the <code>handsfree.head.state</code> properties to help you paint handsfree!
              ul
                li Smile to the right to paint with primary color
                li Smile to the left to paint with secondary color
                li Raise both eyebrowse to clear canvas

          v-card.mt-5
            v-card-text
              <blockquote class="twitter-tweet"><p lang="en" dir="ltr">It&#39;s supposed to be a smiley face 😅<br><br>Goal is to improve the face pointer so that you can easily draw basic shapes. With TensorFlow.js these shapes can become gestures which you can then map to custom functions! <a href="https://t.co/NF7nCmEVtx">pic.twitter.com/NF7nCmEVtx</a></p>&mdash; Oz Ramos (@HeyOzRamos) <a href="https://twitter.com/HeyOzRamos/status/1196632750071042048?ref_src=twsrc%5Etfw">November 19, 2019</a></blockquote>
</template>

<script>
export default {
  data: () => ({
    offsetLeft: 0,
    p5: {}
  }),

  mounted() {
    this.$store.dispatch('loadScripts', [
      'https://platform.twitter.com/widgets.js'
    ])

    if (!window.p5) {
      this.$store.dispatch('loadScripts', [
        'https://cdn.jsdelivr.net/npm/p5@0.10.2/lib/p5.js'
      ])
    }
    this.initializeP5()
  },

  methods: {
    /**
     * Initialize the P5 library, namespacing it into this.p5
     */
    initializeP5() {
      setTimeout(() => {
        if (!window.p5) {
          this.initializeP5()
        } else {
          this.p5 = new window.p5((p) => {
            p.setup = () => {
              const canvas = p.createCanvas(
                this.$refs.canvas.clientWidth,
                this.$refs.canvas.clientHeight
              )
              canvas.parent(this.$refs.canvas)
              p.strokeWeight(6)
            }

            this.setupHandsfree()
          })
        }
      })
    },

    /**
     * Sets Handsfree.js plugin up
     */
    setupHandsfree() {
      let x = 0
      let y = 0
      let lastX = 0
      let lastY = 0

      window.Handsfree.use('p5.facePaint', ({ head }) => {
        if (!this.p5) return

        lastX = x
        lastY = y
        x = head.pointer.x + 4
        y = head.pointer.y + 4

        // Draw line
        if (head.state.smileLeft) this.p5.stroke(0, 255, 0)
        if (head.state.smileRight) this.p5.stroke(0, 0, 0)
        if (head.state.smile) this.p5.stroke(255, 0, 0)

        if (head.state.smirk || head.state.smile) {
          this.p5.line(x, y, lastX, lastY)
        }

        // Clear canvas
        if (head.state.browsUp) {
          this.p5.clear()
        }
      })
    }
  }
}
</script>

<style lang="sass">
#canvas
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 1

  + div
    position: relative
    z-index: 2
</style>