import BaseModel from './base.js'

export default class HolisticModel extends BaseModel {
  constructor (handsfree, config) {
    super(handsfree, config)
    this.name = 'holistic'

    // Without this the loading event will happen before the first frame
    this.hasLoadedAndRun = false

    this.palmPoints = [0, 1, 2, 5, 9, 13, 17]
  }

  loadDependencies (callback) {
    // Load holistic
    this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/holistic/node_modules/@mediapipe/holistic/holistic.js`, () => {
      this.api = new window.Holistic({locateFile: file => {
        return `${this.handsfree.config.assetsPath}/@mediapipe/holistic/node_modules/@mediapipe/holistic/${file}`
      }})
      this.api.setOptions(this.handsfree.config.holistic)
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
    document.body.classList.add('handsfree-model-holistic')                    
    this.handsfree.emit('modelReady', this)
    this.handsfree.emit('holisticModelReady', this)
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
    this.handsfree.data.holistic = results
    if (this.handsfree.config.showDebug) {
      this.debug(results)
    }
  }

  /**
   * Debugs the holistic model
   */
  debug (results) {
    this.handsfree.debug.context.holistic.clearRect(0, 0, this.handsfree.debug.$canvas.holistic.width, this.handsfree.debug.$canvas.holistic.height)

    drawConnectors(this.handsfree.debug.context.holistic, results.poseLandmarks, POSE_CONNECTIONS, {
      color: '#0f0',
      lineWidth: 4
    })
    
    drawLandmarks(this.handsfree.debug.context.holistic, results.poseLandmarks, {
      color: '#f00',
      lineWidth: 2
    })
    
    drawConnectors(this.handsfree.debug.context.holistic, results.faceLandmarks, FACEMESH_TESSELATION, {
      color: '#f0f',
      lineWidth: 1
    })
    
    drawConnectors(this.handsfree.debug.context.holistic, results.leftHandLandmarks, HAND_CONNECTIONS, {
      color: '#0f0',
      lineWidth: 5
    })
    
    drawLandmarks(this.handsfree.debug.context.holistic, results.leftHandLandmarks, {
      color: '#f0f',
      lineWidth: 2
    })
    
    drawConnectors(this.handsfree.debug.context.holistic, results.rightHandLandmarks, HAND_CONNECTIONS, {
      color: '#0f0',
      lineWidth: 5
    })

    drawLandmarks(this.handsfree.debug.context.holistic, results.rightHandLandmarks, {
      color: '#f0f',
      lineWidth: 2
    })    
  }
}