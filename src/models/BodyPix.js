const Handsfree = window.Handsfree
import * as bodyPix from '@tensorflow-models/body-pix'

/**
 * Begins loading BodyPix
 */
Handsfree.prototype.loadBodyPix = async function() {
  if (!this.config.models.bodypix.sdk) {
    this.config.models.bodypix.sdk = await bodyPix.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2
    })

    this.emit('dependenciesReady')
  }
}
