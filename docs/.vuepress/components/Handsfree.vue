<template>
<div id="handsfree-container">
  <div id="handsfree-debugger"></div>
  <HandsfreeToggle id="main-handsfree-toggle"></HandsfreeToggle>
</div>

</template>

<script>
import Handsfree from '@handsfree/handsfree.js'
import HandsfreeToggle from '@components/HandsfreeToggle.vue'
export default {
  name: 'HandsfreeContainer',
  components: {HandsfreeToggle},

  mounted () {
    window.handsfree = this.$root.handsfree = new Handsfree({
      assetsPath: '/handsfree/',
      weboji: true
    })
    window.app = this.$root
  }
}
</script>