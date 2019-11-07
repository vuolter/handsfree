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
                  v-card(style="height: 80px;" ref='tile' @click='clickedTile(index)')
</template>

<script>
export default {
  methods: {
    clickedTile(index) {
      console.log('clicked', index)
    }
  }
}
</script>