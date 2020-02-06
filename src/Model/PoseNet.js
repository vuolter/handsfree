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
    this.api.singlePose((pose) => {
      this.data = pose
    })
  }

  /**
   * Loads the actual model and initializes posenet
   * @see https://ml5js.org/reference/api-PoseNet/
   */
  onDepsLoaded() {
    this.handsfree.getUserMedia(() => {
      this.api = ml5.poseNet(
        this.handsfree.feedback.$video,
        this.config,
        () => {
          this.isReady = true
          this.emit('modelLoaded')
        }
      )
    })
  }
}
