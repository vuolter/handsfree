import './handsfree.sass'

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
    if (this.trackerSDK && !this.isStarted) {
      this.initSDK()
      this.emit('started')
    } else if (!this.isStarted) {
      console.warn('Head tracking SDK not loaded yet')
    }
  }

  stop() {
    location.reload()
  }

  /**
   * The main tracking loop
   * - Also runs plugins
   */
  track() {
    this.head = {
      rotation: this.trackerSDK.get_rotationStabilized(),
      translation: this.trackerSDK.get_positionScale(),
      morphs: this.trackerSDK.get_morphTargetInfluencesStabilized()
    }
    this.updatePointer()

    Object.keys(Handsfree.plugins).forEach((key) => {
      Handsfree.plugins[key].enabled &&
        Handsfree.plugins[key].callback(this.pointer, this)
    })

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

require('./Setup')
require('./Pointer')
require('./Listeners')
require('./Plugins')

console.log('(∩｀-´)⊃━☆ﾟ.*・｡ﾟ https://github.com/handsfreejs/handsfree')
export default Handsfree
