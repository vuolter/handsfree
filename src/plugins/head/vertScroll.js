/**
 * Scrolls the page vertically
 */
window.Handsfree.use('head.vertScroll', {
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

    this.maybeSetTarget(head)

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
   * Sets a new scroll target on click
   */
  maybeSetTarget(head) {
    if (head.pointer.state === 'mouseDown' && head.pointer.$target) {
      this.recursivelyFindScrollbar(head.pointer.$target)
      console.log(this.$target)
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
      this.$target = $target
      console.log('FOUND', this.$target)
    } else {
      if ($target.parentElement) {
        this.recursivelyFindScrollbar($target.parentElement)
      } else {
        this.$target = window
      }
    }
  }
})
