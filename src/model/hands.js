import BaseModel from './base.js'

export default class HandsModel extends BaseModel {
  constructor (handsfree, config) {
    super(handsfree, config)
    this.name = 'hands'

    this.palmPoints = [0, 1, 2, 5, 9, 13, 17]
  }

  loadDependencies (callback) {
    // Just load utils on client
    if (this.handsfree.config.isClient) {
      this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/drawing_utils/node_modules/@mediapipe/drawing_utils/drawing_utils.js`, () => {
        this.onWarmUp(callback)
      })

      return
    }

    // Load hands
    this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/hands/node_modules/@mediapipe/hands/hands.js`, () => {
      // Configure model
      this.api = new window.Hands({locateFile: file => {
        return `${this.handsfree.config.assetsPath}/@mediapipe/hands/node_modules/@mediapipe/hands/${file}`
      }})
      this.api.setOptions(this.handsfree.config.hands)
      this.api.onResults(results => this.dataReceived(results))

      // Load the media stream
      this.handsfree.getUserMedia(() => {
        // Warm up before using in loop
        if (!this.handsfree.mediapipeWarmups.isWarmingUp) {
          this.warmUp(callback)
        } else {
          this.handsfree.on('mediapipeWarmedUp', () => {
            if (!this.handsfree.mediapipeWarmups.isWarmingUp && !this.handsfree.mediapipeWarmups[this.name]) {
              this.warmUp(callback)
            }
          })
        }
      })

      // Load the hands camera module
      this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/drawing_utils/node_modules/@mediapipe/drawing_utils/drawing_utils.js`)
    })
  }

  /**
   * Warms up the model
   */
  warmUp (callback) {
    this.handsfree.mediapipeWarmups[this.name] = true
    this.handsfree.mediapipeWarmups.isWarmingUp = true
    this.api.send({image: this.handsfree.debug.$video}).then(() => {
      this.handsfree.mediapipeWarmups.isWarmingUp = false
        this.onWarmUp(callback)
    })
  }

  /**
   * Called after the model has been warmed up
   * - If we don't do this there will be too many initial hits and cause an error
   */
  onWarmUp (callback) {
    this.dependenciesLoaded = true
    document.body.classList.add('handsfree-model-hands')                    
    this.handsfree.emit('modelReady', this)
    this.handsfree.emit('handsModelReady', this)
    this.handsfree.emit('mediapipeWarmedUp', this)
    callback && callback(this)
  }

  /**
   * Get data
   */
  async getData () {
    this.dependenciesLoaded && await this.api.send({image: this.handsfree.debug.$video})
  }
  // Called through this.api.onResults
  dataReceived (results) {
    this.data = results
    this.handsfree.data.hands = results
    if (this.handsfree.isDebugging) {
      this.debug(results)
    }
  }

  /**
   * Debugs the hands model
   */
  debug (results) {
    // Bail if drawing helpers haven't loaded
    if (typeof drawConnectors === 'undefined') return
    
    // Clear the canvas
    this.handsfree.debug.context.hands.clearRect(0, 0, this.handsfree.debug.$canvas.hands.width, this.handsfree.debug.$canvas.hands.height)
    
    // Draw skeletons
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(this.handsfree.debug.context.hands, landmarks, HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 5})
        drawLandmarks(this.handsfree.debug.context.hands, landmarks, {color: '#FF0000', lineWidth: 2})
      }
    }
  }
}