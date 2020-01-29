import BaseModel from './index'

/**
 * @see https://github.com/jeeliz/jeelizWeboji
 */
export default class WebojiModel extends BaseModel {
  constructor(...args) {
    super(...args)

    this.data = {
      // weboji [yaw, pitch, roll]
      rotation: [],
      // weboji [x, y, scale]
      translation: [],
      // [0...10] Morphs between 0 - 1
      morphs: []
    }
  }

  /**
   * Adds data
   */
  getData() {
    this.data.rotation = this.api.get_rotationStabilized()
    this.data.translation = this.api.get_positionScale()
    this.data.morphs = this.api.get_morphTargetInfluencesStabilized()

    return this.data
  }

  /**
   * Loads the actual model and initializes Weboji
   * @see https://github.com/jeeliz/jeelizWeboji
   */
  onDepsLoaded() {
    const url = this.config.assetsPath + 'jeelizFaceTransferNNC.json'

    this.api = window.JEEFACETRANSFERAPI
    this.apiHelper = window.JEELIZ_RESIZER

    fetch(url)
      .then((model) => {
        return model.json()
      })
      // Next, let's initialize the weboji tracker API
      .then((model) => {
        this.apiHelper.size_canvas({
          canvasId: `handsfree-canvas-${this.config.id}`,
          callback: (videoSettings) => {
            this.api.init({
              canvasId: `handsfree-canvas-${this.config.id}`,
              NNCpath: JSON.stringify(model),
              animateDelay: this.config.throttle,
              videoSettings,
              callbackReady: () => {
                this.isReady = true
                this.emit('modelLoaded')
              }
            })
          }
        })
      })
      .catch(() => {
        console.error(`Couldn't load weboji tracking model at ${url}`)
        this.emit('modelError')
      })
  }
}
