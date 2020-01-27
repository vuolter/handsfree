import { TweenMax } from 'gsap/all'

window.Handsfree.use('weboji.pointer', {
  // The pointer element
  $pointer: null,
  tween: {
    x: 0,
    y: 0,
    positionList: []
  },

  config: {
    offset: {
      x: 0,
      y: 0
    },

    speed: {
      x: 1,
      y: 1
    }
  },

  /**
   * Create a pointer for each user
   */
  onUse({ weboji }) {
    // @FIXME make this a config
    const NUMUSERS = 1
    weboji.pointer = { x: 0, y: 0 }

    if (!this.$pointer) {
      for (let i = 0; i < NUMUSERS; i++) {
        const $pointer = document.createElement('div')
        $pointer.classList.add('handsfree-pointer')
        document.body.appendChild($pointer)
        weboji.pointer.$el = this.$pointer = $pointer
      }
    }
  },

  onFrame({ weboji }) {
    // Get X/Y as if looking straight aweboji
    let x = weboji.translation[0] * window.outerWidth
    let y = window.outerHeight - weboji.translation[1] * window.outerHeight
    let z = (1 - weboji.translation[2]) * window.outerWidth * 2.5

    // Add pitch/yaw
    x += z * Math.tan(weboji.rotation[1]) * this.config.speed.x
    y +=
      z * Math.tan(weboji.rotation[0]) * this.config.speed.y -
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
      immediate: true
    })

    this.$pointer.style.left = `${this.tween.x}px`
    this.$pointer.style.top = `${this.tween.y}px`
    weboji.pointer.x = this.tween.x
    weboji.pointer.y = this.tween.y
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
