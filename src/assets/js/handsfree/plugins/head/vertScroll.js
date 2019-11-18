/**
 * Scrolls the page vertically
 */
window.Handsfree.use('head.vertScroll', ({ pose, config }) => {
  if (pose.head.pointer.y < config.plugin.vertScroll.scrollZone) {
    window.scrollTo(
      0,
      window.scrollY +
        (pose.head.pointer.y - config.plugin.vertScroll.scrollZone) *
          config.plugin.vertScroll.scrollSpeed
    )
  }
  if (
    pose.head.pointer.y >
    window.innerHeight - config.plugin.vertScroll.scrollZone
  ) {
    window.scrollTo(
      0,
      window.scrollY +
        (pose.head.pointer.y -
          window.innerHeight +
          config.plugin.vertScroll.scrollZone) *
          config.plugin.vertScroll.scrollSpeed
    )
  }
})
