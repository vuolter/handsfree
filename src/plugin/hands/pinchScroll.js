import { TweenMax } from 'gsap/all'

/**
 * Scrolls the page vertically by closing hand
 */
export default {
  models: 'hands',
  tags: ['browser'],
  enabled: false,

  // Number of frames the current element is the same as the last
  numFramesFocused: 0,
  // The current scrollable target
  $target: null,

  // The original grab point
  origScrollTop: 0,

  // The tweened scrollTop, used to smoothen out scroll
  tweenScroll: {y: 0},

  // Number of frames that has passed since the last grab
  framesSinceLastGrab: 0,

  config: {
    // Number of frames over the same element before activating that element
    framesToFocus: 10,

    // Number of pixels the middle and thumb tips must be near each other to drag
    threshold: 50,

    // Number of frames where a hold is not registered before releasing a drag
    numThresholdErrorFrames: 5,

    // Speed multiplier
    speed: 2
  },

  onUse () {
    this.$target = window
  },

  /**
   * Scroll the page when the cursor goes above/below the threshold
   */
  onFrame ({hands}) {
    if (!hands.multiHandLandmarks) return
    const height = this.handsfree.debug.$canvas.hands.height
    
    // Detect if the threshold for clicking is met with specific morphs
    const a = hands.multiHandLandmarks[0][4].x - hands.multiHandLandmarks[0][8].x
    const b = hands.multiHandLandmarks[0][4].y - hands.multiHandLandmarks[0][8].y
    const c = Math.sqrt(a*a + b*b) * height
    this.thresholdMet = c < this.config.threshold

    // Set the original grab point
    if (this.thresholdMet) {
      if (this.framesSinceLastGrab > this.config.numThresholdErrorFrames) {
        this.origScrollTop = this.getTargetScrollTop() + hands.multiHandLandmarks[0][4].y * height * this.config.speed
        TweenMax.killTweensOf(this.tweenScroll)
      }
      this.framesSinceLastGrab = 0
    }
    ++this.framesSinceLastGrab
    
    // Scroll
    if (this.framesSinceLastGrab < this.config.numThresholdErrorFrames) {
      TweenMax.to(this.tweenScroll, 1, {
        y: this.origScrollTop - hands.multiHandLandmarks[0][4].y * height * this.config.speed,
        overwrite: true,
        ease: 'linear.easeNone',
        immediateRender: true  
      })
      
      this.$target.scrollTo(0, this.tweenScroll.y)
    }
  },

  /**
   * Gets the scrolltop, taking account the window object
   */
  getTargetScrollTop () {
    return this.$target.scrollY || this.$target.scrollTop || 0
  }
}
