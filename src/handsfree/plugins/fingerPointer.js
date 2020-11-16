import { TweenMax } from 'gsap/all'

export default {
  // The pointer element
  $pointer: null,

  // Pointers position
  pointer: { x: 0, y: 0 },

  // Used to smoothen out the pointer
  tween: {
    x: 0,
    y: 0,
    positionList: []
  },

  config: {
    offset: {
      x: 0,
      y: 0,
      // A little nudge for when camera is above screen
      pitch: -15,
      yaw: -12,
      roll: 0
    },

    speed: {
      x: 1,
      y: 1
    }
  },

  /**
   * Create a pointer for each user
   */
  onUse() {
    if (!this.$pointer) {
      const $pointer = document.createElement('div')
      $pointer.classList.add('handsfree-pointer')
      document.body.appendChild($pointer)
      this.$pointer = $pointer
    }

    this.pointer = { x: 0, y: 0 }
  },

  onEnable() {
    this.onUse()
  },

  onFrame({ handpose }) {
    if (!handpose || !handpose.annotations) return

    this.handsfree.handpose.updateMeshes(handpose)
    this.handsfree.handpose.three.renderer.render(this.handsfree.handpose.three.scene, this.handsfree.handpose.three.camera)
    console.log('1', handpose.annotations.indexFinger)
    
    // Get X/Y as if pointing perfectly in the center
    // let x = this.handsfree.normalize(handpose.annotations.indexFinger[0][0], window.outerWidth)
    // let y = this.handsfree.normalize(handpose.annotations.indexFinger[0][1], window.outerHeight)
    // let z = 1 - handpose.annotations.indexFinger[0][2]

    // Add pitch/yaw
    // x +=
    //   z *
    //   Math.tan(weboji.rotation[1] + (this.config.offset.yaw * Math.PI) / 180) *
    //   this.config.speed.x

    // y +=
    //   z *
    //     Math.tan(
    //       weboji.rotation[0] + (this.config.offset.pitch * Math.PI) / 180
    //     ) *
    //     this.config.speed.y -
    //   window.outerHeight

    // // Add offsets
    // x += this.config.offset.x
    // y += this.config.offset.y

    // // @todo Make the sensitivity variable
    // TweenMax.to(this.tween, 1, {
    //   x,
    //   y,
    //   overwrite: true,
    //   ease: 'linear.easeNone',
    //   immediate: true
    // })

    // this.$pointer.style.left = `${this.tween.x}px`
    // this.$pointer.style.top = `${this.tween.y}px`
    // weboji.pointer = {
    //   x: this.tween.x,
    //   y: this.tween.y
    // }
  },

  /**
   * Toggle pointer
   */
  onDisable() {
    this.$pointer.classList.add('handsfree-hidden')
  },
  onEnable() {
    this.$pointer.classList.remove('handsfree-hidden')
  }
}
