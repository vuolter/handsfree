<template lang="pug">
  v-app
    v-app-bar(app)
      div.d-flex.align-center
        TensorMonkey.mr-3(style='height: 40px')
        h1.title Handsfree.js<small style='font-size: 16px'>.org</small>
      v-spacer
      v-btn(color='primary') Start Webcam
    v-content
      router-view
</template>

<script>
import TensorMonkey from '@/components/TensorMonkey'
import '@/assets/js/handsfree'

export default {
  components: { TensorMonkey },

  data: () => ({
    //
  })
}
</script>
