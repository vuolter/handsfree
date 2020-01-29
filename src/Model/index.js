// Number of scripts still being loaded
let numScriptsLoading = 0

export default class BaseModel {
  constructor(config, handsfree) {
    this.config = config
    this.handsfree = handsfree

    // Inference only happens when this is true
    this.enabled = true

    // Turns true when dependencies are loaded
    this.dependenciesReady = false
    // This is true when we can run inference
    this.isReady = false

    this.loadDependencies(config.deps)
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
   * Triggers an event on the document
   *
   * @param {String} eventName The event name, appended as `handsfree-${eventName}`
   */
  emit(eventName, detail = null) {
    const event = new CustomEvent(`handsfree-${eventName}`, detail)
    document.dispatchEvent(event)
  }

  /**
   * Calls a callback on `document` when an event is triggered
   *
   * @param {String} eventName The `handsfree-${eventName}` to listen to
   * @param {Function} callback The callback to call
   */
  on(eventName, callback) {
    document.addEventListener(`handsfree-${eventName}`, callback)
  }

  /**
   * Called when depenencies are loaded
   */
  onDepsLoaded() {}

  /**
   * Loads a set of scripts and runs a callback when they're all ready
   *
   * @param {String|Array} scripts A list of scripts to load
   * @param {Function} cb The callback to run
   */
  loadDependencies(scripts) {
    if (typeof scripts === 'string') scripts = [scripts]

    let scriptsLoaded = 0
    numScriptsLoading += scripts.length

    scripts.forEach((script) => {
      const $script = document.createElement('script')
      $script.async = true

      // Increment the counter and call callback
      $script.onload = () => {
        numScriptsLoading -= 1

        // Call callback after this set of scripts is loaded
        if (++scriptsLoaded === scripts.length) {
          this.dependenciesReady = true
          this.onDepsLoaded()
        }
      }

      $script.src = script
      document.getElementsByTagName('head')[0].appendChild($script)
    })
  }

  /**
   * Runs inference and sets up other data
   */
  getData() {}
}
