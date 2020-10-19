import BaseModel from './index.js'
import Calibrator from '../Calibrator/index.js'

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

    this.calibrator = new Calibrator(this.config, this.handsfree)
    this.calibrate = () => {
      this.calibrator.start.call(this.calibrator)
    }
  }

  /**
   * Adds data
   */
  getData() {
    this.data.rotation = this.api.get_rotationStabilized()
    this.data.translation = this.api.get_positionScale()
    this.data.morphs = this.api.get_morphTargetInfluencesStabilized()
    this.data.state = this.getStates()

    return this.data
  }

  getStates() {
    /**
     * Handles extra calculations for weboji morphs
     */
    const morphs = this.data.morphs
    const state = this.data.state || {}

    // Smiles
    state.smileRight =
      morphs[0] > this.handsfree.config.weboji.morphs.threshold.smileRight
    state.smileLeft =
      morphs[1] > this.handsfree.config.weboji.morphs.threshold.smileLeft
    state.smile = state.smileRight && state.smileLeft
    state.smirk =
      (state.smileRight && !state.smileLeft) ||
      (!state.smileRight && state.smileLeft)
    state.pursed =
      morphs[7] > this.handsfree.config.weboji.morphs.threshold.mouthRound

    // Eyebrows
    state.browLeftUp =
      morphs[4] > this.handsfree.config.weboji.morphs.threshold.browLeftUp
    state.browRightUp =
      morphs[5] > this.handsfree.config.weboji.morphs.threshold.browRightUp
    state.browsUp =
      morphs[4] > this.handsfree.config.weboji.morphs.threshold.browLeftUp &&
      morphs[5] > this.handsfree.config.weboji.morphs.threshold.browLeftUp

    state.browLeftDown =
      morphs[2] > this.handsfree.config.weboji.morphs.threshold.browLeftDown
    state.browRightDown =
      morphs[3] > this.handsfree.config.weboji.morphs.threshold.browRightDown
    state.browsDown =
      morphs[2] > this.handsfree.config.weboji.morphs.threshold.browLeftDown &&
      morphs[3] > this.handsfree.config.weboji.morphs.threshold.browLeftDown

    state.browsUpDown =
      (state.browLeftDown && state.browRightUp) ||
      (state.browRightDown && state.browLeftUp)

    // Eyes
    state.eyeLeftClosed =
      morphs[8] > this.handsfree.config.weboji.morphs.threshold.eyeLeftClosed
    state.eyeRightClosed =
      morphs[9] > this.handsfree.config.weboji.morphs.threshold.eyeRightClosed
    state.eyesClosed = state.eyeLeftClosed && state.eyeRightClosed

    // Mouth
    state.mouthClosed = morphs[6] === 0
    state.mouthOpen =
      morphs[6] > this.handsfree.config.weboji.morphs.threshold.mouthOpen

    return state
  }

  /**
   * Loads the actual model and initializes Weboji
   * @see https://github.com/jeeliz/jeelizWeboji
   */
  onDepsLoaded() {
    const url = this.handsfree.config.assetsPath + 'jeelizFaceTransferNNC.json'

    this.api = window.JEEFACETRANSFERAPI
    this.apiHelper = window.JEELIZ_RESIZER

    fetch(url)
      .then((model) => {
        return model.json()
      })
      // Next, let's initialize the weboji tracker API
      .then((model) => {
        this.apiHelper.size_canvas({
          canvasId: `handsfree-canvas-${this.handsfree.id}`,
          callback: (videoSettings) => {
            this.api.init({
              canvasId: `handsfree-canvas-${this.handsfree.id}`,
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

  /**
   * Throttles the model
   */
  throttle(time, opts) {
    this.api && this.api.set_animateDelay(time)
    super.throttle(time, opts)
  }
}
