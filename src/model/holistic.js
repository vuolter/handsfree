import BaseModel from './base.js'

export default class HolisticModel extends BaseModel {
  constructor (handsfree) {
    super(handsfree)
  }

  loadDependencies () {
    // Load holistic
    this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/holistic/holistic.js`, () => {
      this.holistic = new Holistic({locateFile: file => {
        return `${this.handsfree.config.assetsPath}/@mediapipe/holistic/${file}`
      }})

      // Load the holistic camera module
      this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/drawing_utils/drawing_utils.js`, () => {
        this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/camera_utils/camera_utils.js`, () => {
          this.camera = new Camera(this.handsfree.debug.$video, {
            // Run inference
            onFrame: async () => {
              await this.holistic.send({image: this.handsfree.debug.$video})
            },
            width: this.handsfree.debug.$video.width,
            height: this.handsfree.debug.$video.height
          })
          this.camera.start()
        })
      })

      this.holistic.setOptions(this.handsfree.config.holistic)
      this.holistic.onResults(results => this.updateData(results))
    })
  }

  updateData (results) {
    if (this.handsfree.config.showFeed) {
      this.debug(results)
    }
  }

  /**
   * Debugs the holistic model
   */
  debug (results) {
    this.handsfree.debug.context.drawImage(results.image, 0, 0, this.handsfree.debug.$canvas.width, this.handsfree.debug.$canvas.height)

    drawConnectors(this.handsfree.debug.context, results.poseLandmarks, POSE_CONNECTIONS, {
      color: '#00FF00',
      lineWidth: 4
    })
    
    drawLandmarks(this.handsfree.debug.context, results.poseLandmarks, {
      color: '#FF0000',
      lineWidth: 2
    })
    
    drawConnectors(this.handsfree.debug.context, results.faceLandmarks, FACEMESH_TESSELATION, {
      color: '#C0C0C070',
      lineWidth: 1
    })
    
    drawConnectors(this.handsfree.debug.context, results.leftHandLandmarks, HAND_CONNECTIONS, {
      color: '#CC0000',
      lineWidth: 5
    })
    
    drawLandmarks(this.handsfree.debug.context, results.leftHandLandmarks, {
      color: '#00FF00',
      lineWidth: 2
    })
    
    drawConnectors(this.handsfree.debug.context, results.rightHandLandmarks, HAND_CONNECTIONS, {
      color: '#00CC00',
      lineWidth: 5
    })

    drawLandmarks(this.handsfree.debug.context, results.rightHandLandmarks, {
      color: '#FF0000',
      lineWidth: 2
    })    
  }
}