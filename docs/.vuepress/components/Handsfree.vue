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
    if (!window.Handsfree) {
      import('@handsfree/handsfree.js').then(module => {
        const Handsfree = module.default
        window.Handsfree = Handsfree
        window.handsfree = this.$root.handsfree = new Handsfree({
          holistic: true,
          showDebug: true,
          setup: {
            wrap: {
              $target: document.querySelector('aside.sidebar')
            }
          },
          assetsPath: '/handsfree/'
        })
        window.app = this.$root
      })
    }
  }
}
</script>