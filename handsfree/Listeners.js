/**
 * Add event listeners
 */
const Handsfree = window.Handsfree

Handsfree.prototype.addListeners = function() {
  // Maybe autostart
  this.on('dependenciesReady', () => {
    this.trackerSDK = window.JEEFACETRANSFERAPI
    this.trackerHelper = window.JEELIZ_RESIZER
    this.config.autostart && this.start()
  })
}
;(function() {
  /**
   * Listen to clicks on .handsfree-start and .handsfree-stop
   * - Instantiates a Handsfree if it doesn't exist with autostart...
   * - ...or Starts the last created Handsfree
   */
  document.addEventListener('click', (ev) => {
    let loops = 0
    let $el = ev.target

    // Loop through each parent, up to 5 times
    while (loops++ < 5) {
      // .handsfree-start
      if ($el.classList.contains('handsfree-start')) {
        if (Handsfree.instances.length) {
          Handsfree.instances[Handsfree.instances.length - 1].start()
        } else {
          new Handsfree({ autostart: true })
        }
        break
      }

      // .handsfree-stop
      if ($el.classList.contains('handsfree-stop')) {
        location.reload()
        break
      }

      if ($el.parentElement) $el = $el.parentElement
      else break
    }
  })
})()
