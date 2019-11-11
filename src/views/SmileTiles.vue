<template lang="pug">
  v-container
    v-layout
      v-row
        v-col.col-12.col-lg-4
          v-card
            v-card-title Smile Tiles
            v-card-text
              p This demo explores the <code>handsfree.pointer.state</code> property to handle clicking on tiles.

              h3.mb-3 How to Play
              ul
                li Click on the black tiles to start or increase the timer
                li Click on white tiles to restart
                li Beat my high score of 80 😎
        v-col.col-12.col-lg-8
          v-card(:color='backgroundColor')
            v-card-text
              v-layout(wrap)
                v-row
                  v-col.col-12.col-sm-4
                    v-card
                      v-card-title Best: {{score.best}}
                  v-col.col-12.col-sm-4
                    v-card
                      v-card-title Score: {{score.current}}
                  v-col.col-12.col-sm-4
                    v-card
                      v-card-title Time: {{currentTime}}

              v-layout
                v-row
                  v-col.md-6
              v-card(color='indigo lighten-2' style='max-width: 500px; margin: auto')
                v-card-text
                  v-layout
                    v-row(dense)
                      v-col.col-3(v-for='index in 16' :key='index')
                        v-card(style="height: 80px;" ref='tile' @click='clickedTile(index - 1)' :color='tiles[index - 1] | tileColor(index)')
                          v-card-title(v-if='tiles[index - 1] > 1' style='color: #fff; text-align: center') {{tiles[index - 1]}}
</template>

<script>
import { random, debounce } from 'lodash'
import { mapState } from 'vuex'

export default {
  filters: {
    tileColor(tileValue) {
      let color = 'white'

      if (tileValue) {
        color = 'black'
      }

      return color
    }
  },

  computed: {
    backgroundColor() {
      return !this.score.current ? 'pink darken-3' : 'indigo'
    },

    currentTime() {
      return this.timer > 0 ? this.timer : 0
    },

    ...mapState(['isTracking'])
  },

  watch: {
    timer() {
      if (this.timer < 0) {
        this.score.current = 0
      }
    }
  },

  data: () => ({
    tiles: Array.from({ length: 16 }, () => 0),
    timerInterval: null,
    timer: 0,
    score: {
      current: 0,
      best: 0
    }
  }),

  /**
   * - Choose 3 items on random
   * - Create the timer interval
   */
  mounted() {
    window.view = this
    this.timerInterval = setInterval(() => {
      this.timer -= 1
    }, 100)

    for (let i = 0; i < 3; i++) {
      this.setRandomTile()
    }
  },

  /**
   * Destroy the timer
   */
  beforeDestroy() {
    clearInterval(this.timerInterval)
  },

  methods: {
    /**
     * Handle clicks with a debounce for accidental clicks
     */
    clickedTile: debounce(
      function(index) {
        if (
          this.$store.state.handsfree.pointer.state === 'mouseDown' ||
          !this.isTracking
        ) {
          this.updateScore(index)

          if (this.tiles[index] > 0) {
            this.$set(this.tiles, index, this.tiles[index] - 1)
            if (this.tiles[index] === 0) this.setRandomTile(index)
          }
        }
      },
      100,
      { leading: true }
    ),

    /**
     * Updates the score based on the type of the tile
     */
    updateScore(index) {
      // Update the score
      if (this.tiles[index] === 0) {
        this.score.current = 0
        this.timer = 0
      } else if (this.tiles[index]) {
        this.score.current += 10

        if (this.timer < 0) {
          this.timer = 20
        } else {
          this.timer += 9
        }
      }

      // Update best score
      if (this.score.current > this.score.best) {
        this.score.best = this.score.current
      }
    },

    /**
     * Sets a random white tile to a random grid type
     */
    setRandomTile(ignoreIndex = -1) {
      let index = random(0, 15)

      // Keep repeating until we have a valid tile
      if (this.tiles[index] || ignoreIndex === index) {
        return this.setRandomTile(ignoreIndex)
      }

      let tileType = Math.random() * 100

      if (tileType < 90) {
        this.$set(this.tiles, index, 1)
      } else {
        this.$set(this.tiles, index, 3)
      }
    }
  }
}
</script>