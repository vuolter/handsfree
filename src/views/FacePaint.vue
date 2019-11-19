<template lang="pug">
  div
    #canvas(ref='canvas')
    v-container
      v-row
        v-col.col-12.col-lg-4
          v-card
            v-card-title Face Paint
            v-card-text
              p This experiment explores the <code>handsfree.pose.head.state</code> properties to help you paint handsfree!
              ul
                li Smile to the right to paint with primary color
                li Smile to the left to paint with secondary color
                li Lean in/out to change brush size
</template>

<script>
export default {
  data: () => ({
    offsetLeft: 0,
    p5: {}
  }),

  mounted() {
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

      window.Handsfree.use('p5.facePaint', ({ pose }) => {
        if (!this.p5) return

        lastX = x
        lastY = y
        x = pose.head.pointer.x
        y = pose.head.pointer.y

        if (pose.head.state.smirk) {
          this.p5.line(x, y, lastX, lastY)
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