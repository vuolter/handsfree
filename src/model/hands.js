import BaseModel from './base.js'

export default class HandsModel extends BaseModel {
  constructor (handsfree, config) {
    super(handsfree, config)
    this.name = 'hands'

    this.palmPoints = [0, 1, 2, 5, 9, 13, 17]
  }

  loadDependencies (callback) {
    // Load hands
    this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/hands/node_modules/@mediapipe/hands/hands.js`, () => {
      this.api = new window.Hands({locateFile: file => {
        return `${this.handsfree.config.assetsPath}/@mediapipe/hands/node_modules/@mediapipe/hands/${file}`
      }})

      // Load the hands camera module
      this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/drawing_utils/node_modules/@mediapipe/drawing_utils/drawing_utils.js`, () => {
        this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/camera_utils/node_modules/@mediapipe/camera_utils/camera_utils.js`, () => {
          this.handsfree.getUserMedia(() => {
            // Warm up before using in loop
            // - If we don't do this there will be too many initial hits and cause an error
            this.api.send({image: this.handsfree.debug.$video}).then(() => {
              this.dependenciesLoaded = true
              this.handsfree.emit('modelReady', this)
              this.handsfree.emit('handsModelReady', this)
              document.body.classList.add('handsfree-model-hands')                    
              callback && callback(this)
            })
          })
        })
      })

      this.api.setOptions(this.handsfree.config.hands)
      this.api.onResults(results => this.updateData(results))
    })
  }

  async getData () {
    this.dependenciesLoaded && await this.api.send({image: this.handsfree.debug.$video})
  }
  
  updateData (results) {
    this.data = results
    this.handsfree.data.hands = results
    if (this.handsfree.config.showDebug) {
      this.debug(results)
    }
  }

  /**
   * Debugs the hands model
   */
  debug (results) {
    this.handsfree.debug.context.hands.clearRect(0, 0, this.handsfree.debug.$canvas.hands.width, this.handsfree.debug.$canvas.hands.height)
    
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(this.handsfree.debug.context.hands, landmarks, HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 5})
        drawLandmarks(this.handsfree.debug.context.hands, landmarks, {color: '#FF0000', lineWidth: 2})
      }
    }
  }
}