<template>
<div id="handsfree-container">
  <div id="handsfree-debugger"></div>
</div>

</template>

<script>
export default {
  name: 'HandsfreeContainer',

  mounted () {
    import('@handsfree/handsfree.js').then(module => {
      const Handsfree = module.default
      window.handsfree = this.$root.handsfree = new Handsfree({
        assetsPath: '/handsfree/',
        weboji: true
      })
      window.app = this.$root
    })
  }
}
</script>