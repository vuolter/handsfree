/**
 * Click on things with a gesture
 */
export default {
  config: {
    // How often in milliseconds to trigger clicks
    throttle: 50,

    // Max number of frames to keep down
    maxMouseDownedFrames: 1,

    // Morphs to watch for and their required confidences
    morphs: {
      0: 0.25,
      1: 0.25
    }
  },

  // Number of frames mouse has been downed
  mouseDowned: 0,
  // Is the mouse up?
  mouseUp: false,
  // Whether one of the morph confidences have been met
  thresholdMet: false,

  onUse() {
    this.throttle(this.config.throttle)
  },

  /**
   * Maps .maybeClick to a new throttled function
   */
  throttle(throttle) {
    this.maybeClick = this.handsfree.throttle(
      function(weboji) {
        this.click(weboji)
      },
      throttle,
      { trailing: false }
    )
  },

  /**
   * Detect click state and trigger a real click event
   */
  onFrame({ weboji }) {
    if (!weboji) return

    // @FIXME we shouldn't need to do this, but this is occasionally reset to {x: 0, y: 0} when running in client mode
    if (!weboji.pointer.x && !weboji.pointer.y) return

    this.thresholdMet = false

    Object.keys(this.config.morphs).forEach((key) => {
      const morph = +this.config.morphs[key]
      if (morph > 0 && weboji.morphs[key] >= morph) this.thresholdMet = true
    })

    if (this.thresholdMet) {
      this.mouseDowned++
      document.body.classList.add('handsfree-clicked')
    } else {
      this.mouseUp = this.mouseDowned
      this.mouseDowned = 0
      document.body.classList.remove('handsfree-clicked')
    }

    // Set the state
    if (
      this.mouseDowned > 0 &&
      this.mouseDowned <= this.config.maxMouseDownedFrames
    )
      weboji.pointer.state = 'mouseDown'
    else if (this.mouseDowned > this.config.maxMouseDownedFrames)
      weboji.pointer.state = 'mouseDrag'
    else if (this.mouseUp) weboji.pointer.state = 'mouseUp'
    else ''

    // Actually click something (or focus it)
    if (weboji.pointer.state === 'mouseDown') {
      this.maybeClick(weboji)
    }
  },

  /**
   * The actual click method, this is what gets throttled
   */
  click(weboji) {
    const $el = document.elementFromPoint(weboji.pointer.x, weboji.pointer.y)
    if ($el) {
      $el.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          clientX: weboji.pointer.x,
          clientY: weboji.pointer.y
        })
      )

      // Focus
      if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes($el.nodeName))
        $el.focus()

      weboji.pointer.$target = $el
    }
  },

  /**
   * Throttles the click event
   * - Defined in onuse
   */
  maybeClick: function() {}
}
