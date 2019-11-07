<template lang="pug">
  v-container
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
                v-card-title Time

        v-layout
          v-row
            v-col.md-6
        v-card(color='indigo lighten-2' style='max-width: 500px; margin: auto')
          v-card-text
            v-layout
              v-row(dense)
                v-col.col-3(v-for='index in 16' :key='index')
                  v-card(style="height: 80px;" ref='tile' @click='clickedTile(index - 1)' :color='tiles[index - 1] | tileColor(index)')
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

    ...mapState(['handsfree', 'isTracking'])
  },

  data: () => ({
    tiles: Array.from({ length: 16 }, () => 0),
    score: {
      current: 0,
      best: 0
    }
  }),

  /**
   * Choose 3 items on random
   */
  mounted() {
    window.view = this

    for (let i = 0; i < 3; i++) {
      this.setRandomTile()
    }
  },

  methods: {
    /**
     * Handle clicks with a debounce for accidental clicks
     */
    clickedTile: debounce(
      function(index) {
        if (this.handsfree.pointer.state === 'mouseDown' || !this.isTracking) {
          this.updateScore(index)

          if (this.tiles[index] > 0) {
            this.setRandomTile()
            this.tiles[index] -= 1
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
      } else if (this.tiles[index] === 1) {
        this.score.current += 10
      }

      // Update best score
      if (this.score.current > this.score.best) {
        this.score.best = this.score.current
      }
    },

    /**
     * Sets a random white tile to a random grid type
     */
    setRandomTile() {
      let index = random(0, 15)

      if (this.tiles[index]) {
        return this.setRandomTile()
      }

      this.$set(this.tiles, index, 1)
    }
  }
}
</script>