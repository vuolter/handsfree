import BaseModel from './base.js'

export default class HolisticModel extends BaseModel {
  constructor (handsfree) {
    super(handsfree)
  }

  loadDependencies () {
    // Load holistic
    this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/holistic/holistic.js`, () => {
      this.api = new window.Holistic({locateFile: file => {
        return `${this.handsfree.config.assetsPath}/@mediapipe/holistic/${file}`
      }})

      // Load the holistic camera module
      this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/drawing_utils/drawing_utils.js`, () => {
        this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/camera_utils/camera_utils.js`, () => {
          this.camera = new Camera(this.handsfree.debug.$video, {
            // Run inference
            onFrame: async () => {
              if (this.handsfree.isLooping) {
                await this.api.send({image: this.handsfree.debug.$video})
              }
            },
            width: this.handsfree.debug.$video.width,
            height: this.handsfree.debug.$video.height
          })

          this.camera.start()
          this.dependenciesLoaded = true
          this.handsfree.emit('modelLoaded')
          this.handsfree.emit('holisticModelLoaded')
          this.handsfree.emit('holisticModelReady')
          document.body.classList.add('handsfree-model-holistic')
        })
      })

      this.api.setOptions(this.handsfree.config.holistic)
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
   * Debugs the holistic model
   */
  debug (results) {
    // this.handsfree.debug.context.drawImage(results.image, 0, 0, this.handsfree.debug.$canvas.width, this.handsfree.debug.$canvas.height)
    this.handsfree.debug.context.clearRect(0, 0, this.handsfree.debug.$canvas.width, this.handsfree.debug.$canvas.height)

    drawConnectors(this.handsfree.debug.context, results.poseLandmarks, POSE_CONNECTIONS, {
      color: '#0f0',
      lineWidth: 4
    })
    
    drawLandmarks(this.handsfree.debug.context, results.poseLandmarks, {
      color: '#f00',
      lineWidth: 2
    })
    
    drawConnectors(this.handsfree.debug.context, results.faceLandmarks, FACEMESH_TESSELATION, {
      color: '#00f',
      lineWidth: 1
    })
    
    drawConnectors(this.handsfree.debug.context, results.leftHandLandmarks, HAND_CONNECTIONS, {
      color: '#0f0',
      lineWidth: 5
    })
    
    drawLandmarks(this.handsfree.debug.context, results.leftHandLandmarks, {
      color: '#f0f',
      lineWidth: 2
    })
    
    drawConnectors(this.handsfree.debug.context, results.rightHandLandmarks, HAND_CONNECTIONS, {
      color: '#0f0',
      lineWidth: 5
    })

    drawLandmarks(this.handsfree.debug.context, results.rightHandLandmarks, {
      color: '#f0f',
      lineWidth: 2
    })    
  }
}