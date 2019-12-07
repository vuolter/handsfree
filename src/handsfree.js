import './handsfree.css'

/**
 * (∩｀-´)⊃━☆ﾟ.*・｡ﾟ Handsfree
 *
 * @usage const handsfree = new Handsfree(config);
 */
class Handsfree {
  /**
   * @param {Object} config The config object (see README)
   */
  constructor(config = {}) {
    this.setup(config)
    this.runOnUse(Handsfree.plugins)
    this.config.autostart && this.start()
  }

  /**
   * Triggers an event on the document
   * @param {String} eventName The event name, appended as `handsfree-${eventName}`
   */
  emit(eventName, detail = null) {
    const event = new CustomEvent(eventName, detail)
    document.dispatchEvent(event)
  }

  /**
   * Calls a callback on `document` when an event is triggered
   * @param {String} eventName The `handsfree-${eventName}` to listen to
   * @param {Function} callback The callback to call
   */
  on(eventName, callback) {
    document.addEventListener(eventName, callback)
  }

  /**
   * Starts the tracking loop
   */
  start() {
    !this.isStarted && this.startModels()
  }

  stop() {
    location.reload()
  }

  /**
   * Ensures that tracking is only ever called once
   */
  maybeStartTracking() {
    if (!this.isStarted) {
      this.isStarted = true
      this.emit('started')
      this.track()
    }
  }

  /**
   * The main tracking loop
   * - Also runs plugins
   */
  track() {
    // Run inference
    this.config.models.head.enabled && this.model.head.sdk && this.inferWeboji()
    this.config.models.bodypix.enabled &&
      this.model.bodypix.sdk &&
      this.inferBodypix()

    // Run plugins
    this.runOnFrame(Handsfree.plugins)

    // Loop
    requestAnimationFrame(() => this.track())
  }
}

/**
 * Setup static properties
 */
// Set the lib path to whereever this file is, this is required for loading dependencies correctly
let libSrc = document.currentScript.getAttribute('src')
libSrc = libSrc.substr(0, libSrc.lastIndexOf('/') + 1)
Handsfree.libSrc = libSrc
Handsfree.plugins = {}

// Contains the instances
Handsfree.instances = []
window.Handsfree = Handsfree

require('./Helpers')
require('./Setup')
require('./Plugins')

console.log('(∩｀-´)⊃━☆ﾟ.*・｡ﾟ https://github.com/handsfreejs/handsfree')
export default Handsfree
