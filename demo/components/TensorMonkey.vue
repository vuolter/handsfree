<template lang="pug">
  div
    Logo.my-5(v-if='!isTracking' :style='computedStyles')
    .my-5(v-else :style='computedStyles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='computedStyles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='computedStyles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='computedStyles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='computedStyles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='computedStyles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='computedStyles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='computedStyles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='computedStyles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='computedStyles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='computedStyles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='computedStyles')
      Logo.ozramos-tensormonkey-animated.my-5(:style='computedStyles')
</template>

<script>
import Logo from '@/components/Logo'
import { mapState } from 'vuex'

export default {
  props: ['styles'],
  computed: {
    ...mapState(['isTracking']),
    computedStyles() {
      return (
        this.styles +
        ';' +
        `transform: perspective(1000px) rotateX(${this.pov.pitch}rad) rotateY(${this.pov.yaw}rad) rotateZ(${this.pov.roll}rad)`
      )
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
