/**
 * Scrolls the page vertically
 */
window.Handsfree.use('head.vertScroll', ({ head, config }) => {
  if (head.pointer.y < config.plugin.vertScroll.scrollZone) {
    window.scrollTo(
      0,
      window.scrollY +
        (head.pointer.y - config.plugin.vertScroll.scrollZone) *
          config.plugin.vertScroll.scrollSpeed
    )
  }
  if (
    head.pointer.y >
    window.innerHeight - config.plugin.vertScroll.scrollZone
  ) {
    window.scrollTo(
      0,
      window.scrollY +
        (head.pointer.y -
          window.innerHeight +
          config.plugin.vertScroll.scrollZone) *
          config.plugin.vertScroll.scrollSpeed
    )
  }
})
