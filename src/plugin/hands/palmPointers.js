/**
 * Move a pointer with your palm
 */
export default {
  models: 'hands',
  tags: ['browser'],
  enabled: false,

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
      y: 0
    },

    speed: {
      x: 1.5,
      y: 1.5
    }
  },

  onEnable () {
    if (!this.$pointer) {
      const $pointer = document.createElement('div')
      $pointer.classList.add('handsfree-pointer', 'handsfree-pointer-palm', 'handsfree-hide-when-started-without-hands')
      document.body.appendChild($pointer)
      this.$pointer = $pointer
    }

    this.$pointer?.classList.remove('handsfree-hidden')
    this.pointer = { x: -20, y: -20 }
  },

  onUse () {
    this.onEnable()
  },

  onFrame ({hands}) {
    if (!hands?.multiHandLandmarks) return
    
    this.handsfree.TweenMax.to(this.tween, 1, {
      x: window.outerWidth - hands.multiHandLandmarks[0][21].x * window.outerWidth + this.config.offset.x,
      y: hands.multiHandLandmarks[0][21].y * window.outerHeight + this.config.offset.y,
      overwrite: true,
      ease: 'linear.easeNone',
      immediate: true
    })

    this.$pointer.style.left = `${this.tween.x}px`
    this.$pointer.style.top = `${this.tween.y}px`
    
    hands.pointer = {
      x: this.tween.x,
      y: this.tween.y
    }
  },

  /**
   * Toggle pointer
   */
  onDisable() {
    this.$pointer?.classList.add('handsfree-hidden')
  }
}
