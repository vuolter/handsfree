/**
 * Scrolls the page vertically
 */
window.Handsfree.use('head.vertScroll', {
  // Number of frames over the same element before activating that element
  FOCUSACTIVATION: 10,
  // Number of frames the current element is the same as the last
  numFramesFocused: 0,
  // The last scrollable target focused
  $lastTarget: null,
  // The current scrollable target
  $target: window,

  config: {
    vertScroll: {
      // The multiplier to scroll by. Lower numbers are slower
      scrollSpeed: 0.15,
      // How many pixels from the the edge to scroll
      scrollZone: 100
    }
  },

  /**
   * Scroll the page when the cursor goes above/below the threshold
   */
  onFrame({ head }) {
    // @FIXME we shouldn't need to do this, but this is occasionally reset to {x: 0, y: 0} when running in client mode
    if (!head.pointer.x && !head.pointer.y) return

    // Check for hover
    this.checkForFocus(head)

    // Check on click
    if (head.pointer.state === 'mouseDown') {
      this.numFramesFocused = 0
      this.maybeSetTarget(head)
    }

    // Scroll up
    if (head.pointer.y < this.config.vertScroll.scrollZone) {
      this.$target.scrollTo(
        0,
        (this.$target.scrollY || this.$target.scrollTop) +
          (head.pointer.y - this.config.vertScroll.scrollZone) *
            this.config.vertScroll.scrollSpeed
      )
    }

    // Scroll down
    if (
      head.pointer.y >
      window.innerHeight - this.config.vertScroll.scrollZone
    ) {
      this.$target.scrollTo(
        0,
        (this.$target.scrollY || this.$target.scrollTop) +
          (head.pointer.y -
            (this.$target.clientHeight || window.innerHeight) +
            this.config.vertScroll.scrollZone) *
            this.config.vertScroll.scrollSpeed
      )
    }
  },

  /**
   * Checks to see if we've hovered over an element for x turns
   */
  checkForFocus: Handsfree.throttle(function(head) {
    let $potTarget = document.elementFromPoint(head.pointer.x, head.pointer.y)
    if (!$potTarget) return
    $potTarget = this.recursivelyFindScrollbar($potTarget)

    if ($potTarget === this.$lastTarget) {
      ++this.numFramesFocused
    } else {
      this.numFramesFocused = 0
    }

    if (this.numFramesFocused > this.FOCUSACTIVATION) {
      this.$target = $potTarget
    }

    this.$lastTarget = $potTarget
  }, 100),

  /**
   * Sets a new scroll target on click
   */
  maybeSetTarget(head) {
    if (head.pointer.state === 'mouseDown' && head.pointer.$target) {
      this.$target = this.recursivelyFindScrollbar(head.pointer.$target)
    }
  },

  /**
   * Traverses up the DOM until a scrollbar is found, or until we hit the body/window
   */
  recursivelyFindScrollbar($target) {
    if (
      $target.scrollHeight > $target.clientHeight &&
      $target.style.overflow !== 'hidden'
    ) {
      return $target
    } else {
      if ($target.parentElement) {
        return this.recursivelyFindScrollbar($target.parentElement)
      } else {
        return window
      }
    }
  }
})
