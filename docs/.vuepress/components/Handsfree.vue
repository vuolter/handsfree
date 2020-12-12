<template lang="pug">
#handsfree-container
  #handsfree-debugger
</template>

<script>
/**
 * A global component designed to setup Handsfree.js
 */
export default {
  name: 'HandsfreeContainer',

  mounted () {
    import('@handsfree/handsfree.js').then(module => {
      const Handsfree = module.default
      window.Handsfree = Handsfree
      window.handsfree = this.$root.handsfree = new Handsfree({
        holistic: true,
        showFeed: true,
        assetsPath: '/handsfree/'
      })
      window.app = this.$root
    })
  }
}
</script>