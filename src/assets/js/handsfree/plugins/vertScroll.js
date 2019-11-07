/**
 * Scrolls the page vertically
 */
window.Handsfree.use('vertScroll', (pointer, handsfree) => {
  if (pointer.y < handsfree.config.plugin.vertScroll.scrollZone) {
    window.scrollTo(
      0,
      window.scrollY +
        (pointer.y - handsfree.config.plugin.vertScroll.scrollZone) *
          handsfree.config.plugin.vertScroll.scrollSpeed
    )
  }
  if (
    pointer.y >
    window.innerHeight - handsfree.config.plugin.vertScroll.scrollZone
  ) {
    window.scrollTo(
      0,
      window.scrollY +
        (pointer.y -
          window.innerHeight +
          handsfree.config.plugin.vertScroll.scrollZone) *
          handsfree.config.plugin.vertScroll.scrollSpeed
    )
  }
})
