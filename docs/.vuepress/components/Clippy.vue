<template lang="pug">
  div
</template>

<script>
import clippy from 'clippyjs'

/**
 * Our interactive mascot
 * @see https://github.com/pi0/clippyjs#readme
 */
export default {
  name: 'Clippy',

  mounted () {
    window.clippy = clippy
    clippy.load('Merlin', agent => {
      window.agent = agent
      agent.show()
      agent.play('Announce')
    })
  }
}
</script>