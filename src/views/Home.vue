<template lang="pug">
  v-container
    v-layout(text-center wrap)
      v-row
        v-col(cols=12 md=6).mb-4
          div(style='width: 190px; height: 190px; margin: auto; position: relative').text-left
            TensorMonkey.my-5(styles='height: 150px')
            canvas#tensormonkey-fireworks(ref='canvas' width=500 height=500)

          h1.display-2.font-weight-bold.mb-3 Handsfree.js
          p
            <a href="https://github.com/handsfreejs/handsfree" class="mr-3"><img class="mr-1" src="https://img.shields.io/github/stars/handsfreejs/handsfree?style=social"></a>
            <a href="https://github.com/handsfreejs/handsfree"><img class="mr-1" src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg"></a>
          p
            small With support from the <a href="https://www.cmu.edu/cfa/studio/index.html">STUDIO at CMU</a>, <a href="https://glitch.com/@handsfreejs">Glitch.com</a>, the <a href="https://youtu.be/CJDpF4xUieY?t=58">School of AI</a>, and you!
          p.subheading.font-weight-regular.text-left A wrapper library around web-based computer vision models for the purpose of interacting with the web handsfree. <b>Works with Chrome and Firefox</b>
          p.my-5
            v-btn(v-if='isTracking' color='error' x-large @click='stopWebcam') Stop Webcam
            v-btn(v-else color='primary' x-large @click='startWebcam') Start Webcam
          p
            small Powered by <a href="https://github.com/jeeliz/jeelizWeboji">Jeeliz Weboji</a>

        v-col(cols=12 md=6).mb-4
          iframe(style='margin-top: 100px; max-width: 100%' width="560" height="315" src="https://www.youtube.com/embed/ty081LCcYpc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)

    v-layout(wrap)
      v-row(style='margin-top: 100px; margin-bottom: 100px')
        v-col.col-12.col-md-8.offset-md-2
          v-card
            v-card-title Quickstart
            v-card-text
              p By default, Handsfree.js is configured for browsing it's page (scrolling, clicking, etc). Here's how to get that going quickly:
              pre
                code.xml(style='width: 100%; background: #2d2b57').
                 &lt;!DOCTYPE html&gt;
                  &lt;head&gt;
                    &lt;!-- Require dependencies --&gt;
                    &lt;script src="https://unpkg.com/handsfree@5.0.0/dist/handsfreejs/handsfree.js">&lt;/script&gt;
                    &lt;link rel="stylesheet" href="https://unpkg.com/handsfree@5.0.0/dist/handsfreejs/handsfree.css"&gt;
                  &lt;/head&gt;
                  &lt;body&gt;
                    &lt;script&gt;
                      // Create a new instance. Use one instance for each camera
                      const handsfree = new Handsfree({})

                      // Create a simple plugin that displays pointer values on every frame
                      Handsfree.use('consoleLogger', (pointer, context) =&gt; {
                        console.log(pointer)
                      })
                      
                      // Start tracking
                      handsfree.start()
                    &lt;/script&gt;
                  &lt;/body&gt;
            v-card-actions
              v-btn.primary(block href='https://www.notion.so/heyozramos/Handsfree-js-53625c4866564421918e4941d9f370dc') Explore the docs

    v-layout
      v-row(style='margin-top: 100px; margin-bottom: 100px')
        v-col.col-12.col-md-6.offset-md-3
          v-card
            v-card-title More coming soon ✨
            v-card-text
              p I'm still getting this project and documentation going, but here are some links in the meantime:
              ul
                li
                  a(href='https://twitter.com/heyozramos') Twitter @heyozramos
                li
                  a(href='https://github.com/handsfreejs/handsfree') GitHub
</template>

<script>
import TensorMonkey from '@/components/TensorMonkey'
import anime from 'animejs/lib/anime.es.js'
import { mapState } from 'vuex'

export default {
  components: { TensorMonkey },

  computed: mapState(['isTracking']),

  watch: {
    isTracking() {
      const ctx = this.$refs.canvas.getContext('2d')

      this.animateFireworks(250, 250, ctx)
      anime({ duration: 250 }).finished.then()
    }
  },

  mounted() {
    this.$store.dispatch('syntaxHighlight')

    const ctx = this.$refs.canvas.getContext('2d')
    anime({
      duration: Infinity,
      update: () => {
        ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
      }
    })
  },

  methods: {
    startWebcam() {
      this.$store.dispatch('startTracking')
    },
    stopWebcam() {
      this.$store.dispatch('stopTracking')
    },

    /**
     * Animate fireworks
     */
    animateFireworks(x, y, ctx) {
      var circle = this.createCircle(x, y, ctx)
      var particules = []
      for (var i = 0; i < 500; i++) {
        particules.push(this.createParticle(x, y, ctx))
      }
      anime
        .timeline()
        .add({
          targets: particules,
          x: function(p) {
            return p.endPos.x
          },
          y: function(p) {
            return p.endPos.y
          },
          radius: 0.1,
          duration: anime.random(1200, 1800),
          easing: 'easeOutExpo',
          update: this.renderParticle
        })
        .add({
          targets: circle,
          radius: anime.random(80, 160),
          lineWidth: 0,
          alpha: {
            value: 0,
            easing: 'linear',
            duration: anime.random(600, 800)
          },
          duration: anime.random(1200, 1800),
          easing: 'easeOutExpo',
          update: this.renderParticle,
          offset: 0
        })
    },

    createCircle(x, y, ctx) {
      var p = {}
      p.x = x
      p.y = y
      p.color = '#FFF'
      p.radius = 0.1
      p.alpha = 0.5
      p.lineWidth = 6
      p.draw = function() {
        ctx.globalAlpha = p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
        ctx.lineWidth = p.lineWidth
        ctx.strokeStyle = p.color
        ctx.stroke()
        ctx.globalAlpha = 1
      }
      return p
    },

    createParticle(x, y, ctx) {
      const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']

      var p = {}
      p.x = x
      p.y = y
      p.color = colors[anime.random(0, colors.length - 1)]
      p.radius = anime.random(16, 32)
      p.endPos = this.setParticleDirection(p)
      p.draw = function() {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
        ctx.fillStyle = p.color
        ctx.fill()
      }
      return p
    },

    setParticleDirection(p) {
      var angle = (anime.random(0, 360) * Math.PI) / 180
      var value = anime.random(50, 180)
      var radius = [-1, 1][anime.random(0, 1)] * value
      return {
        x: p.x + radius * Math.cos(angle),
        y: p.y + radius * Math.sin(angle)
      }
    },

    renderParticle(anim) {
      for (var i = 0; i < anim.animatables.length; i++) {
        anim.animatables[i].target.draw()
      }
    }
  }
}
</script>

<style lang="sass">
#tensormonkey-fireworks
  position: absolute
  width: 500px
  height: 500px
  top: -150px
  left: -150px
</style>