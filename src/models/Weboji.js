import { trimStart } from 'lodash'

const Handsfree = window.Handsfree

/**
 * Load the Weboji library
 * @see https://github.com/jeeliz/jeelizWeboji
 */
Handsfree.prototype.loadWebojiDependencies = function() {
  if (!this.config.isClient) {
    if (!this.model.weboji.sdk) {
      this.loadAndWait(
        [trimStart(Handsfree.libSrc + 'models/jeelizFaceTransfer.js', '/')],
        () => {
          this.bindWeboji()
        }
      )
    } else {
      this.bindWeboji()
    }
  } else {
    this.model.weboji.loaded = true
  }
}

/**
 * Bind the SDK classes to handsfree properties
 */
Handsfree.prototype.bindWeboji = function() {
  this.model.weboji.sdk = window.JEEFACETRANSFERAPI
  this.model.weboji.sdkHelper = window.JEELIZ_RESIZER
  this.throttleModel('weboji', this.config.models.weboji.throttle)
}

/**
 * Maybe starts Weboji, looping until dependencies are loaded
 */
Handsfree.prototype.maybeStartWeboji = function() {
  if (!this.model.weboji.sdk) {
    setTimeout(() => {
      this.maybeStartWeboji()
    }, 10)
  } else {
    this.loadWebojiModel()
  }
}

/**
 * Initializes the weboji tracker SDK
 */
Handsfree.prototype.loadWebojiModel = function() {
  if (this.model.weboji.loaded) {
    this.maybeStartTracking()
    return
  }

  const url = trimStart(
    Handsfree.libSrc + 'models/jeelizFaceTransferNNC.json',
    '/'
  )
  document.body.classList.add('handsfree-loading')
  fetch(url)
    .then((model) => {
      return model.json()
    })
    // Next, let's initialize the weboji tracker API
    .then((model) => {
      this.model.weboji.sdkHelper.size_canvas({
        canvasId: `handsfree-canvas-${this.id}`,
        callback: (videoSettings) => {
          this.model.weboji.sdk.init({
            canvasId: `handsfree-canvas-${this.id}`,
            NNCpath: JSON.stringify(model),
            animateDelay: this.config.models.weboji.throttle,
            videoSettings,
            callbackReady: () => {
              document.body.classList.remove('handsfree-loading')
              this.model.weboji.loaded = true
              this.maybeStartTracking()
            }
          })
        }
      })
    })
    .catch(() => console.error(`Couldn't load weboji tracking model at ${url}`))
}

/**
 * Runs inference with weboji
 */
Handsfree.prototype._inferWeboji = Handsfree.prototype.inferWeboji = function() {
  // weboji [yaw, pitch, roll]
  this.weboji.rotation = this.model.weboji.sdk.get_rotationStabilized()
  // weboji [x, y, scale]
  this.weboji.translation = this.model.weboji.sdk.get_positionScale()
  // [0...10] Morphs between 0 - 1
  this.weboji.morphs = this.model.weboji.sdk.get_morphTargetInfluencesStabilized()
}

/**
 * Zeros the weboji data
 */
Handsfree.prototype.zeroWebojiData = function() {
  this.weboji.pointer = {
    x: 0,
    y: 0,
    state: '',
    $target: null
  }
  this.weboji.rotation = [0, 0, 0]
  this.weboji.translation = [0, 0, 0]
  this.weboji.morphs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}
