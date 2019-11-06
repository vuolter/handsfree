const Handsfree = window.Handsfree

/**
 * Entry point to setting up this instance
 */
Handsfree.prototype.setup = function(config) {
  this.addListeners() // @see ./Listeners.js
  this.cleanConfig(config)
  this.initProps()
  this.loadDependencies()
  this.createDebugger()
  this.createPointer()
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
  this.pointer = {
    x: 0,
    y: 0,
    $el: null,
    state: ''
  }
  this.tween = {
    x: -1,
    y: -1,
    rx: 0,
    ry: 0,
    positionList: []
  }
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
    $script.src = Handsfree.libSrc + '/jeelizFaceTransfer.js'
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

  document.body.appendChild($wrap)
}

/**
 * Creates the cursor/pointer
 */
Handsfree.prototype.createPointer = function() {
  const $pointer = document.createElement('DIV')
  $pointer.classList.add('handsfree-pointer')
  this.pointer.$el = $pointer

  document.body.appendChild($pointer)
}

/**
 * Initializes the head tracker SDK
 */
Handsfree.prototype.initSDK = function() {
  const url = Handsfree.libSrc + '/jeelizFaceTransferNNC.json'
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
