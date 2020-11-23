// import './assets/handsfree.scss'
import merge from 'lodash/merge'
import trim from 'lodash/trim'
import throttle from 'lodash/throttle'
import WebojiModel from './Model/Weboji.js'
import PoseNetModel from './Model/PoseNet.js'
import HandposeModel from './Model/Handpose.js'
import Plugin from './Plugin/index.js'

// Core plugins
import pluginFacePointer from './plugins/facePointer'
import pluginFaceClick from './plugins/faceClick'
import pluginFaceGhostedPointer from './plugins/faceGhostedPointer'
import pluginFaceScroll from './plugins/faceScroll'

import pluginFingerPointer from './plugins/fingerPointer'

const defaultPlugins = {
  facePointer: pluginFacePointer,
  faceClick: pluginFaceClick,
  faceGhostedPointer: pluginFaceGhostedPointer,
  faceScroll: pluginFaceScroll,
  fingerPointer: pluginFingerPointer
}

// Counter for unique instance IDs
let id = 0

/**
 * Defaults to use for instantiation
 */
const configDefaults = {
  // Model defaults
  weboji: {
    enabled: false,
    throttle: 0,
    // Represents the calibrator settings
    calibrator: {
      // (optional) The target element to act as the calibrator wrapping div
      target: null,
      // The message to display over the marker, can be HTML
      instructions: 'Point head towards center of circle below',
      // (optional if .target === null, otherwise required) The target element to act as the calibrator target (should be inside target)
      marker: null
    },
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

  posenet: {
    enabled: false,
    throttle: 0,
    imageScaleFactor: 0.3,
    outputStride: 16,
    flipHorizontal: false,
    minConfidence: 0.5,
    maxPoseDetections: 5,
    scoreThreshold: 0.5,
    nmsRadius: 20,
    detectionType: 'single',
    multiplier: 0.75
  },

  handpose: {
    enabled: false
  },

  feedback: {
    enabled: false,
    // set in constructor due to document not being defined during build
    $target: null
  }
}

/**
 * ✨ Handsfree.js
 */
class Handsfree {
  constructor(config = {}) {
    this.id = ++id

    // Setup defaults once a context is defined
    configDefaults.feedback.$target = document.body

    // Determine a default assetsPath, using this <script>'s src
    let assetsPath = document.currentScript
      ? document.currentScript.getAttribute('src')
      : ''
    assetsPath = assetsPath || ''
    this._defaultAssetsPath =
      trim(assetsPath.substr(0, assetsPath.lastIndexOf('/') + 1), '/') + '/assets/'
    
    // Setup options
    this.updateConfig({
      assetsPath: this._defaultAssetsPath,
      weboji: configDefaults.weboji,
      posenet: configDefaults.posenet,
      handpose: configDefaults.handpose,

      // Plugin overrides
      plugin: {},
      feedback: configDefaults.feedback
    }, config)

    // Flags
    this.isStarted = false
    this.isLooping = false

    // Video, canvas, and other feedback elements
    this.feedback = {}
    this.createFeedback()

    // Models
    this.model = {}

    // Plugins
    this.plugin = {}
    this.prevDisabledPlugins = []
    this.loadDefaultPlugins()

    this.emit('init', this)
  }

  /**
   * Merges new configs
   */
  updateConfig (defaults, config) {
    this.config = merge(defaults, config)

    // Handle aliases
    if (config) {
      if (config.face) config.weboji = config.face
      if (config.pose) config.posenet = config.pose
      if (config.hand) config.handpose = config.hand
    }

    // Transform configDefaults (string => [string])
    const configs = ['weboji', 'posenet', 'handpose', 'feedback']
    configs.forEach(config => {
      if (typeof this.config[config] === 'boolean') {
        let isEnabled = this.config[config]
        this.config[config] = configDefaults[config]
        this.config[config].enabled = isEnabled
      }
    })

    // Track the models we're using
    this.activeModels = []
    
    if (this.config.weboji.enabled) this.activeModels.push('weboji')
    if (this.config.posenet.enabled) this.activeModels.push('posenet')
    if (this.config.handpose.enabled) this.activeModels.push('handpose')
  }

  /**
   * Starts Handsfree and updates existing config
   * ⭐ Use this method to safely live-update the user experience,
   * for example when transitioning to a new view or part of a game or app
   * or when switching from a Face Pointer to a Finger Pointer without a refresh
   * 
   * - opts will be deep merged with the handsfree.config
   * - if first argument is a function, then it is used as callback and no updates are done
   * - Once models loaded, starts loop and runs the callback
   * - If already started or no models need to be loaded then any new configs are merged in real time
   *    (eg, running models will be stopped if you explicitely disable them, plugin configs may be udpated)
   * 
   * @param {Opts|Function} opts (Optional) To be merged into. If function, then it is used as callback instead 
   * @param {Function} callback (Optional) The callback to call once everything is started
   */
  start(opts, callback) {
    if (typeof opts === 'function') {
      callback = opts
    }

    // Merge opts with current config
    this.updateConfig(this.config, opts)
    
    // @todo #63 Start each model that needs to be started
    // @todo #63 Stop active models if required
    // @todo #63 Start the game loop
    
    // Start required models
    this.startModels(this.activeModels)

    // Start game loop
    if (!this.isLooping) {
      this.isLooping = true
      this.loop()
    }
    
    // Run callback
    callback && callback()
  }

  /**
   * Helper to normalze a value within a max range
   */
  normalize (value, max) {
    return (max - value) / max
  }

  /**
   * The main "Game Loop"
   */
  loop() {
    let data = {}

    // Get model data
    this.activeModels.forEach((modelName) => {
      if (this[modelName].isReady && this[modelName].enabled) {
        this[modelName].getData()
        data[modelName] = this[modelName].data || {}

        // Alias
        if (modelName === 'weboji') {
          data.face = data.weboji
          this.face = this.weboji
        }
        if (modelName === 'handpose') {
          data.hand = data.handpose
          this.hand = this.handpose
        }
        if (modelName === 'posenet') {
          data.pose = data.posenet
          this.pose = this.posenet
        }
      }
    })

    // Run on frames
    Object.keys(this.plugin).forEach((name) => {
      this.plugin[name].enabled &&
        this.plugin[name].onFrame &&
        this.plugin[name].onFrame(data)
    })

    // Emit event and loop again
    this.emit('data', data)
    this.isLooping && requestAnimationFrame(() => this.isLooping && this.loop())
  }

  /**
   * Stop all models
   */
  stop() {
    location.reload()
  }

  /**
   * Starts all active models
   * @param {Array} models A list of model names to load
   * @returns {Promise} Resolves after all models loaded or rejected
   */
  startModels(models) {
    return new Promise((resolve) => {
      // Set loading/ready classes
      document.body.classList.add('handsfree-loading')
      let numModels = this.activeModels.length
      this.on('modelLoaded', () => {
        if (--numModels === 0) {
          document.body.classList.remove('handsfree-loading')
          document.body.classList.add('handsfree-started')
          resolve()
        }
      })

      // Loop through each model and initialize them
      models.forEach((modelName) => {
        switch (modelName) {
          /**
           * Weboji
           */
          case 'head':
          case 'face':
          case 'weboji':
            if (!this.weboji) {
              this.weboji = new WebojiModel(
                {
                  name: 'weboji',
                  ...this.config.weboji,
                  deps: this.config.assetsPath + '/jeelizFaceTransfer.js'
                },
                this
              )
            } else {
              this.emit('modelLoaded')
            }
            break

          /**
           * PoseNet
           */
          case 'pose':
          case 'posenet':
            if (!this.posenet) {
              this.posenet = new PoseNetModel(
                {
                  name: 'posenet',
                  ...this.config.posenet,
                  deps: this.config.assetsPath + '/ml5.min.js'
                },
                this
              )
            } else {
              this.emit('modelLoaded')
            }
          break

          /**
           * Handpose
           */
          case 'hand':
          case 'handpose':
            if (!this.handpose) {
              this.handpose = new HandposeModel({
                name: 'handpose',
                ...this.config.handpose,
                deps: this.config.assetsPath + '/handpose-bundle.js'
              }, this)
            } else {
              this.emit('modelLoaded')
            }
          break
        }
      })
    })
  }

  /**
   * Adds a callback (we call it a plugin) to be called after every tracked frame
   *
   * @param {String} name The plugin name
   * @param {Object|Function} config The config object, or a callback to run on every fram
   * @returns {Plugin} The plugin object
   */
  use(name, config) {
    // Make sure we have an options object
    if (typeof config === 'function') {
      config = {
        onFrame: config
      }
    }

    config = Object.assign(
      {
        // Stores the plugins name for internal use
        name,
        // Whether the plugin is enabled by default
        enabled: true,
        // A set of default config values the user can override during instanciation
        config: {},
        // (instance) => Called on every frame
        onFrame: null,
        // (instance) => Called when the plugin is first used
        onUse: null,
        // (instance) => Called when the plugin is enabled
        onEnable: null,
        // (instance) => Called when the plugin is disabled
        onDisable: null
      },
      config
    )

    // Create the plugin
    this.plugin[name] = new Plugin(config, this)
    this.plugin[name].enabled &&
      this.plugin[name].onUse &&
      this.plugin[name].onUse()

    return this.plugin[name]
  }

  /**
   * Triggers an event on the document
   *
   * @param {String} eventName The event name, appended as `handsfree-${eventName}`
   */
  emit(eventName, detail = null) {
    const event = new CustomEvent(`handsfree-${eventName}`, { detail })
    document.dispatchEvent(event)
  }

  /**
   * Calls a callback on `document` when an event is triggered
   *
   * @param {String} eventName The `handsfree-${eventName}` to listen to
   * @param {Function} callback The callback to call
   */
  on(eventName, callback) {
    document.addEventListener(`handsfree-${eventName}`, (ev) => {
      callback(ev.detail)
    })
  }

  /**
   * Disables all plugins
   * @param {String|Array} plugins List of plugin names to disable, or null to disable all
   */
  disablePlugins(plugins) {
    if (!plugins) plugins = Object.keys(this.plugin)
    if (typeof plugins === 'string') plugins = [plugins]

    this.prevDisabledPlugins = []

    plugins.forEach((name) => {
      this.plugin[name].disable()
      this.prevDisabledPlugins.push(name)
    })
  }

  /**
   * Reenables plugins previously disabled with disableAllPlugins
   */
  reenablePlugins() {
    this.prevDisabledPlugins.forEach((name) => {
      this.plugin[name].enable()
    })
    this.prevDisabledPlugins = []
  }

  /**
   * Enable all plugins
   * @param {Array} plugins List of plugin names to enable, or null to disable all
   */
  enablePlugins(plugins) {
    if (!plugins) plugins = Object.keys(this.plugin)
    this.prevDisabledPlugins = []

    plugins.forEach((name) => {
      this.plugin[name].enable()
      this.prevDisabledPlugins.push(name)
    })
  }

  /**
   * Load default plugins
   */
  loadDefaultPlugins() {
    Object.keys(defaultPlugins).forEach(name => {
      this.use(name, defaultPlugins[name])
    })
  }

  /**
   * Throttles callback to run timeInMilliseconds
   *
   * @param {function} callback The callback to run
   * @param {Integer} time How many milliseconds to throttle (in other words, run this method at most ever x milliseconds)
   * @param {Object} options {leading: true, trailing: true} @see https://lodash.com/docs/4.17.15#throttle
   */
  throttle(cb, time, opts) {
    return throttle(cb, time, opts)
  }

  /**
   * Creates the feedback debugger, which contains the canvas/video element
   */
  createFeedback() {
    const $wrap = document.createElement('DIV')
    $wrap.classList.add('handsfree-feedback')
    this.feedback.$wrap = $wrap

    // Main canvas
    const $canvas = document.createElement('CANVAS')
    $canvas.classList.add('handsfree-canvas')
    $canvas.setAttribute('id', `handsfree-canvas-${this.id}`)
    $wrap.appendChild($canvas)
    this.feedback.$canvas = $canvas

    // Create video element
    const $video = document.createElement('VIDEO')
    $video.setAttribute('playsinline', true)
    $video.classList.add('handsfree-video')
    $video.setAttribute('id', `handsfree-video-${this.id}`)
    // @TODO make this configurable
    $video.width = 640
    $video.height = 480
    $wrap.appendChild($video)
    this.feedback.$video = $video

    // Debug canvas
    const $debug = document.createElement('CANVAS')
    $debug.classList.add('handsfree-debug')
    $debug.setAttribute('id', `handsfree-debug-${this.id}`)
    $wrap.appendChild($debug)
    this.feedback.$debug = $debug
    $debug.width = $video.width
    $debug.height = $video.height

    // Toggle the debugger
    if (this.config.feedback.enabled) {
      this.feedback.isVisible = true
    } else {
      this.feedback.isVisible = false
      $wrap.style.display = 'none'
    }

    this.config.feedback.$target.appendChild($wrap)
  }

  /**
   * Toggle feedback on/off
   */
  showFeedback() {
    this.feedback.isVisible = true
    this.feedback.$wrap.style.display = 'block'
  }
  hideFeedback() {
    this.feedback.isVisible = false
    this.feedback.$wrap.style.display = 'none'
  }

  /**
   * Gets the webcam media stream into handsfree.feedback.stream
   * @param {Object} callback The callback to call after the stream is received
   */
  getUserMedia(callback) {
    if (!this.feedback.stream) {
      navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then((stream) => {
          this.feedback.stream = stream
          this.feedback.$video.srcObject = stream
          this.feedback.$video.onloadedmetadata = () => {
            this.feedback.$video.play()
            callback && callback()
          }
        })
        .catch((err) => {
          console.error(`Error loading models: ${err}`)
        })
    } else {
      this.feedback.$video.play()
      callback && callback()
    }
  }
}

export default Handsfree