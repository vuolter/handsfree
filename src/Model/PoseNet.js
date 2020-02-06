import BaseModel from './index'

/**
 * @see https://ml5js.org/reference/api-PoseNet/
 */
export default class PoseNet extends BaseModel {
  constructor(...args) {
    super(...args)
  }

  /**
   * Stores the data in this.data
   */
  getData() {
    if (!this.isGettingData) {
      this.isGettingData = true
      this.api.singlePose(this.handsfree.feedback.$video)
    }
  }

  /**
   * Listens for the posenet "pose" event
   */
  listenForPose() {
    this.api.on('pose', (pose) => {
      this.isGettingData = false
      this.data = pose[0]
    })
  }

  /**
   * Loads the actual model and initializes posenet
   * @see https://ml5js.org/reference/api-PoseNet/
   */
  onDepsLoaded() {
    this.handsfree.getUserMedia(() => {
      this.api = ml5.poseNet(() => {
        this.isReady = true
        this.emit('modelLoaded')
        this.listenForPose()
      }, this.config)
    })
  }
}
