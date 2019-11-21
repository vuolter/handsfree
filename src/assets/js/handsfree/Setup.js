import { trimStart } from 'lodash'

const Handsfree = window.Handsfree

/**
 * Entry point to setting up this instance
 */
Handsfree.prototype.setup = function(config) {
  this.poseDefaults()
  this.addListeners()
  this.cleanConfig(config)
  this.initProps()
  this.loadDependencies()
  this.createDebugger()
}

/**
 * Sets up the pose default object
 */
Handsfree.prototype.poseDefaults = function() {
  this.head = {
    translation: [],
    rotation: [],
    morphs: [],
    state: {},
    pointer: {
      x: 0,
      y: 0,
      $el: null,
      state: ''
    }
  }
}

/**
 * Cleans and sanitizes the config with defaults
 */
Handsfree.prototype.cleanConfig = function(config) {
  this._config = config
  config = Object.assign(
    {
      // Whether Handsfree should automatically start after instantiation
      autostart: false,
      debugger: {
        // Where to inject the debugger into
        target: document.body
      },
      head: {
        morphs: {
          threshold: {
            smileRight: 0.7,
            smileLeft: 0.7,
            browLeftDown: 0.8,
            browRightDown: 0.8,
            browLeftUp: 0.8,
            browRightUp: 0.8,
            eyeLeftClosed: 0.4,
            eyeRightClosed: 0.4,
            mouthOpen: 0.3,
            mouthRound: 0.8,
            upperLip: 0.5
          }
        }
      },
      sensitivity: {
        // A factor to adjust the cursors move speed by
        xy: 0.7,
        // How much wider (+) or narrower (-) a smile needs to be to click
        click: 0
      },
      stabilizer: {
        // How much stabilization to use: 0 = none, 3 = heavy
        factor: 1,
        // Number of frames to stabilizer over
        buffer: 30
      },
      // Configs specific to plugins
      plugin: {
        click: {
          // Morphs to watch for and their required confidences
          morphs: {
            0: 0.25,
            1: 0.25
          }
        },
        vertScroll: {
          // The multiplier to scroll by. Lower numbers are slower
          scrollSpeed: 0.15,
          // How many pixels from the the edge to scroll
          scrollZone: 100
        }
      }
    },
    config
  )
  this.config = config
}

/**
 * Initialize properties
 */
Handsfree.prototype.initProps = function() {
  Handsfree.instances.push(this)
  this.id = Handsfree.instances.length
  this.trackerSDK = null
}

/**
 * Load the Weboji head tracker
 */
Handsfree.prototype.loadDependencies = function() {
  if (!this.trackerSDK) {
    const $script = document.createElement('script')
    $script.async = true
    $script.onload = () => {
      document.body.classList.remove('handsfree-loading')
      this.emit('dependenciesReady')
    }
    $script.src = trimStart(Handsfree.libSrc + 'js/jeelizFaceTransfer.js', '/')
    document.getElementsByTagName('head')[0].appendChild($script)
    document.body.classList.add('handsfree-loading')
  } else {
    this.emit('dependenciesReady')
  }
}

/**
 * Creates the debugger, which contains the canvas/video element
 */
Handsfree.prototype.createDebugger = function() {
  const $wrap = document.createElement('DIV')
  $wrap.classList.add('handsfree-debugger')

  const $canvas = document.createElement('CANVAS')
  $canvas.classList.add('handsfree-canvas')
  $canvas.setAttribute('id', `handsfree-canvas-${this.id}`)
  $wrap.appendChild($canvas)

  this.config.debugger.target.appendChild($wrap)
}

/**
 * Initializes the head tracker SDK
 */
Handsfree.prototype.initSDK = function() {
  const url = trimStart(Handsfree.libSrc + 'js/jeelizFaceTransferNNC.json', '/')
  document.body.classList.add('handsfree-loading')
  fetch(url)
    .then((model) => {
      return model.json()
    })
    // Next, let's initialize the head tracker API
    .then((model) => {
      this.trackerHelper.size_canvas({
        canvasId: `handsfree-canvas-${this.id}`,
        callback: (videoSettings) => {
          this.trackerSDK.init({
            canvasId: `handsfree-canvas-${this.id}`,
            NNCpath: JSON.stringify(model),
            videoSettings,
            callbackReady: () => {
              document.body.classList.remove('handsfree-loading')
              document.body.classList.add('handsfree-started')
              this.isStarted = true
              this.track()
            }
          })
        }
      })
    })
    .catch(() => console.error(`Couldn't load head tracking model at ${url}`))
}
