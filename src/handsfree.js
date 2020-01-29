import './assets/handsfree.scss'
import { merge, trim } from 'lodash'

import WebojiModel from './Model/Weboji'

// Calculate a default modelpath
let modelPath = document.currentScript
  ? document.currentScript.getAttribute('src')
  : ''
modelPath =
  trim(modelPath.substr(0, modelPath.lastIndexOf('/') + 1), '/') + '/models/'

// Counter for id
let id = 0

/**
 * ✨ Handsfree.js
 */
class Handsfree {
  constructor(config = {}) {
    this.id = ++id

    // Setup options
    this.config = config
    this.cleanConfig()

    // Flags
    this.isStarted = false

    // Video, canvas, and other feedback elements
    this.feedback = {}
    this.createFeedback()

    // Models
    this.model = {}
  }

  /**
   * Sets config defaults
   */
  cleanConfig() {
    const weboji = {
      enabled: false,
      throttle: 0
    }

    this.config = merge(
      {
        feedback: {
          enabled: false,
          $target: document.body
        },
        modelPath,
        weboji
      },
      this.config
    )

    // Map configs to standard format
    if (typeof this.config.weboji === 'boolean') {
      let isEnabled = this.config.weboji
      this.config.weboji = weboji
      this.config.weboji.enabled = isEnabled
    }

    // Track the models we're using
    this.activeModels = []
    if (this.config.weboji.enabled) this.activeModels.push('weboji')
  }

  /**
   * Start all enabled models
   */
  start() {
    !this.isStarted && this.startModels()
  }

  /**
   * Starts all active models
   */
  startModels() {
    this.activeModels.forEach((modelName) => {
      switch (modelName) {
        case 'weboji':
          if (!this.model.weboji) {
            this.model.weboji = new WebojiModel(
              {
                id: this.id,
                modelPath: this.config.modelPath,
                deps: this.config.modelPath + '/jeelizFaceTransfer.js',
                throttle: this.config.weboji.throttle
              },
              this
            )
          } else {
            this.model.weboji.start()
          }
          break
      }
    })
  }

  /**
   * Creates the feedback debugger, which contains the canvas/video element
   */
  createFeedback() {
    const $wrap = document.createElement('DIV')
    $wrap.classList.add('handsfree-debugger')
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
}

export default Handsfree
