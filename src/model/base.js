export default class BaseModel {
  constructor (handsfree, config) {
    this.handsfree = handsfree
    this.config = config
    this.data = {}
    
    // Whether we've loaded dependencies or not
    this.dependenciesLoaded = false

    // Whether the model is enabled or not
    this.enabled = config.enabled

    // Collection of plugins
    this.plugins = []

    setTimeout(() => {
      const getData = this.getData
      
      this.getData = async () => {
        const data = await getData.apply(this, arguments)
        this.runPlugins()
        return data
      }
    }, 0)
  }

  // Implement in the model class
  loadDependencies (callback) {}
  updateData () {}

  // Toggle the model on/off
  enable () {
    this.enabled = true
    document.body.classList.add(`handsfree-model-${this.name}`)

    if (!this.dependenciesLoaded) {
      this.loadDependencies()
    }
  }
  disable () {
    this.enabled = false
    document.body.classList.remove(`handsfree-model-${this.name}`)
  }

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
    $script.onerror = () => {
      this.handsfree.emit('modelError', `Error loading ${src}`)
    }

    $script.src = src
    document.body.appendChild($script)
  }

  /**
   * Run all the plugins attached to this model
   */
  runPlugins () {
    // Exit if no data
    if (this.name === 'handpose' && !this.data.annotations) {
      return
    }
    
    if (Object.keys(this.data).length) {
      this.plugins.forEach(name => {
        this.handsfree.plugin[name].enabled && this.handsfree.plugin[name]?.onFrame(this.data)
      })
    }
  }
}