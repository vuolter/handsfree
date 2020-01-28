/**
 * (∩｀-´)⊃━☆ﾟ.*・｡ﾟ Handsfree.js
 *
 * @usage const handsfree = new Handsfree(config);
 */
import GestureRecorder from './GestureRecorder/index'

class Handsfree {
  /**
   * @param {Object} config The config object (see README)
   */
  constructor(config = {}) {
    this.setup(config)
    this.runOnUse(Handsfree.plugins)
    this.config.autostart && this.start()

    this.gestures = {}
    this.gestureRecorder = new GestureRecorder(this.config, this)
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
      document.body.classList.add('handsfree-started')
      this.emit('started')
      this.track()
    }
  }

  /**
   * Show debugger
   * - Toggle the debugger
   */
  showDebugger() {
    this.debugger.wrap.style = 'display: block'
    this.debugger.isVisible = true
  }
  hideDebugger() {
    this.debugger.wrap.style = 'display: none'
    this.debugger.isVisible = false
  }

  /**
   * The main tracking loop
   * - Also runs plugins
   */
  track() {
    // Run inference
    if (!this.config.isClient) {
      this.model.weboji.enabled &&
        this.model.weboji.loaded &&
        this.inferWeboji()
    }

    // Run plugins or send messages
    this.runOnFrame()

    // Loop
    requestAnimationFrame(() => this.track())
  }

  /**
   * Record a gesture
   */
  recordGesture(opts, callback) {
    this.gestureRecorder.record(opts, callback)
  }

  /**
   * Loads a gestureSet model
   *
   * @param {Object} gestureSets A list of {gesturSetName: URL}
   */
  loadGestures(gestureSets, onReady) {
    // Load TensorFlow
    const onML5Ready = () => {
      let gesturesToLoad = Object.keys(gestureSets).length
      this.missingGestureSets = []
      document.body.classList.add('handsfree-loading-gestures')

      const brain = ml5.neuralNetwork({
        inputs: 3,
        outputs: 2,
        task: 'classification'
      })

      Object.keys(gestureSets).forEach(async (name) => {
        try {
          let opts = {
            model: gestureSets[name],
            metadata: gestureSets[name].replace('.json', '_meta.json'),
            weights: gestureSets[name].replace('.json', '.weights.bin')
          }

          brain.load(opts, () => {
            this.gestures[name] = brain
            --gesturesToLoad
            if (--gesturesToLoad === 0) {
              document.body.classList.remove('handsfree-loading-gestures')
              this.emit('handsfreeGesturesLoaded')
              onReady && onReady()
            }
          })
        } catch (e) {
          console.log(e)
          this.missingGestureSets.push(name)
          --gesturesToLoad
        }

        if (--gesturesToLoad === 0) {
          document.body.classList.remove('handsfree-loading-gestures')
          this.emit('handsfreeGesturesLoaded')
          onReady && onReady()
        }
      })
    }

    // Load TensorFlow if it hasn't been loaded yet
    if (this.dependencies.ml5) {
      onML5Ready()
    } else {
      this.loadAndWait([Handsfree.libSrc + 'models/ml5.min.js'], () => {
        this.dependencies.ml5 = true
        onML5Ready()
      })
    }
  }
}

/**
 * Setup static properties
 */
// Set the lib path to whereever this file is, this is required for loading dependencies correctly
let libSrc = document.currentScript
  ? document.currentScript.getAttribute('src')
  : ''
libSrc = libSrc.substr(0, libSrc.lastIndexOf('/') + 1)
Handsfree.libSrc = libSrc
Handsfree.plugins = {}

// Contains the instances
Handsfree.instances = []
window.Handsfree = Handsfree

require('./Helpers')
require('./Setup')
require('./Plugins')
require('./Calibration')

export default Handsfree
