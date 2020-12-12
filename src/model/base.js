export default class BaseModel {
  constructor (handsfree) {
    this.handsfree = handsfree
    
    // Whether we've loaded dependencies or not
    this.dependenciesLoaded = false

    // Whether the model is enabled or not
    this.enabled = true
  }

  // Implement in the model class
  loadDependencies () {}
  updateData () {}

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