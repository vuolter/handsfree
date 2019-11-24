<template lang="pug">
  v-container
    v-row
      v-col.col-12.col-lg-4
        v-card
          v-card-title Desktop
          v-card-text
            v-alert(color='warning') This demo only works alongside the <a href="https://github.com/handsfreejs/handsfree-desktop">handsfree-desktop server</a>
            h3.mb-3 How to use
            p Once you have the handsfree-desktop server running:
            ul
              li Move head to move mouse
              li Smirk to one side to click
      v-col.col-12.col-lg-8
        v-card
          v-card-text
            <blockquote class="twitter-tweet"><p lang="en" dir="ltr">What if you could control your desktop with your face?<br><br>In this experiment I play Candy Crush handsfree by moving my mouse with my head and smirk to click. This uses Robot.js to control the desktop mouse. Code <br>+ tutorial soon!<br><br>Day 11 of <a href="https://twitter.com/hashtag/100DaysofMLCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofMLCode</a> and <a href="https://twitter.com/hashtag/100DaysofCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysofCode</a> <a href="https://t.co/FVZ2IQRAwz">pic.twitter.com/FVZ2IQRAwz</a></p>&mdash; Oz Ramos (@HeyOzRamos) <a href="https://twitter.com/HeyOzRamos/status/1197722565646540800?ref_src=twsrc%5Etfw">November 22, 2019</a></blockquote>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('loadScripts', [
      'https://platform.twitter.com/widgets.js'
    ])

    window.Handsfree.use('desktopClient', {
      onUse() {
        this.ws = new WebSocket('ws://localhost:8081')
      },

      onFrame({ head }) {
        this.ws.send(
          JSON.stringify({
            status: 'moveMouse',
            x: head.pointer.x,
            y: head.pointer.y
          })
        )

        if (head.pointer.state === 'mouseDown') {
          this.ws.send(
            JSON.stringify({
              status: 'mouseClick'
            })
          )
        }
      }
    })
  },

  beforeDestroy() {
    window.Handsfree.disable('desktopClient')
  }
}
</script>