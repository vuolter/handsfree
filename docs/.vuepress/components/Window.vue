<template lang="pug">
.window.mb-md
  .title-bar(v-if='hasTitlebar')
    .title-bar-text(v-if='title') {{title}}
    .title-bar-controls(v-if='hasTitlebarControls')
      button(v-if='hasMinimize' aria-label='Minimize' @click='minimize')
      button(v-if='hasMaximize || hasMinimize' aria-label='Restore' @click='restore')
      button(v-if='hasMaximize' aria-label='Maximize' @click='maximize')
  .window-body
    slot
</template>

<script>
export default {
  name: 'Window',

  props: ['title'],

  computed: {
    hasTitlebar () {
      return this.hasTitlebarControls || this.$props.title
    },
    hasTitlebarControls () {
      return this.hasMaximize
    }
  },

  data: () => ({
    hasMinimize: false,
    hasMaximize: false
  }),

  /**
   * Setup toolbar items
   */
  mounted () {
    this.hasMinimize = !!this.$listeners.minimize
    this.hasMaximize = !!this.$listeners.maximize
  },

  methods: {
    minimize () {this.$emit('minimize')},
    maximize () {this.$emit('maximize')},
    restore () {this.$emit('restore')},
  }
}
</script>