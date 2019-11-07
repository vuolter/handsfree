<template lang="pug">
  v-container
    v-layout(text-center wrap)
      v-row
        v-col(cols=12 md=6).mb-4
          div(style='width: 190px; height: 190px; margin: auto; position: relative').text-left
            TensorMonkey.my-5(styles='height: 150px')

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
import { mapState } from 'vuex'

export default {
  components: { TensorMonkey },

  computed: mapState(['isTracking']),

  mounted() {
    this.$store.dispatch('syntaxHighlight')
  },

  methods: {
    startWebcam() {
      this.$store.dispatch('startTracking')
    },
    stopWebcam() {
      this.$store.dispatch('stopTracking')
    }
  }
}
</script>
