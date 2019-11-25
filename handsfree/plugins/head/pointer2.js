import { TweenMax } from 'gsap/all'

window.Handsfree.use('head.pointer2', {
  // The pointer element
  $pointer: null,
  tween: {
    x: 0,
    y: 0,
    positionList: []
  },

  /**
   * Create a pointer for each user
   */
  onUse({ head }) {
    // @FIXME make this a config
    const NUMUSERS = 1
    head.pointer = { x: 0, y: 0 }

    if (!this.$pointer) {
      for (let i = 0; i < NUMUSERS; i++) {
        const $pointer = document.createElement('div')
        $pointer.classList.add('handsfree-pointer')
        document.body.appendChild($pointer)
        head.pointer.$el = this.$pointer = $pointer
      }
    }
  },

  onFrame({ head }) {
    // Get X/Y as if looking straight ahead
    let x = head.translation[0] * window.outerWidth
    let y = window.outerHeight - head.translation[1] * window.outerHeight
    let z = (1 - head.translation[2]) * window.outerWidth * 2.5

    // Add pitch/yaw
    x += z * Math.tan(head.rotation[1])
    y += z * Math.tan(head.rotation[0]) - window.outerHeight / 2

    // @todo Make the sensetivity variable
    TweenMax.to(this.tween, 1, {
      x,
      y,
      overwrite: true,
      ease: 'linear.easeNone',
      immediate: true
    })

    this.$pointer.style.left = `${this.tween.x}px`
    this.$pointer.style.top = `${this.tween.y}px`
    head.pointer.x = this.tween.x
    head.pointer.y = this.tween.y
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
})
