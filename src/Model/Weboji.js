import BaseModel from './index'

export default class WebojiModel extends BaseModel {
  constructor(...args) {
    super(...args)
  }

  onDepsLoaded() {
    const url = this.config.modelPath + 'jeelizFaceTransferNNC.json'

    this.api = window.JEEFACETRANSFERAPI
    this.apiHelper = window.JEELIZ_RESIZER

    document.body.classList.add('handsfree-loading')
    fetch(url)
      .then((model) => {
        return model.json()
      })
      // Next, let's initialize the weboji tracker API
      .then((model) => {
        this.apiHelper.size_canvas({
          canvasId: `handsfree-canvas`,
          callback: (videoSettings) => {
            this.api.init({
              canvasId: `handsfree-canvas`,
              NNCpath: JSON.stringify(model),
              animateDelay: this.config.throttle,
              videoSettings,
              callbackReady: () => {
                document.body.classList.remove('handsfree-loading')
                this.isReady = true
                this.maybeStartTracking()
              }
            })
          }
        })
      })
      .catch(() =>
        console.error(`Couldn't load weboji tracking model at ${url}`)
      )
  }
}
