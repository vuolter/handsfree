import BaseModel from './base.js'
import merge from 'lodash/merge'

export default class HolisticModel extends BaseModel {
  constructor (handsfree, config) {
    super(handsfree, config)
    this.name = 'weboji'
  }

  loadDependencies (callback) {
    // Load holistic
    this.loadDependency(`${this.handsfree.config.assetsPath}/jeeliz/jeelizFaceTransfer.js`, () => {
      const url = this.handsfree.config.assetsPath + '/jeeliz/jeelizFaceTransferNNC.json'
      this.api = window.JEEFACETRANSFERAPI

      fetch(url)
        .then(model => model.json())
        // Next, let's initialize the weboji tracker API
        .then(model => {
          window.JEELIZ_RESIZER.size_canvas({
            canvasId: `handsfree-canvas-weboji-${this.handsfree.id}`,
            callback: (videoSettings) => {
              if (typeof videoSettings === 'object') {
                videoSettings = merge(videoSettings, this.handsfree.config.weboji.videoSettings)
              } else {
                videoSettings = this.handsfree.config.weboji.videoSettings
              }

              this.api.init({
                canvasId: `handsfree-canvas-weboji-${this.handsfree.id}`,
                NNC: JSON.stringify(model),
                videoSettings,
                callbackReady: () => {
                  callback && callback(this)
                  
                  this.dependenciesLoaded = true
                  this.handsfree.emit('modelReady', this)
                  this.handsfree.emit('webojiModelReady', this)
                  document.body.classList.add('handsfree-model-weboji')
                }
              })
            }
          })
        })
        .catch((ev) => {
          console.log(ev)
          console.error(`Couldn't load weboji tracking model at ${url}`)
          this.handsfree.emit('modelError', ev)
        })
    })
  }

  async getData () {
    this.data.rotation = await this.api.get_rotationStabilized()
    this.data.translation = await this.api.get_positionScale()
    this.data.morphs = await this.api.get_morphTargetInfluencesStabilized()
    this.data.state = await this.getStates()
    this.handsfree.data.weboji = this.data

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
}