<template lang="pug">
  v-container
    v-card(color='indigo')
      v-card-text
        v-layout(wrap)
          v-row
            v-col.col-12.col-sm-4
              v-card
                v-card-title Best
            v-col.col-12.col-sm-4
              v-card
                v-card-title Score
            v-col.col-12.col-sm-4
              v-card
                v-card-title Time

        v-layout
          v-row
            v-col.md-6
        v-card(color='indigo lighten-3' style='max-width: 500px; margin: auto')
          v-card-text
            v-layout
              v-row(dense)
                v-col.col-3(v-for='index in 16' :key='index')
                  v-card(style="height: 80px;" ref='tile' @click='clickedTile(index - 1)' :color='tiles[index - 1] | tileColor(index)')
</template>

<script>
import { random } from 'lodash'

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

  data: () => ({
    tiles: Array.from({ length: 16 }, () => 0)
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
    clickedTile(index) {
      if (this.tiles[index] > 0) {
        this.setRandomTile()
        this.tiles[index] -= 1
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