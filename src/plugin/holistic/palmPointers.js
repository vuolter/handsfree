/**
 * Move a pointer with your palm
 */
import { TweenMax } from 'gsap/all'

export default {
  models: 'holistic',

  tags: ['browser'],

  // The pointer elements
  $pointer: [],

  // Pointers position
  pointer: [{ x: -20, y: -20 }, { x: -20, y: -20 }],

  // Used to smoothen out the pointer
  tween: [
    {
      x: 0,
      y: 0,
      positionList: []
    },
    {
      x: 0,
      y: 0,
      positionList: []
    }
  ],

  config: {
    offset: {
      x: 0,
      y: 0
    },

    speed: {
      x: 2,
      y: 2
    }
  },

  palmPoints: [0, 1, 2, 5, 9, 13, 17],

  /**
   * Create a pointer for each user
   */
  onUse () {
    if (!this.$pointer.length) {
      for (let n = 0; n < 2; n++) {
        const $pointer = document.createElement('div')
        $pointer.classList.add('handsfree-pointer', 'handsfree-pointer-finger', 'handsfree-hide-when-started-without-holistic')
        document.body.appendChild($pointer)
        this.$pointer[n] = $pointer
      }
    }

    this.pointer = [{ x: 0, y: 0 }, { x: 0, y: 0 }]
  },

  onEnable () {
    this.onUse()
  },

  onFrame (data) {
    for (let n = 0; n < 2; n++) {
      const hand = n ? 'rightHandLandmarks' : 'leftHandLandmarks'

      if (data[hand]) {
        const mid = {x: 0, y: 0}

        // Get position for the palm
        this.palmPoints.forEach((i, n) => {
          mid.x += data[hand][n].x
          mid.y += data[hand][n].y
        })
        mid.x = mid.x / this.palmPoints.length
        mid.y = mid.y / this.palmPoints.length

        // Tween
        TweenMax.to(this.tween[n], 1, {
          x: window.outerWidth - mid.x * window.outerWidth + this.config.offset.x,
          y: mid.y * window.outerHeight + this.config.offset.y,
          overwrite: true,
          ease: 'linear.easeNone',
          immediate: true
        })
    
        this.$pointer[n].style.left = `${this.tween[n].x}px`
        this.$pointer[n].style.top = `${this.tween[n].y}px`
        
        data.pointer = {
          x: this.tween[n].x,
          y: this.tween[n].y
        }
      }
    }
  },

  /**
   * Toggle pointer
   */
  onDisable() {
    this.$pointer[0].classList.add('handsfree-hidden')
    this.$pointer[1].classList.add('handsfree-hidden')
  },

  onEnable() {
    this.$pointer[0].classList.remove('handsfree-hidden')
    this.$pointer[1].classList.remove('handsfree-hidden')
  }
}
