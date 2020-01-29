// Number of scripts still being loaded
let numScriptsLoading = 0

export default class BaseModel {
  constructor(config) {
    this.config = config
    this.enabled = true
    this.init()
  }

  /**
   * Enable this model
   */
  enable() {
    this.enabled = true
  }

  /**
   * Disable this model
   */
  disable() {
    this.enabled = false
  }

  /**
   * Loads a set of scripts and runs a callback when they're all ready
   *
   * @param {String|Array} scripts A list of scripts to load
   * @param {Function} cb The callback to run
   */
  load(scripts, cb) {
    if (typeof scripts === 'string') scripts = [scripts]

    let scriptsLoaded = 0
    numScriptsLoading += scripts.length
    document.body.classList.add('handsfree-loading')

    scripts.forEach((script) => {
      const $script = document.createElement('script')
      $script.async = true

      // Increment the counter and call callback
      $script.onload = () => {
        numScriptsLoading -= 1

        // Call callback after this set of scripts is loaded
        if (++scriptsLoaded === scripts.length && cb) {
          cb()
        }

        // Remove loading class
        if (!numScriptsLoading) {
          document.body.classList.remove('handsfree-loading')
        }
      }

      $script.src = script
      document.getElementsByTagName('head')[0].appendChild($script)
    })
  }
}
