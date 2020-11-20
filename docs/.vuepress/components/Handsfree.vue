<template>
<div id="handsfree-container">
  <div id="handsfree-debugger"></div>
  <HandsfreeToggle id="main-handsfree-toggle"></HandsfreeToggle>
</div>

</template>

<script>
import HandsfreeToggle from '@components/HandsfreeToggle.vue'
export default {
  name: 'HandsfreeContainer',
  components: {HandsfreeToggle}
}
</script>