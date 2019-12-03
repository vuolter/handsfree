<template lang="pug">
  v-container
    v-layout(text-center wrap)
      v-row
        v-col(cols=12 md=6).mb-4
          div(style='width: 190px; height: 190px; margin: auto; position: relative').text-left
            TensorMonkey(height='150px' perspective='400px')

          h1.display-2.font-weight-bold.mb-5 Handsfree.js
          p
            <a href="https://github.com/handsfreejs/handsfree" class="mr-3"><img class="mr-1" src="https://img.shields.io/github/release-pre/handsfreejs/handsfree.svg"></a>
            <a href="https://github.com/handsfreejs/handsfree" class="mr-3"><img class="mr-1" src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg"></a>
            <a href="https://github.com/handsfreejs/handsfree"><img class="mr-1" src="https://img.shields.io/github/stars/handsfreejs/handsfree?style=social"></a>
          p
            small With support from the <a href="https://www.cmu.edu/cfa/studio/index.html">STUDIO for Creative Inquiry</a>, <a href="https://glitch.com/@handsfreejs">Glitch.com</a>, the <a href="https://youtu.be/CJDpF4xUieY?t=58">School of AI</a>, and you!
          p.subheading.font-weight-regular.text-left A wrapper library around web-based computer vision models for the purpose of interacting with the web handsfree. <b>Works with Chrome and Firefox!</b>
          p.my-5
            v-btn(v-if='isTracking' color='error' x-large @click='stopWebcam') Stop Webcam
            v-btn(v-else color='primary' x-large @click='startWebcam') Start Webcam
          p
            small Powered by:
          p
            a(href="https://github.com/jeeliz/jeelizWeboji")
              img(src="https://jeeliz.com/wp-content/uploads/2018/01/LOGO_JEELIZ_BLUE.png" height=30)

        v-col(cols=12 md=6).mb-4
          iframe(style='margin-top: 100px; max-width: 100%' width="560" height="315" src="https://www.youtube.com/embed/ty081LCcYpc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)

    v-layout(wrap)
      v-row.my-spread
        v-col.col-12.col-md-8.offset-md-2
          v-card
            v-card-title Quickstart
            v-card-text
              p By default, Handsfree.js is configured for browsing its page (scrolling, clicking, etc). Here's how to get that going quickly:
              pre
                code.xml(style='width: 100%; background: #2d2b57').
                 &lt;!DOCTYPE html&gt;
                  &lt;head&gt;
                    &lt;!-- Require dependencies --&gt;
                    &lt;script src="https://unpkg.com/handsfree@6.0.5/dist/handsfreejs/handsfree.js">&lt;/script&gt;
                    &lt;link rel="stylesheet" href="https://unpkg.com/handsfree@6.0.5/dist/handsfreejs/handsfree.css"&gt;
                  &lt;/head&gt;
                  &lt;body&gt;
                    &lt;script&gt;
                      // Create a new instance. Use one instance for each camera
                      const handsfree = new Handsfree({})

                      // Create a simple plugin that displays pointer values on every frame
                      Handsfree.use('consoleLogger', ({ head }) => {
                        console.log('Morphs: ', head.morphs)
                        console.log('Rotation: ', head.rotation)
                        console.log('Translation: ', head.translation)
                      })
                      
                      // Start tracking
                      handsfree.start()
                    &lt;/script&gt;
                  &lt;/body&gt;
            v-card-actions
              v-btn.primary(block href='https://github.com/handsfreejs/handsfree/wiki') Explore the docs

    v-layout(wrap)
      v-row.my-spread
        v-col.col-12
          h1 Tutorials
        v-col.col-12.col-md-6.col-lg-4
          v-card
            v-card-title Getting Started
            v-card-text
              ul.mb-5
                li Learn how to setup Handsfree.js
                li Explore the <code>handsfree.head.pointer</code> properties
              <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Wrote an introduction post to Handsfree.js on <a href="https://twitter.com/ThePracticalDev?ref_src=twsrc%5Etfw">@ThePracticalDev</a> : <a href="https://t.co/V7ecyaBtIJ">https://t.co/V7ecyaBtIJ</a><br><br>It (hopefully 😅) has everything you need to get started on adding &quot;face pointers&quot; or face controlled interactions to your apps and web pages, plus a quick roadmap of what&#39;s to come!</p>&mdash; Oz Ramos (@HeyOzRamos) <a href="https://twitter.com/HeyOzRamos/status/1192666398868164608?ref_src=twsrc%5Etfw">November 8, 2019</a></blockquote>
        v-col.col-12.col-md-6.col-lg-4
          v-card
            v-card-title YouTube 360
            v-card-text
              ul.mb-5
                li Explore the <code>handsfree.head.rotation</code>
              <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Added a more exciting 360 video so that you can really check out the handsfree controls: <a href="https://t.co/Lmbv5sTIJl">https://t.co/Lmbv5sTIJl</a><br><br>Also wrote a step-by-step tutorial on how to set this demo up with Handsfree.js: <a href="https://t.co/SDXOrpuncb">https://t.co/SDXOrpuncb</a><br><br>Day 6 of <a href="https://twitter.com/hashtag/100DaysofMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofMLCode</a> and <a href="https://twitter.com/hashtag/100DaysofCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofCode</a> <a href="https://t.co/cJkAP0CtWd">pic.twitter.com/cJkAP0CtWd</a></p>&mdash; Oz Ramos (@HeyOzRamos) <a href="https://twitter.com/HeyOzRamos/status/1193377112100503552?ref_src=twsrc%5Etfw">November 10, 2019</a></blockquote>
        v-col.col-12.col-md-6.col-lg-4
          v-card
            v-card-title Emojify
            v-card-text
              ul.mb-5
                li Explore the <code>handsfree.head.morphs</code>
                li Explore <code>handsfree.head.state</code>
              <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Finished the Face Emoji tutorial! This tutorial explores face morphs and activations to puppeteer 17 different emojis.<br><br>Tutorial: <a href="https://t.co/00gWBwJxrC">https://t.co/00gWBwJxrC</a><br>Demo: <a href="https://t.co/FUiLX0igsp">https://t.co/FUiLX0igsp</a><br><br>Day 8 of <a href="https://twitter.com/hashtag/100DaysofMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofMLCode</a> and <a href="https://twitter.com/hashtag/100DaysofCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofCode</a> <a href="https://t.co/RmgoayXulB">pic.twitter.com/RmgoayXulB</a></p>&mdash; Oz Ramos (@HeyOzRamos) <a href="https://twitter.com/HeyOzRamos/status/1194480061761519616?ref_src=twsrc%5Etfw">November 13, 2019</a></blockquote>
        v-col.col-12.col-md-6.col-lg-4
          v-card
            v-card-title Face paint with p5.js
            v-card-text
              ul.mb-5
                li Explores new v6 API
                li Explore <code>handsfree.head.state</code>
              <blockquote class="twitter-tweet"><p lang="en" dir="ltr">In this tutorial, we explore face painting with P5.js! Here&#39;s my attempt at a barn with chickens and trees 🏠🌳🌞<br><br>Tutorial: <a href="https://t.co/FhgzPovWeq">https://t.co/FhgzPovWeq</a><br>Demo: <a href="https://t.co/qV0aEcdNRL">https://t.co/qV0aEcdNRL</a><br><br>Day 2 of <a href="https://twitter.com/hashtag/100DaysofCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofCode</a> and <a href="https://twitter.com/hashtag/100DaysofMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofMLCode</a> <a href="https://t.co/XizZRB1162">pic.twitter.com/XizZRB1162</a></p>&mdash; Oz Ramos (@HeyOzRamos) <a href="https://twitter.com/HeyOzRamos/status/1201337876933496832?ref_src=twsrc%5Etfw">December 2, 2019</a></blockquote>

    v-layout(wrap)
      v-row.my-spread
        v-col.col-12
          h1 Experiments
        v-col.col-12.col-md-6.col-lg-4
          v-card
            v-card-title Desktop Control
            v-card-text
              ul.mb-5
                li Explore how to use Handsfree.js outside the browser
              <blockquote class="twitter-tweet"><p lang="en" dir="ltr">What if you could control your desktop with your face?<br><br>In this experiment I play Candy Crush handsfree by moving my mouse with my head and smirk to click. This uses Robot.js to control the desktop mouse. Code <br>+ tutorial soon!<br><br>Day 11 of <a href="https://twitter.com/hashtag/100DaysofMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofMLCode</a> and <a href="https://twitter.com/hashtag/100DaysofCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofCode</a> <a href="https://t.co/FVZ2IQRAwz">pic.twitter.com/FVZ2IQRAwz</a></p>&mdash; Oz Ramos (@HeyOzRamos) <a href="https://twitter.com/HeyOzRamos/status/1197722565646540800?ref_src=twsrc%5Etfw">November 22, 2019</a></blockquote>
        v-col.col-12.col-md-6.col-lg-4
          v-card
            v-card-title Virtual Keyboard
            v-card-text
              ul.mb-5
                li Explore how to use Handsfree.js with just the core plugins
                <blockquote class="twitter-tweet"><p lang="en" dir="ltr">What if you couldn&#39;t speak or type? In this demo I explore typing through a face pointer and virtual keyboard!<br><br>Demo: <a href="https://t.co/iM5YrLDg3u">https://t.co/iM5YrLDg3u</a><br><br>Day 1 of <a href="https://twitter.com/hashtag/100DaysofCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofCode</a>. I restarted because I took few weeks days off 😅: <a href="https://t.co/hPaVC1KRWC">https://t.co/hPaVC1KRWC</a> <a href="https://t.co/fMwkcA40QH">pic.twitter.com/fMwkcA40QH</a></p>&mdash; Oz Ramos (@HeyOzRamos) <a href="https://twitter.com/HeyOzRamos/status/1201001984209195009?ref_src=twsrc%5Etfw">December 1, 2019</a></blockquote>

    v-layout
      v-row.my-spread
        v-col.col-12.col-md-6.offset-md-3
          v-card
            v-card-title More coming soon ✨
            v-card-text
              p I'm still getting this project and documentation going, but here are some links in the meantime:
              ul
                li
                  a(href='https://dev.to/heyozramos') Tutorials with examples
                li
                  a(href='https://github.com/handsfreejs/handsfree') Handsfree.js GitHub
                li
                  a(href='https://twitter.com/heyozramos') Twitter @heyozramos
</template>

<script>
import TensorMonkey from '@/components/TensorMonkey'
import { mapState } from 'vuex'

export default {
  components: { TensorMonkey },

  computed: mapState(['isTracking']),

  mounted() {
    this.$store.dispatch('syntaxHighlight')
    this.$store.dispatch('loadScripts', [
      'https://platform.twitter.com/widgets.js'
    ])
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
