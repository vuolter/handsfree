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

  /**
   * Enable model
   * @param {*} handleLoad If true then it'll also attempt to load,
   *    otherwise you'll need to handle it yourself. This is mostly used internally
   *    to prevent the .update() method from double loading
   */
  enable (handleLoad = true) {
    this.handsfree.config[this.name] = this.config
    this.handsfree.config[this.name].enabled = this.enabled = true
    document.body.classList.add(`handsfree-model-${this.name}`)

    if (handleLoad && !this.dependenciesLoaded) {
      this.loadDependencies()
    }

    // Weboji uses a webgl context
    if (this.name === 'weboji') {
      this.handsfree.debug.$canvas.weboji.style.display = 'block'
    }
  }

  disable () {
    this.handsfree.config[this.name] = this.config
    this.handsfree.config[this.name].enabled = this.enabled = false
    document.body.classList.remove(`handsfree-model-${this.name}`)
    
    setTimeout(() => {
      // Weboji uses a webgl context so let's just hide it
      if (this.name === 'weboji') {
        this.handsfree.debug.$canvas.weboji.style.display = 'none'
      } else {
        this.handsfree.debug.context[this.name].clearRect(0, 0, this.handsfree.debug.$canvas[this.name].width, this.handsfree.debug.$canvas[this.name].height)
      }
    }, 0)
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
      callback && callback()
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
    if (!this.data || (this.name === 'handpose' && !this.data.annotations)) {
      return
    }
    
    if (Object.keys(this.data).length) {
      this.plugins.forEach(name => {
        this.handsfree.plugin[name].enabled && this.handsfree.plugin[name]?.onFrame(this.handsfree.data)
      })
    }
  }
}