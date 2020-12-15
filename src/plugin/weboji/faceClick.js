/**
 * Click on things with a gesture
 */
export default {
  models: 'weboji',
  enabled: false,

  tags: ['browser'],

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

  onUse () {
    this.throttle(this.config.throttle)
  },

  /**
   * Maps .maybeClick to a new throttled function
   */
  throttle (throttle) {
    this.maybeClick = this.handsfree.throttle(
      function (data) {
        this.click(data)
      },
      throttle,
      { trailing: false }
    )
  },

  /**
   * Detect click state and trigger a real click event
   */
  onFrame (data) {
    // Detect if the threshold for clicking is met with specific morphs
    this.thresholdMet = false
    Object.keys(this.config.morphs).forEach((key) => {
      const morph = +this.config.morphs[key]
      if (morph > 0 && data.morphs[key] >= morph) this.thresholdMet = true
    })

    // Click/release and add body classes
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
      data.pointer.state = 'mouseDown'
    else if (this.mouseDowned > this.config.maxMouseDownedFrames)
      data.pointer.state = 'mouseDrag'
    else if (this.mouseUp) data.pointer.state = 'mouseUp'
    else ''

    // Actually click something (or focus it)
    if (data.pointer.state === 'mouseDown') {
      this.maybeClick(data)
    }
  },

  /**
   * The actual click method, this is what gets throttled
   */
  click (data) {
    const $el = document.elementFromPoint(data.pointer.x, data.pointer.y)
    if ($el) {
      $el.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          clientX: data.pointer.x,
          clientY: data.pointer.y
        })
      )

      // Focus
      if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes($el.nodeName))
        $el.focus()

      data.pointer.$target = $el
    }
  },

  /**
   * Throttles the click event
   * - Defined in onuse
   */
  maybeClick: function() {}
}
