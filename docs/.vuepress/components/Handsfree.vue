<template>
<div id="handsfree-debugger"></div>
</template>

<script>
import Handsfree from '@handsfree/handsfree.js'
window.Handsfree = Handsfree
window.handsfree = new Handsfree({
  assetsPath: 'handsfree/',
  weboji: true
})

export default {
  name: 'HandsfreeDebugger'
}
</script>