import BaseModel from './index.js'

/**
 * @see https://github.com/tensorflow/tfjs-models/tree/master/handpose
 */
export default class Handpose extends BaseModel {
  constructor(...args) {
    super(...args)

    this.data = {}

    this.fingerLookupIndices = {
      thumb: [0, 1, 2, 3, 4],
      indexFinger: [0, 5, 6, 7, 8],
      middleFinger: [0, 9, 10, 11, 12],
      ringFinger: [0, 13, 14, 15, 16],
      pinky: [0, 17, 18, 19, 20]
    }
  }

  /**
   * Called when depenencies are loaded
   * - Sets up camera
   * 
   * @todo is async necessary?
   */
   onDepsLoaded () {
    this.handsfree.getUserMedia(async () => {
      await tf.setBackend('webgl');
      this.api = await handpose.load()

      this.isReady = true
      this.emit('modelLoaded')
    })
  }
  
  /**
   * Runs inference and sets up other data
   */
  async getData () {
    if (!this.handsfree.feedback.$video) return
    const predictions = await this.api.estimateHands(this.handsfree.feedback.$video)

    this.data = predictions[0]
  }
}
