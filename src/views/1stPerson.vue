<template lang="pug">
  div
    #world
    v-container
      v-row
        v-col.col-12.col-lg-4
          v-card
            v-card-title 1st Person View
            v-card-text
              p This experiment explores the <code>handsfree.head.translation</code> properties to move the camera based on the direction you lean in.
              ul
                li Lean in/back/left/right to move in that direction
                li Turn head around to look around
                li Raise both eyebrows to jump.
</template>

<script>
import { TweenMax } from 'gsap/all'
let endTheWorld

export default {
  data: () => ({
    move: {
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: true
    },

    velocity: {
      y: 0
    },

    rotation: {
      x: 0,
      y: 0
    }
  }),

  mounted() {
    if (!window.THREE) {
      this.$store.dispatch('loadScripts', [
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/109/three.min.js'
      ])
    }
    this.initializeGame()
    this.setupHandsfree()
    window.Handsfree.disable('vertScroll')
  },

  beforeDestroy() {
    window.Handsfree.enable('vertScroll')
    window.Handsfree.disable('threeCamera')
    endTheWorld()
  },

  methods: {
    /**
     * Sets up handsfree
     */
    setupHandsfree() {
      window.Handsfree.use('threeCamera', ({ pose }) => {
        // The normalized amount from center to lean before moving in that directon
        let strafeBuffer = 0.15
        let leanBuffer = {
          out: 0.1,
          in: 0.01
        }

        // Strafe
        if (pose.head.translation[0] > 0.5 + strafeBuffer)
          this.move.right = true
        else this.move.right = false

        if (pose.head.translation[0] < 0.5 - strafeBuffer) this.move.left = true
        else this.move.left = false

        // Lean
        if (pose.head.translation[2] > 0.25 + leanBuffer.out)
          this.move.forward = true
        else this.move.forward = false

        if (pose.head.translation[2] < 0.25 - leanBuffer.in)
          this.move.backward = true
        else this.move.backward = false

        // Jump
        if (pose.head.state.browsUp) {
          if (this.move.jump) this.velocity.y += 350
          this.move.jump = false
        }

        this.tweenPOV(pose)
      })
    },

    /**
     * Tweetn values
     */
    tweenPOV(pose) {
      TweenMax.to(this.rotation, 500 / 1000, {
        x: -pose.head.rotation[0] * 8 + Math.PI / 2,
        y: -pose.head.rotation[1] * 10,
        z: pose.head.rotation[2] * 2,
        ease: 'Linear.easeNone',
        overwrite: true,
        immediate: true
      })
    },

    /**
     * Load pointer lock controls
     */
    initializeGame() {
      setTimeout(() => {
        if (!window.THREE) {
          this.initializeGame()
        } else {
          const { initWorld, endWorld } = require('./js/1stPersonSetup')
          initWorld(this)
          endTheWorld = endWorld
        }
      }, 100)
    }
  }
}
</script>

<style lang="sass" scoped>
#world
  width: 100%
  position: absolute
</style>