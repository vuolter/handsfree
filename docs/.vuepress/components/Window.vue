<template lang="pug">
.window.window-component.mb-md(ref='window')
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
    hasMaximize: false,
    isMinimize: false,
    isMaximize: false,
  }),

  /**
   * Setup toolbar items
   */
  mounted () {
    this.hasMinimize = !!this.$listeners.minimize
    this.hasMaximize = !!this.$listeners.maximize
  },

  methods: {
    /**
     * Handle window resize
     */
    minimize () {
      this.$emit('minimize')

      this.$refs.window.classList.add('minimized')
      this.$refs.window.classList.remove('maximized')
      this.isMinimized = true
      this.isMaximized = false
    },

    maximize () {
      this.$emit('maximize')

      this.$refs.window.classList.add('maximized')
      this.$refs.window.classList.remove('minimized')
      this.isMinimized = false
      this.isMaximized = true
    },
    
    restore () {
      this.$emit('restore')

      this.$refs.window.classList.remove('maximized', 'minimized')
      this.isMinimized = false
      this.isMaximized = false      
    },
  }
}
</script>