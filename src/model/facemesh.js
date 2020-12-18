import BaseModel from './base.js'

export default class FacemeshModel extends BaseModel {
  constructor (handsfree, config) {
    super(handsfree, config)
    this.name = 'facemesh'

    this.palmPoints = [0, 1, 2, 5, 9, 13, 17]
  }

  loadDependencies (callback) {
    // Load facemesh
    this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/face_mesh/node_modules/@mediapipe/face_mesh/face_mesh.js`, () => {
      this.api = new window.FaceMesh({locateFile: file => {
        return `${this.handsfree.config.assetsPath}/@mediapipe/face_mesh/node_modules/@mediapipe/face_mesh/${file}`
      }})

      // Load the facemesh camera module
      this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/drawing_utils/node_modules/@mediapipe/drawing_utils/drawing_utils.js`, () => {
        this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/camera_utils/node_modules/@mediapipe/camera_utils/camera_utils.js`, () => {
          this.camera = new Camera(this.handsfree.debug.$video, {
            // Run inference
            onFrame: async () => {
              if (this.enabled && this.handsfree.isLooping) {
                await this.api.send({image: this.handsfree.debug.$video})
              }
            },
            width: this.handsfree.debug.$video.width,
            height: this.handsfree.debug.$video.height
          })

          this.camera.start()

          callback && callback(this)
          
          this.dependenciesLoaded = true
          this.handsfree.emit('modelReady', this)
          this.handsfree.emit('facemeshModelReady', this)
          document.body.classList.add('handsfree-model-facemesh')
        })
      })

      this.api.setOptions(this.handsfree.config.facemesh)
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
   * Debugs the facemesh model
   */
  debug (results) {
    // this.handsfree.debug.context.drawImage(results.image, 0, 0, this.handsfree.debug.$canvas.width, this.handsfree.debug.$canvas.height)
    this.handsfree.debug.context.clearRect(0, 0, this.handsfree.debug.$canvas.width, this.handsfree.debug.$canvas.height)

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        drawConnectors(this.handsfree.debug.context, landmarks, FACEMESH_TESSELATION, {color: '#C0C0C070', lineWidth: 1})
        drawConnectors(this.handsfree.debug.context, landmarks, FACEMESH_RIGHT_EYE, {color: '#FF3030'})
        drawConnectors(this.handsfree.debug.context, landmarks, FACEMESH_RIGHT_EYEBROW, {color: '#FF3030'})
        drawConnectors(this.handsfree.debug.context, landmarks, FACEMESH_LEFT_EYE, {color: '#30FF30'})
        drawConnectors(this.handsfree.debug.context, landmarks, FACEMESH_LEFT_EYEBROW, {color: '#30FF30'})
        drawConnectors(this.handsfree.debug.context, landmarks, FACEMESH_FACE_OVAL, {color: '#E0E0E0'})
        drawConnectors(this.handsfree.debug.context, landmarks, FACEMESH_LIPS, {color: '#E0E0E0'})
      }
    }
  }
}