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
    
    this.config = this.cleanConfig(config)
    this.setup()

    this.hasLoadedDependencies = false

    this.holistic = null
    
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

    if (!this.hasLoadedDependencies) {
      // Load holistic
      this.loadDependency(`${this.config.assetsPath}/@mediapipe/holistic/holistic.js`, () => {
        this.holistic = new Holistic({locateFile: file => {
          console.log('file', file)
          return `${this.config.assetsPath}/@mediapipe/holistic/${file}`
        }})

        // Load the holistic camera module
        this.loadDependency(`${this.config.assetsPath}/@mediapipe/camera_utils/camera_utils.js`, () => {
          this.camera = new Camera(this.debug.$video, {
            onFrame: () => {
              console.log('onFrame')
            },
            width: this.debug.$video.width,
            height: this.debug.$video.height
          })
          this.camera.start()
        })

        this.holistic.setOptions(this.config.model)
      })
    }
    
    callback && callback()
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
   * Sets up the video and camera
   */
  setup () {
    this.debug = {}
    
    // Feedback wrap
    if (!this.config.setup.wrap.$el) {
      const $wrap = document.createElement('DIV')
      $wrap.classList.add('handsfree-feedback')
      this.config.setup.wrap.$el = $wrap
    }
    this.debug.$wrap = this.config.setup.wrap.$el

    // Main canvas
    if (!this.config.setup.canvas.$el) {
      const $canvas = document.createElement('CANVAS')
      $canvas.classList.add('handsfree-canvas')
      $canvas.setAttribute('id', `handsfree-canvas-${this.id}`)
      this.config.setup.canvas.$el = $canvas
    }
    this.debug.$canvas = this.config.setup.canvas.$el
    this.debug.$wrap.appendChild(this.debug.$canvas)

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

    this.config.setup.wrap.$target.appendChild(this.debug.$wrap)
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
    
    return merge({}, defaultConfig, config)
  }

  /**
   * Loads a script and runs a callback
   * @param {string} src The absolute path of the source file
   * @param {*} callback The callback to call after the file is loaded
   */
  loadDependency (src, callback) {
    const $script = document.createElement('script')
    $script.async = true

    $script.onload = () => {
      callback()
    }

    $script.src = src
    document.body.appendChild($script)
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
      $el: null
    }
  },

  model: {
    upperBodyOnly: false,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  }
}
export default Handsfree