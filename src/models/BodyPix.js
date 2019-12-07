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
  this.model.bodypix.net = await this.model.bodypix.sdk.load(
    this.config.models.bodypix.modelConfig
  )

  this.model.bodypix.loaded = true
  this.maybeStartTracking()
}

Handsfree.prototype.inferBodypix = async function() {
  let segmentation = await this.model.bodypix.net.segmentPerson(
    this.debugger.video,
    {
      internalResolution: 'medium',
      segmentationThreshold: 0.7,
      maxDetections: 1
    }
  )

  this.body.poses = segmentation.allPoses
  this.body.pose = segmentation.allPoses[0]
  this.body.segmentation = segmentation.data

  // Show debug
  if (this.debugger.isVisible) {
    this.model.bodypix.sdk.drawMask(
      this.debugger.debug,
      this.debugger.video,
      this.model.bodypix.sdk.toMask(segmentation),
      1,
      0,
      0
    )
  }
}
