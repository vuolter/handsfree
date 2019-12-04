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

          v-card.mt-5
            v-card-text
              <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Started on last tutorial, which shows how to use head position to move around in 3D by leaning (and using eyebrows to jump)!<br><br>Day 9 of <a href="https://twitter.com/hashtag/100DaysofCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofCode</a> and <a href="https://twitter.com/hashtag/100DaysofMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofMLCode</a> <a href="https://t.co/4QRABhzFUn">pic.twitter.com/4QRABhzFUn</a></p>&mdash; Oz Ramos (@HeyOzRamos) <a href="https://twitter.com/HeyOzRamos/status/1194866956991524864?ref_src=twsrc%5Etfw">November 14, 2019</a></blockquote>
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
    this.$store.dispatch('loadScripts', [
      'https://platform.twitter.com/widgets.js'
    ])

    if (!window.THREE) {
      this.$store.dispatch('loadScripts', [
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/109/three.min.js'
      ])
    }
    this.initializeGame()
    this.setupHandsfree()
    window.Handsfree.disable('head.vertScroll')
  },

  beforeDestroy() {
    window.Handsfree.enable('head.vertScroll')
    window.Handsfree.disable('head.threeCamera')
    endTheWorld()
  },

  methods: {
    /**
     * Sets up handsfree
     */
    setupHandsfree() {
      window.Handsfree.use('head.threeCamera', ({ head }) => {
        // The normalized amount from center to lean before moving in that directon
        let strafeBuffer = 0.15
        let leanBuffer = {
          out: 0.1,
          in: 0.01
        }

        // Strafe
        if (head.translation[0] > 0.5 + strafeBuffer) this.move.right = true
        else this.move.right = false

        if (head.translation[0] < 0.5 - strafeBuffer) this.move.left = true
        else this.move.left = false

        // Lean
        if (head.translation[2] > 0.25 + leanBuffer.out)
          this.move.forward = true
        else this.move.forward = false

        if (head.translation[2] < 0.25 - leanBuffer.in)
          this.move.backward = true
        else this.move.backward = false

        // Jump
        if (head.state.browsUp) {
          if (this.move.jump) this.velocity.y += 350
          this.move.jump = false
        }

        this.tweenPOV(head)
      })
    },

    /**
     * Tweetn values
     */
    tweenPOV(head) {
      TweenMax.to(this.rotation, 500 / 1000, {
        x: -head.rotation[0] * 8 + Math.PI / 2,
        y: -head.rotation[1] * 10,
        z: head.rotation[2] * 2,
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
