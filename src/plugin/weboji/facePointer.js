import { TweenMax } from 'gsap/all'

export default {
  models: 'weboji',

  tags: ['browser'],

  // The pointer element
  $pointer: null,

  // Pointers position
  pointer: { x: -20, y: -20 },

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

  onEnable () {
    if (!this.$pointer) {
      const $pointer = document.createElement('div')
      $pointer.classList.add('handsfree-pointer', 'handsfree-pointer-face', 'handsfree-hide-when-started-without-weboji')
      document.body.appendChild($pointer)
      this.$pointer = $pointer
    }

    this.$pointer?.classList.remove('handsfree-hidden')
  },

  onFrame (data) {
    // Get X/Y as if looking straight aweboji
    let x = data.translation[0] * window.outerWidth
    let y = window.outerHeight - data.translation[1] * window.outerHeight
    let z = (1 - data.translation[2]) * window.outerWidth * 2.5

    // Add pitch/yaw
    x +=
      z *
      Math.tan(data.rotation[1] + (this.config.offset.yaw * Math.PI) / 180) *
      this.config.speed.x

    y +=
      z *
        Math.tan(
          data.rotation[0] + (this.config.offset.pitch * Math.PI) / 180
        ) *
        this.config.speed.y -
      window.outerHeight

    // Add offsets
    x += this.config.offset.x
    y += this.config.offset.y

    // @todo Make the sensitivity variable
    TweenMax.to(this.tween, 1, {
      x,
      y,
      overwrite: true,
      ease: 'linear.easeNone',
      immediateRender: true
    })

    this.$pointer.style.left = `${this.tween.x}px`
    this.$pointer.style.top = `${this.tween.y}px`
    data.pointer = {
      x: this.tween.x,
      y: this.tween.y
    }
  },

  /**
   * Toggle pointer
   */
  onDisable () {
    this.$pointer?.classList.add('handsfree-hidden')
  }
}
