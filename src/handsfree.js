/*
          ✨
          (\.   \      ,/)
            \(   |\     )/
            //\  | \   /\\
          (/ /\_#oo#_/\ \)
            \/\  ####  /\/
                \`##'


          🧙‍♂️ Presenting 🧙‍♀️

              Handsfree.js
                8.0.7

  Docs:       https://handsfree.js.org
  Repo:       https://github.com/midiblocks/handsfree
  Discord:    https://discord.gg/snbB62DUT9
  Newsletter: http://eepurl.com/hhD7S1

  


  /////////////////////////////////////////////////////////////
  ///////////////////// Table of Contents /////////////////////
  /////////////////////////////////////////////////////////////

  Use "CTRL+F + #n" to hop around in this file
  
  #1 Setup
  #2 Loop
  #3 Plugins
  #4 Events
  #5 Helpers

*/

import WebojiModel from './model/weboji'
import HandsModel from './model/hands'
import FacemeshModel from './model/facemesh'
import PoseModel from './model/pose'
import HolisticModel from './model/holistic'
import PluginBase from './Plugin/base.js'
import merge from 'lodash/merge'
import throttle from 'lodash/throttle'
import defaultConfig from './defaultConfig.js'

// Plugins
import pluginFacePointer from './plugin/weboji/facePointer'
import pluginFaceClick from './plugin/weboji/faceClick'
import pluginFaceScroll from './plugin/weboji/faceScroll'
import pluginPinchScroll  from './plugin/hands/pinchScroll'

const corePlugins = {
  facePointer: pluginFacePointer,
  faceClick: pluginFaceClick,
  faceScroll: pluginFaceScroll,
  pinchScroll: pluginPinchScroll,
}



/////////////////////////////////////////////////////////////
////////////////////////// #1 SETUP /////////////////////////
/////////////////////////////////////////////////////////////

// Used to separate video, canvas, etc ID's
let id = 0

/**
 * The Handsfree class
 */
class Handsfree {
  /**
   * Let's do this 🖐
   * @see https://handsfree.js.org/ref/prop/config
   * 
   * @param {Object} config The initial config to use
   */
  constructor (config = {}) {
    // Assign the instance ID
    this.id = ++id
    this.version = '8.0.7'
    this.data = {}

    // Dependency management
    this.dependencies = {
      loading: [],
      loaded: []
    }
    // List of mediapipe models (by name) that are warming up
    this.mediapipeWarmups = {
      isWarmingUp: false,
      hands: false,
      pose: false,
      facemesh: false,
      holistic: false
    }

    // Plugins
    this.plugin = {}
    this.taggedPlugins = {
      untagged: []
    }
    
    // Clean config and set defaults
    this.config = this.cleanConfig(config)

    // Setup
    this.setupDebugger()
    this.prepareModels()
    this.loadCorePlugins()

    // Start tracking when all models are loaded
    this.numModelsLoaded = 0
    this.on('modelReady', () => {
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
   * Prepares the models
   */
  prepareModels () {
    this.model = {
      weboji: {},
      hands: {},
      facemesh: {},
      pose: {},
      holistic: {}
    }
    this.model.weboji = new WebojiModel(this, this.config.weboji)
    this.model.hands = new HandsModel(this, this.config.hands)
    this.model.pose = new PoseModel(this, this.config.pose)
    this.model.facemesh = new FacemeshModel(this, this.config.facemesh)
    this.model.holistic = new HolisticModel(this, this.config.holistic)
  }

  /**
   * Sets up the video and canvas elements
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

    // Context 2D canvases
    this.debug.$canvas = {}
    this.debug.context = {}
    this.config.setup.canvas.video = {}
    // The video canvas is used to display the video
    ;['video', 'weboji', 'facemesh', 'pose', 'hands', 'holistic'].forEach(model => {
      this.debug.$canvas[model] = {}
      this.debug.context[model] = {}
      
      let $canvas = this.config.setup.canvas[model].$el
      if (!$canvas) {
        $canvas = document.createElement('CANVAS')
        this.config.setup.canvas[model].$el = $canvas
      }
      
      // Classes
      $canvas.classList.add('handsfree-canvas', `handsfree-canvas-${model}`, `handsfree-hide-when-started-without-${model}`)
      $canvas.setAttribute('id', `handsfree-canvas-${model}-${this.id}`)

      // Dimensions
      this.debug.$canvas[model] = this.config.setup.canvas[model].$el
      this.debug.$canvas[model].width = this.config.setup.canvas[model].width
      this.debug.$canvas[model].height = this.config.setup.canvas[model].height
      this.debug.$wrap.appendChild(this.debug.$canvas[model])

      // Context
      if (model === 'weboji') {
        // this.debug.context[model] = this.debug.$canvas[model].getContext('webgl')  
      } else {
        this.debug.context[model] = this.debug.$canvas[model].getContext('2d')  
      }
    })
    
    // Append everything to the body
    this.config.setup.wrap.$parent.appendChild(this.debug.$wrap)

    // Add classes
    this.config.showDebug && document.body.classList.add('handsfree-show-debug')
    this.config.showVideo && document.body.classList.add('handsfree-show-video')
  }

  /**
   * Cleans and sanitizes the config, setting up defaults
   * @see https://handsfree.js.org/ref/method/cleanConfig
   * 
   * @param config {Object} The config object to use
   * @param defaults {Object} (Optional) The defaults to use.
   *    If null, then the original Handsfree.js defaults will be used
   * 
   * @returns {Object} The cleaned config
   */
  cleanConfig (config, defaults) {
    // Set default
    if (!defaults) defaults = Object.assign({}, defaultConfig)
    
    defaults.setup.wrap.$parent = document.body

    // Map model booleans to objects
    if (typeof config.weboji === 'boolean') {
      config.weboji = {enabled: config.weboji}
    }
    if (typeof config.hands === 'boolean') {
      config.hands = {enabled: config.hands}
    }
    if (typeof config.facemesh === 'boolean') {
      config.facemesh = {enabled: config.facemesh}
    }
    if (typeof config.pose === 'boolean') {
      config.pose = {enabled: config.pose}
    }
    if (typeof config.holistic === 'boolean') {
      config.holistic = {enabled: config.holistic}
    }

    // Map plugin booleans to objects
    config.plugin && Object.keys(config.plugin).forEach(plugin => {
      if (typeof config.plugin[plugin] === 'boolean') {
        config.plugin[plugin] = {enabled: config.plugin[plugin]}
      }
    })        

    return merge({}, defaults, config)
  }

  /**
   * Updates the instance, loading required dependencies
   * @see https://handsfree.js.org./ref/method/update
   * 
   * @param {Object} config The changes to apply
   * @param {Function} callback Called after
   */
  update (config, callback) {
    this.config = this.cleanConfig(config, this.config)

    // Run enable/disable methods on changed models
    ;['hands', 'facemesh', 'pose', 'holistic', 'weboji'].forEach(model => {
      let wasEnabled = this.model[model].enabled
      this.config[model].config = this.model[model].config

      if (wasEnabled && !this.config[model].enabled) this.model[model].disable()
      else if (!wasEnabled && this.config[model].enabled) this.model[model].enable(false)
    })

    // Enable plugins
    config.plugin && Object.keys(config.plugin).forEach(plugin => {
      if (typeof config.plugin[plugin].enabled === 'boolean') {
        if (config.plugin[plugin].enabled) {
          this.plugin[plugin].enable()
        } else {
          this.plugin[plugin].disable()
        }
      }
    })
    
    // Start
    if (this.isLooping && callback) {
      callback()
    } else {
      this.start(callback)
    }
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
    // Cleans any configs since instantiation (particularly for boolean-ly set plugins)
    this.config = this.cleanConfig(this.config, this.config)
    
    // Start loading
    document.body.classList.add('handsfree-loading')
    this.emit('loading', this)

    // Call the callback once things are loaded
    callback && document.addEventListener('handsfree-modelReady', callback, {once: true})
    
    // Load dependencies
    this.numModelsLoaded = 0
    Object.keys(this.model).forEach(modelName => {
      const model = this.model[modelName]
      
      if (model.enabled && !model.dependenciesLoaded) {
        model.loadDependencies()
      } else if (model.enabled) {
        this.emit('modelReady', model)
        this.emit(`${modelName}ModelReady`, model)
      }
    })

    // Enable initial plugins
    Object.keys(this.config.plugin).forEach(plugin => {
      if (typeof this.config.plugin?.[plugin]?.enabled === 'boolean' && this.config.plugin[plugin].enabled) {
        this.plugin[plugin].enable()
      }
    })    
  }

  /**
   * Stops tracking
   * - Currently this just stops the tracker
   * 
   * @see https://handsfree.js.org/ref/method/stop
   */
  stop () {
    location.reload()
  }

  /**
   * Pauses inference to free up resources but maintains the
   * webcam stream so that it can be unpaused instantly
   * 
   * @see https://handsfree.js.org/ref/method/pause
   */
  pause () {
    this.isLooping = false
  }

  /**
   * Resumes the loop from an unpaused state
   * 
   * @see https://handsfree.js.org/ref/method/pause
   */
  unpause () {
    if (!this.isLooping) {
      this.isLooping = true
      this.loop()
    }
  }

  /**
   * Called on every webcam frame
   * @see https://handsfree.js.org/ref/method/loop
   */
  loop () {
    // Get model data
    Object.keys(this.model).forEach(modelName => {
      const model = this.model[modelName]
      if (model.enabled && model.dependenciesLoaded) {
        model.getData()
      }
    })
    this.emit('data', this.data)

    // Run untagged plugins
    this.taggedPlugins.untagged?.forEach(pluginName => {
      this.plugin[pluginName].enabled && this.plugin[pluginName]?.onFrame(this.data)
    })

    // Render video behind everything else
    if (this.config.showDebug) {
      const activeModel = ['hands', 'pose', 'holistic', 'facemesh'].find(model => {
        if (this.model[model].enabled) {
          return model
        }
      })

      if (activeModel && this.model[activeModel]?.camera) {
        // @fixme let's optimize this
        this.debug.$canvas.video.width = this.debug.$canvas[activeModel].width
        this.debug.$canvas.video.height = this.debug.$canvas[activeModel].height
        this.debug.context.video.drawImage(this.model[activeModel].camera.video, 0, 0, this.debug.$canvas.video.width, this.debug.$canvas.video.height)
      }
    }

    this.isLooping && requestAnimationFrame(() => this.isLooping && this.loop())
  }

  
  


  /////////////////////////////////////////////////////////////
  //////////////////////// #3 PLUGINS /////////////////////////
  /////////////////////////////////////////////////////////////


  


  /**
   * Adds a callback (we call it a plugin) to be called after every tracked frame
   * @see https://handsfree.js.org/ref/method/use
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
    this.plugin[name].onUse && this.plugin[name].onUse()

    // Store a reference to the plugin to simplify things
    if (config.models.length) {
      config.models.forEach(modelName => {
        this.model[modelName].plugins.push(name)
      })
    } else {
      this.taggedPlugins.untagged.push(name)
    }
  
    return this.plugin[name]
  }

  /**
   * Enable plugins by tags
   * @see https://handsfree.js.org/ref/method/enablePlugins
   * 
   * @param {string|object} tags (Optional) The plugins with tags to enable. Enables all if null
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
   * @see https://handsfree.js.org/ref/method/disablePlugins
   * 
   * @param {string|object} tags (Optional) The plugins with tags to disable. Disables all if null
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
   * @see https://handsfree.js.org/ref/method/on
   *
   * @param {String} eventName The `handsfree-${eventName}` to listen to
   * @param {Function} callback The callback to call
   * @param {Object} opts The options to pass into addEventListener (eg: {once: true})
   */
  on (eventName, callback, opts) {
    document.addEventListener(`handsfree-${eventName}`, (ev) => {
      callback(ev.detail)
    }, opts)
  }



  /////////////////////////////////////////////////////////////
  //////////////////////// #5 HELPERS /////////////////////////
  /////////////////////////////////////////////////////////////



  /**
   * Helper to normalze a value within a max range
   * @see https://handsfree.js.org/ref/method/normalize
   * 
   * @param {Number} value The value to normalize
   * @param {Number} max The maximum value to normalize to, or the upper bound
   * @param {Number} min The minimum value to normalize to, or the lower bound
   */
  normalize (value, max, min = 0) {
    return (value - min) / (max - min)
  }

  /**
   * Gets the webcam media stream into handsfree.feedback.stream
   * @see https://handsfree.js.org/ref/method/getUserMedia
   * 
   * @param {Object} callback The callback to call after the stream is received
   */
  getUserMedia (callback) {
    // Start getting the stream and call callback after
    if (!this.debug.stream && !this.debug.isGettingStream) {
      this.debug.isGettingStream = true
      
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: 'user',
            width: this.debug.$video.width,
            height: this.debug.$video.height
          }
        })
        .then((stream) => {
          this.debug.stream = stream
          this.debug.$video.srcObject = stream
          this.debug.$video.onloadedmetadata = () => {
            this.debug.$video.play()
            this.emit('gotUserMedia', stream)
            callback && callback()
          }
        })
        .catch((err) => {
          console.error(`Error getting user media: ${err}`)
        })
        .finally(() => {
          this.debug.isGettingStream = false
        })

    // If a media stream is getting gotten then run the callback once the media stream is ready
    } else if (!this.debug.stream && this.debug.isGettingStream) {
      callback && this.on('gotUserMedia', callback)
    
    // If everything is loaded then just call the callback
    } else {
      this.debug.$video.play()
      this.emit('gotUserMedia', this.debug.stream)
      callback && callback()
    }
  }

  /**
   * Loads all the core plugins (see #6)
   */
  loadCorePlugins () {
    Object.keys(corePlugins).forEach(name => {
      this.use(name, corePlugins[name])
    })    
  }

  /**
   * Throttles callback to run timeInMilliseconds
   * @see https://handsfree.js.org/ref/method/throttle
   *
   * @param {function} callback The callback to run
   * @param {Integer} time How many milliseconds to throttle (in other words, run this method at most ever x milliseconds)
   * @param {Object} options {leading: true, trailing: true} @see https://lodash.com/docs/4.17.15#throttle
   */
  throttle(cb, time, opts) {
    return throttle(cb, time, opts)
  }
}

export default Handsfree