<template>
<div>
  <button class="handsfree-show-when-stopped handsfree-hide-when-loading" @click='start'><Fa-Video /> <span>{{textOff}}</span></button>
  <button class="handsfree-show-when-loading" disabled><Fa-Spinner :spin='true' /> <span>Loading...</span></button>
  <button class="handsfree-show-when-started negative" @click='stop'><Fa-VideoSlash /> <span>{{textOn}}</span></button>
</div>
</template>

<script>
/**
 * @emits started Called when Handsfree.js has been started from this component
 */
export default {
  name: 'HandsfreeToggle',

  props: ['textOff', 'textOn'],

  methods: {
    start () {
      this.$handsfree.start(() => {
        this.$emit('started')
      })
    },

    stop () {
      this.$handsfree.stop()
    }
  }
}
</script>