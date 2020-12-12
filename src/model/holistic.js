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
      this.holistic.onResults(results => this.handsfree.onLoop(results))
    })
  }
}