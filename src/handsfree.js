import './assets/handsfree.scss'
import { merge, trim } from 'lodash'

import WebojiModel from './Model/Weboji'

// Calculate a default modelpath
let modelPath = document.currentScript
  ? document.currentScript.getAttribute('src')
  : ''
modelPath =
  trim(modelPath.substr(0, modelPath.lastIndexOf('/') + 1), '/') + '/models/'

/**
 * ✨ Handsfree.js
 */
class Handsfree {
  constructor(config = {}) {
    // Setup options
    this.config = config
    this.cleanConfig()

    // Flags
    this.isStarted = false

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
            this.model.weboji = new WebojiModel({
              modelPath: this.config.modelPath,
              deps: this.config.modelPath + '/jeelizFaceTransfer.js',
              throttle: this.config.weboji.throttle
            })
          } else {
            this.model.weboji.start()
          }
          break
      }
    })
  }
}

export default Handsfree
