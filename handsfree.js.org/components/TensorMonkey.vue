<template lang="pug">
  div(:style='computedStyles')
    Logo(v-if='!isTracking' :style='styles')
    template(v-else)
      Logo.ozramos-tensormonkey-animated.my-5(:style='styles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='styles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='styles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='styles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='styles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='styles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='styles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='styles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='styles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='styles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='styles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='styles')
</template>

<script>
import Logo from '@/components/Logo'
import { mapState } from 'vuex'

export default {
  props: ['styles', 'height', 'perspective'],
  computed: {
    ...mapState(['isTracking']),
    computedStyles() {
      return `transform: rotateX(${this.pov.pitch}rad) rotateY(${this.pov.yaw}rad) rotateZ(${this.pov.roll}rad); transform-origin: center center; height: ${this.height}; perspective: ${this.perspective}; transform-style: preserve-3d`
    }
  },
  components: { Logo },
  data: () => ({
    id: Math.random(),
    pov: {
      pitch: 0,
      yaw: 0,
      roll: 0
    }
  }),

  mounted() {
    this.id = Math.random()

    window.Handsfree.use(`tensormonkey.puppet-${this.id}`, ({ head }) => {
      this.pov.pitch = -head.rotation[0]
      this.pov.yaw = head.rotation[1]
      this.pov.roll = -head.rotation[2]
    })
  },

  beforeDestroy() {
    window.Handsfree.disable(`tensormonkey.puppet-${this.id}`)
  }
}
</script>
