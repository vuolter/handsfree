/*
                   ____                  
                _.' :  `._               
            .-.'`.  ;   .'`.-.           
   __      / : ___\ ;  /___ ; \      __  
 ,'_ ""--.:__;".-.";: :".-.":__;.--"" _`,
 :' `.t""--.. '<@.`;_  ',@>` ..--""j.' `;
      `:-.._J '-.-'L__ `-- ' L_..-;'     
        "-.__ ;  .-"  "-.  : __.-"       
            L ' /.------.\ ' J           
             "-.   "--"   .-"            
            __.l"-:_JL_;-";.__   

        "For my ally is the Force,
        and a powerful ally it is."
                - Yoda

              ~ Presenting ~

               Handsfree.js
                  8.0.0

  Docs:       https://handsfree.js.org
  Repo:       https://github.com/midiblocks/handsfree
  Discord:    https://discord.gg/TWemTd85
  Newsletter: http://eepurl.com/hhD7S1
*/
import merge from 'lodash/merge'
import trim from 'lodash/trim'
import HolisticModel from './model/holistic'
import WebojiModel from './model/weboji'
import HandposeModel from './model/handpose'

// Used to separate video, canvas, etc ID's
let id = 0

/**
 * The Handsfree class
 * @see https://handsfree.js.org/getting-started
 */
class Handsfree {
  /**
   * Let's do this 🖐
   * @param {Object} config The initial config to use
   */
  constructor (config = {}) {
    // Assign the instance ID
    this.id = ++id
    
    // Clean config and set defaults
    this.config = this.cleanConfig(config)

    // Setup
    this.setupDebugger()
    this.prepareModels()

    // Start tracking when all models are loaded
    this.numModelsLoaded = 0
    this.on('modelLoaded', () => {
      if (++this.numModelsLoaded === Object.keys(this.model).length) {
        document.body.classList.remove('handsfree-loading')
        document.body.classList.add('handsfree-started')

        this.isLooping = true
        this.loop()
      }
    })

    this.emit('init', this)
  }

  /**
   * Starts the trackers
   * @see https://handsfree.js.org/ref/method/start
   * 
   * @param {Function} callback The callback to run before the very first frame
   */
  start (callback) {
    document.body.classList.add('handsfree-loading')
    this.emit('loading', this)

    // Load dependencies
    this.numModelsLoaded = 0
    Object.keys(this.model).forEach(modelName => {
      const model = this.model[modelName]
      
      if (!model.dependenciesLoaded) {
        model.loadDependencies()
      } else {
        this.emit('modelLoaded')
        this.emit(`${modelName}ModelReady`)
      }
    })
    
    callback && callback()
  }

  /**
   * Stops tracking
   */
  stop () {
    location.reload()
  }

  /**
   * Called on every webcam frame
   */
  loop () {
    // Get model data
    Object.keys(this.model).forEach(modelName => {
      const model = this.model[modelName]
      
      if (model.enabled === true && model.dependenciesLoaded) {
        const data = model.getData()
        console.log(data)
      }
    })

    this.isLooping && requestAnimationFrame(() => this.isLooping && this.loop())
  }

  /**
   * Triggers a document event with `handsfree-${eventName}`
   * @see https://handsfree.js.org/ref/method/emit
   * 
   * @param {String} eventName The name of the event
   * @param {*} detail (optional) Data to send with the event
   */
  emit (eventName, detail = null) {
    const event = new CustomEvent(`handsfree-${eventName}`, {detail})
    document.dispatchEvent(event)
  }

  /**
   * Calls a callback on `document` when an event is triggered
   *
   * @param {String} eventName The `handsfree-${eventName}` to listen to
   * @param {Function} callback The callback to call
   */
  on (eventName, callback) {
    document.addEventListener(`handsfree-${eventName}`, (ev) => {
      callback(ev.detail)
    })
  }

  /**
   * Prepares the selected models
   */
  prepareModels () {
    this.model = {}
    
    if (this.config.holistic.enabled) {
      this.model.holistic = new HolisticModel(this)
    }
    if (this.config.weboji.enabled) {
      this.model.weboji = new WebojiModel(this)
    }
    if (this.config.handpose.enabled) {
      this.model.handpose = new HandposeModel(this)
    }
  }

  /**
   * Sets up the video and canvas
   */
  setupDebugger () {
    this.debug = {}
    
    // Feedback wrap
    if (!this.config.setup.wrap.$el) {
      const $wrap = document.createElement('DIV')
      $wrap.classList.add('handsfree-feedback')
      this.config.setup.wrap.$el = $wrap
    }
    this.debug.$wrap = this.config.setup.wrap.$el

    // Create video element
    if (!this.config.setup.video.$el) {
      const $video = document.createElement('VIDEO')
      $video.setAttribute('playsinline', true)
      $video.classList.add('handsfree-video')
      $video.setAttribute('id', `handsfree-video-${this.id}`)
      this.config.setup.video.$el = $video
    }
    this.debug.$video = this.config.setup.video.$el
    this.debug.$video.width = this.config.setup.video.width
    this.debug.$video.height = this.config.setup.video.height
    this.debug.$wrap.appendChild(this.debug.$video)

    // WebGL canvas (used by weboji)
    const $canvasWebGL = document.createElement('CANVAS')
    $canvasWebGL.classList.add('handsfree-canvas', 'handsfree-canvas-webgl')
    $canvasWebGL.setAttribute('id', `handsfree-canvas-webgl-${this.id}`)
    this.debug.$canvasWebGL = $canvasWebGL
    this.debug.$wrap.appendChild(this.debug.$canvasWebGL)

    // Context 2D canvas
    if (!this.config.setup.canvas.$el) {
      const $canvas = document.createElement('CANVAS')
      $canvas.classList.add('handsfree-canvas')
      $canvas.setAttribute('id', `handsfree-canvas-${this.id}`)
      this.config.setup.canvas.$el = $canvas
    }
    this.debug.$canvas = this.config.setup.canvas.$el
    this.debug.$canvas.width = this.config.setup.canvas.width
    this.debug.$canvas.height = this.config.setup.canvas.height
    this.debug.$wrap.appendChild(this.debug.$canvas)
    this.debug.context = this.debug.$canvas.getContext('2d')

    // Append everything to the body
    this.config.setup.wrap.$target.appendChild(this.debug.$wrap)

    // Add classes
    this.config.showDebug && document.body.classList.add('handsfree-show-debug')
    this.config.showVideo && document.body.classList.add('handsfree-show-video')
  }

  /**
   * Cleans and sanitizes the config, setting up defaults
   * @see https://handsfree.js.org/ref/method/cleanConfig
   * 
   * @param config
   * @returns {Object} The cleaned config
   */
  cleanConfig (config) {
    defaultConfig.setup.wrap.$target = document.body

    // Map booleans to objects
    if (typeof config.holistic === 'boolean') {
      config.holistic = {enabled: config.holistic}
    }
    if (typeof config.weboji === 'boolean') {
      config.weboji = {enabled: config.weboji}
    }
    if (typeof config.handpose === 'boolean') {
      config.handpose = {enabled: config.handpose}
    }

    return merge({}, defaultConfig, config)
  }

  /**
   * Gets the webcam media stream into handsfree.feedback.stream
   * @param {Object} callback The callback to call after the stream is received
   */
  getUserMedia (callback) {
    if (!this.debug.stream) {
      navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then((stream) => {
          this.debug.stream = stream
          this.debug.$video.srcObject = stream
          this.debug.$video.onloadedmetadata = () => {
            this.debug.$video.play()
            callback && callback()
          }
        })
        .catch((err) => {
          console.error(`Error loading models: ${err}`)
        })
    } else {
      this.debug.$video.play()
      callback && callback()
    }
  }  
}

/**
 * Default Config
 */
let assetsPath = document.currentScript ? document.currentScript.getAttribute('src') : ''
assetsPath = trim(assetsPath.substr(0, assetsPath.lastIndexOf('/') + 1), '/') + '/handsfree/'

const defaultConfig = {
  assetsPath,
  
  // Setup config. Ignore this to have everything done for you automatically
  setup: {
    // The video source to use. If not present, one will be created to capture webcam
    video: {
      $el: null,
      width: 1280,
      height: 720
    },
    // The canvas element to use for rendering debug info like skeletons and keypoints
    canvas: {
      $el: null,
      width: 1280,
      height: 720
    },
    // The wrapping element
    wrap: {
      $el: null,
      $target: null
    }
  },

  // Holistic model
  holistic: {
    enabled: false,
    upperBodyOnly: false,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  },

  // Weboji model
  weboji: {
    enabled: false,
    videoSettings: null,
    throttle: 0,

    videoSettings: {
      // The video, canvas, or image element
      // Omit this to auto create a <VIDEO> with the webcam
      videoElement: null,

      // ID of the device to use
      // Omit this to use the system default
      deviceId: null,

      // Which camera to use on the device
      // Possible values: 'user' (front), 'environment' (back)
      facingMode: 'user',

      // Video dimensions
      idealWidth: 320,
      idealHeight: 240,
      minWidth: 240,
      maxWidth: 1280,
      minHeight: 240,
      maxHeight: 1280
    }
  },

  handpose: {
    enabled: false,
    
    // How many milliseconds to wait between each inference
    throttle: 0,

    // Model config
    model: {
      // How many frames to go without running the bounding box detector.
      // - Set to a lower value if you want a safety net in case the mesh
      //   detector produces consistently flawed predictions
      maxContinuousChecks: Infinity,

      // Threshold for discarding a prediction
      detectionConfidence: 0.8,

      // A float representing the threshold for deciding whether boxes overlap
      // too much in non-maximum suppression. Must be between [0, 1]
      iouThreshold: 0.3,

      // A threshold for deciding when to remove boxes based on score in non-maximum suppression
      scoreThreshold: 0.75
    }
  }
}
export default Handsfree