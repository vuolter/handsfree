<template>
<div>
  <button class="handsfree-show-when-stopped handsfree-hide-when-loading" onclick="handsfree.start()">Start Webcam</button>
  <button class="handsfree-show-when-loading" disabled>Loading...</button>
  <button class="handsfree-show-when-started" onclick="handsfree.stop()">Stop Webcam</button>
</div>
</template>

<script>
export default {
  name: 'HandsfreeToggle'
}
</script>