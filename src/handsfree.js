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

  


  /////////////////////////////////////////////////////////////
  ///////////////////// Table of Contents /////////////////////
  /////////////////////////////////////////////////////////////

  Use "CTRL+F + #1" to hop around in this file
  
  #1 Setup
  #2 Loop
  #3 Plugins
  #4 Events
  #5 Helpers
  #6 Core Plugin Imports

*/

import HolisticModel from './model/holistic'
import WebojiModel from './model/weboji'
import HandposeModel from './model/handpose'
import PluginBase from './Plugin/base.js'
import merge from 'lodash/merge'
import trim from 'lodash/trim'
import throttle from 'lodash/throttle'
import defaultConfig from './defaultConfig.js'



/////////////////////////////////////////////////////////////
////////////////////////// #1 SETUP /////////////////////////
/////////////////////////////////////////////////////////////

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

    // Plugins
    this.plugin = {}
    this.globalPlugins = []
    this.taggedPlugins = {}
    
    // Clean config and set defaults
    this.config = this.cleanConfig(config)

    // Setup
    this.gotUserMedia = false
    this.setupDebugger()
    this.prepareModels()
    this.loadCorePlugins()

    // Start tracking when all models are loaded
    this.numModelsLoaded = 0
    this.on('modelLoaded', () => {
      let numActiveModels = 0
      Object.keys(this.model).forEach(modelName => {
        this.model[modelName].enabled && ++numActiveModels
      })
      
      if (++this.numModelsLoaded === numActiveModels) {
        document.body.classList.remove('handsfree-loading')
        document.body.classList.add('handsfree-started')

        this.isLooping = true
        this.loop()
      }
    })

    this.emit('init', this)
  }

  /**
   * Prepares the selected models
   */
  prepareModels () {
    this.model = {
      holistic: {},
      weboji: {},
      handpose: {}
    }
    this.model.holistic = new HolisticModel(this, this.config.holistic)
    this.model.weboji = new WebojiModel(this, this.config.weboji)
    this.model.handpose = new HandposeModel(this, this.config.handpose)
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



  /////////////////////////////////////////////////////////////
  /////////////////////////// #2 LOOP /////////////////////////
  /////////////////////////////////////////////////////////////


  

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
      
      if (model.enabled && !model.dependenciesLoaded) {
        model.loadDependencies()
      } else if (model.enabled) {
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
    const data = {}
    Object.keys(this.model).forEach(modelName => {
      const model = this.model[modelName]
      
      if (model.enabled === true && model.dependenciesLoaded) {
        model.getData()
        data[modelName] = model.data
      }
    })
    this.emit('data', data)

    // Run global plugins
    this.globalPlugins.forEach(pluginName => {
      this.plugin[pluginName].enabled && this.plugin[pluginName]?.onFrame(data)
    })

    this.isLooping && requestAnimationFrame(() => this.isLooping && this.loop())
  }

  
  


  /////////////////////////////////////////////////////////////
  //////////////////////// #3 PLUGINS /////////////////////////
  /////////////////////////////////////////////////////////////


  


  /**
   * Adds a callback (we call it a plugin) to be called after every tracked frame
   *
   * @param {String} name The plugin name
   * @param {Object|Function} config The config object, or a callback to run on every fram
   * @returns {Plugin} The plugin object
   */
  use (name, config) {
    // Make sure we have an options object
    if (typeof config === 'function') {
      config = {
        onFrame: config
      }
    }

    config = merge({},
      {
        // Stores the plugins name for internal use
        name,
        // The model to apply this plugin to
        models: [],
        // Plugin tags for quickly turning things on/off
        tags: [],
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

    // Sanitize
    if (typeof config.models === 'string') {
      config.models = [config.models]
    }

    // Setup plugin tags
    if (typeof config.tags === 'string') {
      config.tags = [config.tags]
    }
    config.tags.forEach(tag => {
      if (!this.taggedPlugins[tag]) this.taggedPlugins[tag] = []
      this.taggedPlugins[tag].push(name)
    })
    
    // Create the plugin
    this.plugin[name] = new PluginBase(config, this)
    this.plugin[name].enabled &&
      this.plugin[name].onUse &&
      this.plugin[name].onUse()

    // Store a reference to the plugin to simplify things
    if (config.models.length) {
      config.models.forEach(modelName => {
        this.model[modelName].plugins.push(name)
      })
    } else {
      this.globalPlugins.push(name)
    }
  
    return this.plugin[name]
  }

  /**
   * Enable plugins by tags
   * 
   * @param {string|object} tags (Optional) The plugins with tags to enable. Enables all if null
   * 
   * @see https://handsfree.js.org/ref/method/enablePlugins
   */
  enablePlugins (tags) {
    // Sanitize
    if (typeof tags === 'string') tags = [tags]
    if (!tags) tags = Object.keys(this.taggedPlugins)

    tags.forEach(tag => {
      this.taggedPlugins[tag].forEach(pluginName => {
        this.plugin[pluginName].enable()
      })
    })
  }

  /**
   * Disable plugins by tags
   * 
   * @param {string|object} tags (Optional) The plugins with tags to disable. Disables all if null
   * 
   * @see https://handsfree.js.org/ref/method/disablePlugins
   */
  disablePlugins (tags) {
    // Sanitize
    if (typeof tags === 'string') tags = [tags]
    if (!tags) tags = Object.keys(this.taggedPlugins)

    tags.forEach(tag => {
      this.taggedPlugins[tag].forEach(pluginName => {
        this.plugin[pluginName].disable()
      })
    })
  }




  /////////////////////////////////////////////////////////////
  ///////////////////////// #4 EVENTS /////////////////////////
  /////////////////////////////////////////////////////////////


  


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



  /////////////////////////////////////////////////////////////
  //////////////////////// #5 HELPERS /////////////////////////
  /////////////////////////////////////////////////////////////



  /**
   * Helper to normalze a value within a max range
   */
  normalize (value, max, min = 0) {
    return (value - min) / (max - min)
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
            this.emit('gotUserMedia', stream)
            this.gotUserMedia = true
            callback && callback()
          }
        })
        .catch((err) => {
          console.error(`Error getting user media: ${err}`)
        })
    } else {
      this.debug.$video.play()
      callback && callback()
    }
  }

  loadCorePlugins () {
    Object.keys(corePlugins).forEach(name => {
      this.use(name, corePlugins[name])
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
}



/////////////////////////////////////////////////////////////
///////////////// #6 Core Plugin Imports ////////////////////
/////////////////////////////////////////////////////////////



const corePlugins = {
  facePointer: require('./plugin/weboji/facePointer').default,
  faceClick: require('./plugin/weboji/faceClick').default,
  faceScroll: require('./plugin/weboji/faceScroll').default,
  fingerPointer: require('./plugin/handpose/palmPointer').default,
  palmPointer: require('./plugin/handpose/fingerPointer').default,
  pinchClick: require('./plugin/handpose/pinchClick').default,
  handScroll: require('./plugin/handpose/handScroll').default,
  palmPointers: require('./plugin/holistic/palmPointers').default
}




export default Handsfree