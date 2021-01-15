/**
 * Move a pointer with your palm
 */
export default {
  models: 'hands',
  tags: ['browser'],
  enabled: false,

  // The pointer element
  $pointer: [],

  // Pointers position
  pointer: [
    { x: -20, y: -20, isVisible: false },
    { x: -20, y: -20, isVisible: false },
    { x: -20, y: -20, isVisible: false },
    { x: -20, y: -20, isVisible: false }
  ],

  // Used to smoothen out the pointer
  tween: [
    {x: -20, y: -20},
    {x: -20, y: -20},
    {x: -20, y: -20},
    {x: -20, y: -20},
  ],

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
    if (!this.$pointer[0]) {
      for (let i = 0; i < 4; i++) {
        const $pointer = document.createElement('div')
        $pointer.classList.add('handsfree-pointer', 'handsfree-pointer-palm', 'handsfree-hide-when-started-without-hands')
        document.body.appendChild($pointer)
        this.$pointer[i] = $pointer
      }
    }

    for (let i = 0; i < 4; i++) {
      this.$pointer[i].classList.remove('handsfree-hidden')
      this.pointer[i] = { x: -20, y: -20 }
    }
  },

  onUse () {
    this.onEnable()
  },

  onFrame ({hands}) {
    if (!hands?.multiHandLandmarks) return
    hands.pointer = [
      { isVisible: false },
      { isVisible: false },
      { isVisible: false },
      { isVisible: false }
    ]
    
    hands.multiHandLandmarks.forEach((landmarks, n) => {
      // Use the correct hand index
      let hand
      if (n < 2) {
        hand = hands.multiHandedness[n].label === 'Right' ? 0 : 1
      } else {
        hand = hands.multiHandedness[n].label === 'Right' ? 2 : 3
      }

      this.handsfree.TweenMax.to(this.tween[hand], 1, {
        x: window.outerWidth - hands.multiHandLandmarks[n][21].x * window.outerWidth + this.config.offset.x,
        y: hands.multiHandLandmarks[n][21].y * window.outerHeight + this.config.offset.y,
        overwrite: true,
        ease: 'linear.easeNone',
        immediate: true
      })
  
      this.$pointer[hand].style.left = `${this.tween[hand].x}px`
      this.$pointer[hand].style.top = `${this.tween[hand].y}px`
      
      hands.pointer[hand] = {
        x: this.tween[hand].x,
        y: this.tween[hand].y,
        isVisible: true
      }
    })

    // Toggle pointers
    hands.pointer.forEach((pointer, hand) => {
      if (pointer.isVisible) {
        this.$pointer[hand].style.display = 'block'
      } else {
        this.$pointer[hand].style.display = 'none'
      }
    })
  },

  /**
   * Toggle pointer
   */
  onDisable() {
    this.$pointer.forEach($pointer => {
      $pointer.classList.add('handsfree-hidden')
    })
  }
}
