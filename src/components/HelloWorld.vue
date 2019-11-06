<template lang="pug">
  v-container
    v-layout(text-center wrap)
      v-flex.xs12
        v-img.my-3(:src="require('../assets/logo.svg')" contain height="200")

      v-flex.xs12.md6.offset-md-3.mb-4
        h1.display-2.font-weight-bold.mb-3 Handsfree.js
        p
          small With support from <a href="https://glitch.com/@handsfreejs">Glitch.com</a>, the <a href="https://www.cmu.edu/cfa/studio/index.html">STUDIO at CMU</a>, the <a href="https://youtu.be/CJDpF4xUieY?t=58">School of AI</a>, and you!
        p.subheading.font-weight-regular
          | A wrapper library around web-based computer vision models for the purpose of interacting with the web handsfree
</template>

<script>
export default {
  data: () => ({})
}
</script>
