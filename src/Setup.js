import { trimStart, merge } from 'lodash'

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
  this.config = merge(
    {
      // Whether Handsfree should automatically start after instantiation
      autostart: false,

      debugger: {
        // Where to inject the debugger into
        target: document.body
      },

      models: {
        head: {
          enabled: true
        },
        bodypix: {
          enabled: false
        }
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
      }
    },
    config
  )
}

/**
 * Initialize properties
 */
Handsfree.prototype.initProps = function() {
  Handsfree.instances.push(this)
  this.id = Handsfree.instances.length

  // Models
  this.model = {
    // Weboji model
    head: { sdk: null },
    bodypix: { sdk: null }
  }
}

/**
 * Load the Weboji head tracker
 */
Handsfree.prototype.loadDependencies = function() {
  if (this.config.models.head.enabled) this.loadWebojiDependencies()
  if (this.config.models.bodypix.enabled) this.loadBodyPixDependencies()
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
  const url = trimStart(
    Handsfree.libSrc + 'models/jeelizFaceTransferNNC.json',
    '/'
  )
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
          this.model.head.sdk.init({
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

/**
 * Include model specific methods
 */
require('./models/Weboji')
require('./models/BodyPix')
