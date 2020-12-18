import BaseModel from './base.js'

export default class PoseModel extends BaseModel {
  constructor (handsfree, config) {
    super(handsfree, config)
    this.name = 'pose'

    // Without this the loading event will happen before the first frame
    this.hasLoadedAndRun = false

    this.palmPoints = [0, 1, 2, 5, 9, 13, 17]
  }

  loadDependencies (callback) {
    // Load pose
    this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/pose/node_modules/@mediapipe/pose/pose.js`, () => {
      this.api = new window.Pose({locateFile: file => {
        return `${this.handsfree.config.assetsPath}/@mediapipe/pose/node_modules/@mediapipe/pose/${file}`
      }})

      // Load the pose camera module
      this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/drawing_utils/node_modules/@mediapipe/drawing_utils/drawing_utils.js`, () => {
        this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/camera_utils/node_modules/@mediapipe/camera_utils/camera_utils.js`, () => {
          this.camera = new Camera(this.handsfree.debug.$video, {
            // Run inference
            onFrame: async () => {
              if (!this.hasLoadedAndRun) {
                this.hasLoadedAndRun = true
                this.handsfree.emit('modelReady', this)
                this.handsfree.emit('poseModelReady', this)
                document.body.classList.add('handsfree-model-pose')      
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

      this.api.setOptions(this.handsfree.config.pose)
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
   * Debugs the pose model
   */
  debug (results) {
    // Uncomment for quick demo purposes
    // const videoContext = this.handsfree.debug.$canvasWebGL.getContext('2d')
    // this.handsfree.debug.$canvasWebGL.width = this.handsfree.debug.$canvas.width
    // this.handsfree.debug.$canvasWebGL.height = this.handsfree.debug.$canvas.height
    // this.handsfree.debug.$canvasWebGL.style.width = '100%'
    // this.handsfree.debug.$canvasWebGL.style.height = 'auto'
    // this.handsfree.debug.$canvasWebGL.style.opacity = '.2'
    // videoContext.drawImage(results.image, 0, 0, this.handsfree.debug.$canvasWebGL.width, this.handsfree.debug.$canvasWebGL.height)    

    this.handsfree.debug.context.pose.clearRect(0, 0, this.handsfree.debug.$canvas.pose.width, this.handsfree.debug.$canvas.pose.height)

    if (results.poseLandmarks) {
      drawConnectors(this.handsfree.debug.context.pose, results.poseLandmarks, POSE_CONNECTIONS, {color: '#00FF00', lineWidth: 4})
      drawLandmarks(this.handsfree.debug.context.pose, results.poseLandmarks, {color: '#FF0000', lineWidth: 2})
    }
  }
}