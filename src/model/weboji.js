import BaseModel from './base.js'
import merge from 'lodash/merge'

export default class HolisticModel extends BaseModel {
  constructor (handsfree) {
    super(handsfree)
  }

  loadDependencies () {
    // Load holistic
    this.loadDependency(`${this.handsfree.config.assetsPath}/jeeliz/jeelizFaceTransfer.js`, () => {
      const url = this.handsfree.config.assetsPath + 'jeeliz/jeelizFaceTransferNNC.json'
      this.api = window.JEEFACETRANSFERAPI

      fetch(url)
        .then(model => model.json())
        // Next, let's initialize the weboji tracker API
        .then(model => {
          window.JEELIZ_RESIZER.size_canvas({
            canvasId: `handsfree-canvas-${this.handsfree.id}`,
            callback: (videoSettings) => {
              if (typeof videoSettings === 'object') {
                videoSettings = merge(videoSettings, this.handsfree.config.weboji.videoSettings)
              } else {
                videoSettings = this.handsfree.config.weboji.videoSettings
              }

              this.api.init({
                canvasId: `handsfree-canvas-webgl-${this.handsfree.id}`,
                NNC: JSON.stringify(model),
                videoSettings,
                callbackReady: () => {
                  this.isReady = true
                  this.handsfree.emit('modelLoaded')
                  this.handsfree.emit('webojiModelLoaded')
                  this.handsfree.emit('wbeojiModelReady')
                  document.body.classList.add('handsfree-model-weboji')
                }
              })
            }
          })
        })
        .catch((ev) => {
          console.log(ev)
          console.error(`Couldn't load weboji tracking model at ${url}`)
          this.handsfree.emit('modelError', this)
        })
    })
  }

  updateData (results) {}

  /**
   * Debugs the holistic model
   */
  debug (results) {
  }
}