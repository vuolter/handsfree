import { trimStart, merge } from 'lodash'

const Handsfree = window.Handsfree

/**
 * Entry point to setting up this instance
 */
Handsfree.prototype.setup = function(config) {
  this.poseDefaults()
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
  this._scriptsLoading = 0

  // Models
  this.model = {
    // Weboji model
    head: { sdk: null },
    bodypix: { sdk: null }
  }

  // Debugger
  this.debugger = {
    wrap: null,
    canvas: null,
    video: null,
    stream: null
  }
}

/**
 * Load the Weboji head tracker
 */
Handsfree.prototype.loadDependencies = function() {
  if (this.config.models.head.enabled) this.loadWebojiDependencies()
  if (this.config.models.bodypix.enabled) this.loadBodypixDependencies()
}

/**
 * Start models
 */
Handsfree.prototype.startModels = function() {
  if (this.config.models.head.enabled) this.maybeStartWeboji()
  if (this.config.models.bodypix.enabled) this.maybeStartBodypix()
}

/**
 * Creates the debugger, which contains the canvas/video element
 */
Handsfree.prototype.createDebugger = function() {
  const $wrap = document.createElement('DIV')
  $wrap.classList.add('handsfree-debugger')
  this.debugger.wrap = $wrap

  const $canvas = document.createElement('CANVAS')
  $canvas.classList.add('handsfree-canvas')
  $canvas.setAttribute('id', `handsfree-canvas-${this.id}`)
  $wrap.appendChild($canvas)
  this.debugger.canvas = $canvas

  // Create video element
  if (this.config.models.bodypix.enabled) {
    const $video = document.createElement('VIDEO')
    $video.setAttribute('playsinline', true)
    $video.classList.add('handsfree-video')
    $video.setAttribute('id', `handsfree-video-${this.id}`)
    // @TODO make this configurable
    $video.width = 640
    $video.height = 480
    $wrap.appendChild($video)
    this.debugger.video = $video
  }

  this.config.debugger.target.appendChild($wrap)
}

/**
 * Captures the media stream
 * @param {Function} cb The callback to run once the media stream is ready
 */
Handsfree.prototype.getUserMedia = function(cb) {
  // @TODO config constraints
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: true })
    .then((stream) => {
      this.debugger.stream = stream
      this.debugger.video.srcObject = stream
      this.debugger.video.onloadedmetadata = () => {
        this.debugger.video.play()
        cb && cb()
      }
    })
    .catch((err) => {
      console.error(`Error loading models: ${err}`)
    })
}

/**
 * Include model specific methods
 */
require('./models/Weboji')
require('./models/BodyPix')
