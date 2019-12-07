const Handsfree = window.Handsfree

/**
 * Begins loading BodyPix
 */
Handsfree.prototype.loadBodypixDependencies = async function() {
  if (!this.model.bodypix.sdk) {
    this.loadAndWait([Handsfree.libSrc + 'models/tfjs@1.2.js'], () => {
      this.loadAndWait([Handsfree.libSrc + 'models/body-pix@2.0.js'], () => {
        this.bindBodypix()
      })
    })
  } else {
    this.bindBodypix()
  }
}

/**
 * Binds the SDK classes to handsfree properties
 */
Handsfree.prototype.bindBodypix = function() {
  this.model.bodypix.sdk = window.bodyPix
}

/**
 * Maybe starts bodypix, looping until dependencies are loaded
 */
Handsfree.prototype.maybeStartBodypix = function() {
  if (!this.model.bodypix.sdk) {
    setTimeout(() => {
      this.maybeStartBodypix()
    }, 10)
  } else {
    this.getUserMedia(() => {
      this.loadBodypixModel()
    })
  }
}

/**
 * Loads bodypix
 */
Handsfree.prototype.loadBodypixModel = async function() {
  this.model.bodypix.sdk = await this.model.bodypix.sdk.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2
  })

  this.model.bodypix.loaded = true
  this.maybeStartTracking()
}

Handsfree.prototype.inferBodypix = function() {
  console.log('inferring with bodypix')
}
