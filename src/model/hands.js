import BaseModel from './base.js'

export default class HandsModel extends BaseModel {
  constructor (handsfree, config) {
    super(handsfree, config)
    this.name = 'hands'

    // Without this the loading event will happen before the first frame
    this.hasLoadedAndRun = false

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
          this.camera = new Camera(this.handsfree.debug.$video, {
            // Run inference
            onFrame: async () => {
              if (!this.hasLoadedAndRun) {
                this.hasLoadedAndRun = true
                this.handsfree.emit('modelReady', this)
                this.handsfree.emit('handsModelReady', this)
                document.body.classList.add('handsfree-model-hands')      
              } else if (this.enabled && this.handsfree.isLooping) {
                await this.api.send({image: this.handsfree.debug.$video})
              }
            },
            width: this.handsfree.debug.$video.width,
            height: this.handsfree.debug.$video.height
          })

          this.camera.start()
          this.dependenciesLoaded = true

          callback && callback(this)
        })
      })

      this.api.setOptions(this.handsfree.config.hands)
      this.api.onResults(results => this.updateData(results))
    })
  }

  getData () {}
  
  updateData (results) {
    this.data = results
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