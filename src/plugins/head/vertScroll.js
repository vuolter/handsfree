/**
 * Scrolls the page vertically
 */
window.Handsfree.use('head.vertScroll', {
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

    if (head.pointer.y < this.config.vertScroll.scrollZone) {
      window.scrollTo(
        0,
        window.scrollY +
          (head.pointer.y - this.config.vertScroll.scrollZone) *
            this.config.vertScroll.scrollSpeed
      )
    }
    if (
      head.pointer.y >
      window.innerHeight - this.config.vertScroll.scrollZone
    ) {
      window.scrollTo(
        0,
        window.scrollY +
          (head.pointer.y -
            window.innerHeight +
            this.config.vertScroll.scrollZone) *
            this.config.vertScroll.scrollSpeed
      )
    }
  }
})
