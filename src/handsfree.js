import './assets/handsfree.scss'
import { merge } from 'lodash'

class Handsfree {
  constructor(config = {}) {
    // Setup options
    this.config = config
    this.cleanConfig()
  }

  /**
   * Start all enabled models
   */

  /**
   * Sets config defaults
   */
  cleanConfig() {
    this.opts = merge(
      {
        weboji: {
          enabled: false
        }
      },
      this.opts
    )

    // Map configs to standard format
    if (typeof this.opts.weboji === 'boolean')
      this.opts.weboji = { enabled: this.opts.weboji }

    // Track the models we're using
    this.activeModels = []
    if (this.opts.weboji.enabled) this.activeModels.push('weboji')
  }
}

export default Handsfree
