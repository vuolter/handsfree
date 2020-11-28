import throttle from 'lodash/throttle'

/**
 * Scrolls the page vertically by closing hand
 */
export default {
  // Number of frames the current element is the same as the last
  numFramesFocused: 0,
  // The last scrollable target focused
  $lastTarget: null,
  // The current scrollable target
  $target: null,

  // The original grab point
  origScrollTop: {
    x: 0,
    y: 0
  },

  // Number of frames that has passed since the last grab
  framesSinceLastGrab: 0,

  config: {
    // Number of frames over the same element before activating that element
    framesToFocus: 10,

    // Number of pixels the middle and thumb tips must be near each other to drag
    threshold: 40,

    // Number of frames where a hold is not registered before releasing a drag
    numThresholdErrorFrames: 5,

    vertScroll: {
      // The multiplier to scroll by. Lower numbers are slower
      scrollSpeed: 0.15,
      // How many pixels from the the edge to scroll
      scrollZone: 100
    }
  },

  onUse () {
    this.$target = window
  },

  /**
   * Scroll the page when the cursor goes above/below the threshold
   */
  onFrame({hand}) {
    if (!hand || !hand.annotations) return

    // Detect if the threshold for clicking is met with specific morphs
    const a = hand.annotations.middleFinger[3][0] - hand.annotations.thumb[3][0]
    const b = hand.annotations.middleFinger[3][1] - hand.annotations.thumb[3][1]
    const c = Math.sqrt(a*a + b*b)
    this.thresholdMet = c < this.config.threshold

    // Set the original grab point
    if (this.thresholdMet) {
      if (this.framesSinceLastGrab > this.config.numThresholdErrorFrames) {
        this.origScrollTop = this.getTargetScrollTop()
      }
      this.framesSinceLastGrab = 0
    }
    ++this.framesSinceLastGrab
    
    // Scroll
    if (this.framesSinceLastGrab < this.config.numThresholdErrorFrames) {
      this.$target.scrollTo(0, this.origScrollTop + (window.innerHeight - hand.pointer.y))
    }
    
    // // Check for hover
    // this.checkForFocus(hand)

    // // Check on click
    // if (hand.pointer.state === 'mouseDown') {
    //   this.numFramesFocused = 0
    //   this.maybeSetTarget(hand)
    // }

    // Scroll up
    // if (hand.pointer.y < bounds.top + this.config.vertScroll.scrollZone) {
    //   this.$target.scrollTo(
    //     0,
    //     scrollTop +
    //       (hand.pointer.y - bounds.top - this.config.vertScroll.scrollZone) *
    //         this.config.vertScroll.scrollSpeed
    //   )

    //   isScrolling = true
    // }

    // Scroll down
    // if (hand.pointer.y > bounds.bottom - this.config.vertScroll.scrollZone) {
    //   this.$target.scrollTo(
    //     0,
    //     scrollTop -
    //       (bounds.bottom -
    //         hand.pointer.y -
    //         this.config.vertScroll.scrollZone) *
    //         this.config.vertScroll.scrollSpeed
    //   )

    //   isScrolling = true
    // }

    // this.thresholdMet && this.maybeSelectNewTarget()
  },

  /**
   * Check that the scroll is actually happening, otherwise traverse up the DOM
   */
  maybeSelectNewTarget() {
    let curScrollTop = this.getTargetScrollTop()
    let didNotScroll = false

    // Check if we have scrolled up
    this.$target.scrollTo(0, curScrollTop + 1)
    if (curScrollTop === this.getTargetScrollTop()) {
      didNotScroll = true
    } else {
      this.$target.scrollTo(0, curScrollTop - 1)
      return
    }

    // Check if we have scrolled down
    this.$target.scrollTo(0, curScrollTop - 1)
    if (curScrollTop === this.getTargetScrollTop()) {
      if (didNotScroll) {
        this.numFramesFocused = 0

        this.selectTarget(
          this.recursivelyFindScrollbar(this.$target.parentElement)
        )
      }
    } else {
      this.$target.scrollTo(0, curScrollTop + 1)
      return
    }
  },

  /**
   * Gets the scrolltop, taking account the window object
   */
  getTargetScrollTop() {
    return this.$target.scrollY || this.$target.scrollTop || 0
  },

  /**
   * Checks to see if we've hovered over an element for x turns
   */
  checkForFocus: throttle(function(hand) {
    let $potTarget = document.elementFromPoint(
      hand.pointer.x,
      hand.pointer.y
    )
    if (!$potTarget) return
    $potTarget = this.recursivelyFindScrollbar($potTarget)

    if ($potTarget === this.$lastTarget) {
      ++this.numFramesFocused
    } else {
      this.numFramesFocused = 0
    }

    if (this.numFramesFocused > this.config.framesToFocus) {
      this.selectTarget($potTarget)
    }

    this.$lastTarget = $potTarget
  }, 100),

  /**
   * Select and style the element
   */
  selectTarget($potTarget) {
    // Check required in case the window is the target
    if (this.$target.classList) {
      this.$target.classList.remove('handsfree-scroll-focus')
    }
    if ($potTarget && $potTarget.classList) {
      $potTarget.classList.add('handsfree-scroll-focus')
    }

    if ($potTarget.nodeName === 'HTML' || !$potTarget.nodeName) {
      $potTarget = window
    }

    this.$target = $potTarget
  },

  /**
   * Sets a new scroll target on click
   */
  maybeSetTarget(hand) {
    if (hand.pointer.state === 'mouseDown' && hand.pointer.$target) {
      this.selectTarget(this.recursivelyFindScrollbar(hand.pointer.$target))
    }
  },

  /**
   * Traverses up the DOM until a scrollbar is found, or until we hit the body/window
   */
  recursivelyFindScrollbar($target) {
    const styles =
      $target && $target.getBoundingClientRect ? getComputedStyle($target) : {}

    if (
      $target &&
      $target.scrollHeight > $target.clientHeight &&
      (styles.overflow === 'auto' ||
        styles.overflow === 'auto scroll' ||
        styles.overflowY === 'auto' ||
        styles.overflowY === 'auto scroll')
    ) {
      return $target
    } else {
      if ($target && $target.parentElement) {
        return this.recursivelyFindScrollbar($target.parentElement)
      } else {
        return window
      }
    }
  }
}
