<template lang="pug">
  div
    TensorMonkey.my-5(v-if='!isTracking' :style='styles')
    .my-5(v-else :style='styles')
      TensorMonkey.ozramos-tensormonkey-animated.my-5(:style='styles')
      TensorMonkey.ozramos-tensormonkey-animated.my-5(:style='styles')
      TensorMonkey.ozramos-tensormonkey-animated.my-5(:style='styles')
      TensorMonkey.ozramos-tensormonkey-animated.my-5(:style='styles')
      TensorMonkey.ozramos-tensormonkey-animated.my-5(:style='styles')
      TensorMonkey.ozramos-tensormonkey-animated.my-5(:style='styles')
      TensorMonkey.ozramos-tensormonkey-animated.my-5(:style='styles')
      TensorMonkey.ozramos-tensormonkey-animated.my-5(:style='styles')
      TensorMonkey.ozramos-tensormonkey-animated.my-5(:style='styles')
      TensorMonkey.ozramos-tensormonkey-animated.my-5(:style='styles')
      TensorMonkey.ozramos-tensormonkey-animated.my-5(:style='styles')
      TensorMonkey.ozramos-tensormonkey-animated.my-5(:style='styles')
</template>

<script>
import TensorMonkey from '@/components/Logo'
import { mapState } from 'vuex'

export default {
  props: ['styles'],
  computed: mapState(['isTracking']),
  components: { TensorMonkey }
}
</script>
