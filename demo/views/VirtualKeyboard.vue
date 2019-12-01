<template lang="pug">
  div
    v-container
      v-layout
        v-row
          v-col.col-12.col-lg-4
            v-card
              v-card-title Virtual Keyboard 
              v-card-text
                p This demo explores the idea of typing on a virtual keyboard with face gestures.
          v-col.col-12
            SimpleKeyboard
</template>

<script>
import SimpleKeyboard from '@/components/SimpleKeyboard'

export default {
  components: { SimpleKeyboard }
}
</script>