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
