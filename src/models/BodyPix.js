const Handsfree = window.Handsfree

/**
 * Begins loading BodyPix
 */
Handsfree.prototype.loadBodypixDependencies = async function() {
  if (!this.config.isClient) {
    if (!this.model.bodypix.sdk) {
      this.loadAndWait([Handsfree.libSrc + 'models/tfjs@1.2.js'], () => {
        this.loadAndWait([Handsfree.libSrc + 'models/body-pix@2.0.js'], () => {
          this.bindBodypix()
        })
      })
    } else {
      this.bindBodypix()
    }
  } else {
    this.model.bodypix.loaded = true
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
    if (!this.debugger.stream) {
      this.getUserMedia(() => {
        this.loadBodypixModel()
      })
    } else {
      this.loadBodypixModel()
    }
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

/**
 * Run inference
 */
Handsfree.prototype.inferBodypix = async function() {
  let segmentation = await this.model.bodypix.net[this.model.bodypix.method](
    this.debugger.video,
    {
      internalResolution: 'medium',
      segmentationThreshold: 0.7,
      maxDetections: 1
    }
  )

  this.body.data = segmentation
  this.body.poses = segmentation.allPoses
  this.body.pose = segmentation.allPoses[0]

  // Helpers
  this.body.nose = this.body.pose.keypoints[0]
  this.body.nose.x = this.body.nose.position.x
  this.body.nose.y = this.body.nose.position.y

  this.body.leftEye = this.body.pose.keypoints[1]
  this.body.leftEye.x = this.body.leftEye.position.x
  this.body.leftEye.y = this.body.leftEye.position.y

  this.body.rightEye = this.body.pose.keypoints[2]
  this.body.rightEye.x = this.body.rightEye.position.x
  this.body.rightEye.y = this.body.rightEye.position.y

  this.body.leftEar = this.body.pose.keypoints[3]
  this.body.leftEar.x = this.body.leftEar.position.x
  this.body.leftEar.y = this.body.leftEye.position.y

  this.body.rightEar = this.body.pose.keypoints[4]
  this.body.rightEar.x = this.body.rightEar.position.x
  this.body.rightEar.y = this.body.rightEar.position.y

  this.body.leftShoulder = this.body.pose.keypoints[5]
  this.body.leftShoulder.x = this.body.leftShoulder.position.x
  this.body.leftShoulder.y = this.body.leftShoulder.position.y

  this.body.rightShoulder = this.body.pose.keypoints[6]
  this.body.rightShoulder.x = this.body.rightShoulder.position.x
  this.body.rightShoulder.y = this.body.rightShoulder.position.y

  this.body.leftElbow = this.body.pose.keypoints[7]
  this.body.leftElbow.x = this.body.leftElbow.position.x
  this.body.leftElbow.y = this.body.leftElbow.position.y

  this.body.rightElbow = this.body.pose.keypoints[8]
  this.body.rightElbow.x = this.body.rightElbow.position.x
  this.body.rightElbow.y = this.body.rightElbow.position.y

  this.body.leftWrist = this.body.pose.keypoints[9]
  this.body.leftWrist.x = this.body.leftWrist.position.x
  this.body.leftWrist.y = this.body.leftWrist.position.y

  this.body.rightWrist = this.body.pose.keypoints[10]
  this.body.rightWrist.x = this.body.rightWrist.position.x
  this.body.rightWrist.y = this.body.rightWrist.position.y

  this.body.leftHip = this.body.pose.keypoints[11]
  this.body.leftHip.x = this.body.leftHip.position.x
  this.body.leftHip.y = this.body.leftHip.position.y

  this.body.rightHip = this.body.pose.keypoints[12]
  this.body.rightHip.x = this.body.rightHip.position.x
  this.body.rightHip.y = this.body.rightHip.position.y

  this.body.leftKnee = this.body.pose.keypoints[13]
  this.body.leftKnee.x = this.body.leftKnee.position.x
  this.body.leftKnee.y = this.body.leftKnee.position.y

  this.body.rightKnee = this.body.pose.keypoints[14]
  this.body.rightKnee.x = this.body.rightKnee.position.x
  this.body.rightKnee.y = this.body.rightKnee.position.y

  this.body.leftAnkle = this.body.pose.keypoints[15]
  this.body.leftAnkle.x = this.body.leftAnkle.position.x
  this.body.leftAnkle.y = this.body.leftAnkle.position.y

  this.body.rightAnkle = this.body.pose.keypoints[16]
  this.body.rightAnkle.x = this.body.rightAnkle.position.x
  this.body.rightAnkle.y = this.body.rightAnkle.position.y

  // Show debug
  if (this.debugger.isVisible) {
    this.model.bodypix.sdk.drawMask(
      this.debugger.debug,
      this.debugger.video,
      this.model.bodypix.sdk[this.model.bodypix.debugMethod](segmentation),
      1,
      0,
      0
    )
  }
}
