const Handsfree = window.Handsfree

/**
 * Begins loading BodyPix
 */
Handsfree.prototype.loadBodyPixDependencies = async function() {
  if (!this.config.model.bodypix.sdk) {
    this.config.model.bodypix.sdk = await bodyPix.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2
    })

    this.emit('dependenciesReady')
  }
}
