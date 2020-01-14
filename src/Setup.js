import { merge } from 'lodash'

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
  this.createCalibrator()
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

  this.body = {
    segmentation: [],
    pose: {},
    poses: []
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

      // Whether to run this instance in "client mode": models aren't loaded and no inference
      isClient: false,

      // Represents the video feed and it's debug canvases
      debugger: {
        // Where to inject the debugger into
        target: document.body,
        enabled: false
      },

      // Represents the calibrator settings
      calibrator: {
        // (optional) The target element to act as the calibrator wrapping div
        target: null,
        // (optional if .target === null, otherwise required) The target element to act as the calibrator target (should be inside target)
        marker: null
      },

      models: {
        head: {
          enabled: true,
          throttle: 0
        },
        bodypix: {
          enabled: false,
          throttle: 0,
          method: 'segmentPerson',
          debugMethod: 'toMask',
          modelConfig: {
            architecture: 'MobileNetV1',
            outputStride: 16,
            multiplier: 0.75,
            quantBytes: 2
          }
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
    head: {
      sdk: null,
      enabled: this.config.models.head.enabled
    },
    bodypix: {
      sdk: null,
      enabled: this.config.models.bodypix.enabled,
      method: this.config.models.bodypix.method,
      debugMethod: this.config.models.bodypix.debugMethod
    }
  }

  // Debugger
  this.debugger = {
    // The container div
    wrap: null,
    // The main canvas (used by Weboji)
    canvas: null,
    // The overlay debug canvas (used by Bodypix)
    debug: null,
    // The video element (used by bodypix)
    video: null,
    // The video stream (used by bodypix)
    stream: null
  }

  // Calibrator
  this.calibrator = {
    // The calibrator wrap
    wrap: null
  }
}

/**
 * Load the Weboji head tracker
 */
Handsfree.prototype.loadDependencies = function() {
  if (this.model.head.enabled && !this.model.head.loaded)
    this.loadWebojiDependencies()
  if (this.model.bodypix.enabled && !this.model.bodypix.loaded)
    this.loadBodypixDependencies()
}

/**
 * Start models
 */
Handsfree.prototype.startModels = function() {
  if (!this.config.isClient) {
    if (this.model.head.enabled) {
      this.maybeStartWeboji()
    }
    if (this.model.bodypix.enabled) {
      this.maybeStartBodypix()
    }
  } else {
    this.maybeStartTracking()
  }
}

/**
 * Creates the debugger, which contains the canvas/video element
 */
Handsfree.prototype.createDebugger = function() {
  const $wrap = document.createElement('DIV')
  $wrap.classList.add('handsfree-debugger')
  this.debugger.wrap = $wrap

  // Main canvas
  const $canvas = document.createElement('CANVAS')
  $canvas.classList.add('handsfree-canvas')
  $canvas.setAttribute('id', `handsfree-canvas-${this.id}`)
  $wrap.appendChild($canvas)
  this.debugger.canvas = $canvas

  // Create video element
  const $video = document.createElement('VIDEO')
  $video.setAttribute('playsinline', true)
  $video.classList.add('handsfree-video')
  $video.setAttribute('id', `handsfree-video-${this.id}`)
  // @TODO make this configurable
  $video.width = 640
  $video.height = 480
  $wrap.appendChild($video)
  this.debugger.video = $video

  // Debug canvas
  const $debug = document.createElement('CANVAS')
  $debug.classList.add('handsfree-debug')
  $debug.setAttribute('id', `handsfree-debug-${this.id}`)
  $wrap.appendChild($debug)
  this.debugger.debug = $debug
  $debug.width = $video.width
  $debug.height = $video.height

  // Toggle the debugger
  if (this.config.debugger.enabled) {
    this.debugger.isVisible = true
  } else {
    this.debugger.isVisible = false
    $wrap.style.display = 'none'
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
 * Reload models, starting any that haven't been started yet (if we're already running)
 * - Clears out data as well
 */
Handsfree.prototype.reload = function() {
  this.loadDependencies()

  if (this.isStarted) {
    if (this.model.head.enabled) this.maybeStartWeboji()
    if (this.model.bodypix.enabled) this.maybeStartBodypix()
  }

  this.zeroBodypixData()
  this.zeroWebojiData()
}

/**
 * Include model specific methods
 */
require('./models/Weboji')
require('./models/BodyPix')
