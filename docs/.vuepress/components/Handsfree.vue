<template>
<div id="handsfree-container">
  <div id="handsfree-debugger"></div>
  <HandsfreeToggle id="main-handsfree-toggle"></HandsfreeToggle>
</div>

</template>

<script>
import HandsfreeToggle from '@components/HandsfreeToggle.vue'

import Handsfree from '@handsfree/handsfree.js'
window.Handsfree = Handsfree
window.handsfree = new Handsfree({
  assetsPath: '/handsfree/',
  weboji: true
})

export default {
  name: 'HandsfreeContainer',

  components: {HandsfreeToggle}
}
</script>