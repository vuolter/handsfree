import './assets/handsfree.scss'
import { merge } from 'lodash'

import WebojiModel from './Model/Weboji'

// Calculate a default modelpath
let modelPath = document.currentScript
  ? document.currentScript.getAttribute('src')
  : ''
modelPath = modelPath.substr(0, modelPath.lastIndexOf('/') + 1)

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
    this.config = merge(
      {
        modelPath,
        weboji: {
          enabled: false
        }
      },
      this.config
    )

    // Map configs to standard format
    if (typeof this.config.weboji === 'boolean')
      this.config.weboji = { enabled: this.config.weboji }

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
    const config = {
      modelPath: this.config.modelPath
    }

    this.activeModels.forEach((modelName) => {
      switch (modelName) {
        case 'weboji':
          if (!this.model.weboji) this.model.weboji = new WebojiModel(config)
          break
      }
    })
  }
}

export default Handsfree
