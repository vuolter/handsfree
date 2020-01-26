const Handsfree = window.Handsfree

/**
 * Creates a calibrator panel
 */
Handsfree.prototype.createCalibratorOverlay = function() {
  if (!this.calibrator.target) {
    // Wrap
    this.calibrator.wrap = document.createElement('DIV')
    this.calibrator.wrap.classList.add('handsfree-calibrator-wrap')

    // Instructions
    let $p = document.createElement('p')
    $p.innerHTML = this.config.calibrator.instructions
    this.calibrator.wrap.appendChild($p)

    // Marker
    let $marker = document.createElement('DIV')
    $marker.classList.add('handsfree-calibrator-marker')
    this.calibrator.marker = $marker
    this.calibrator.wrap.appendChild($marker)

    document.body.appendChild(this.calibrator.wrap)
  }
}

/**
 * Starts the calibration process
 * - Shows calibration overlay
 */
Handsfree.prototype.startCalibration = function() {
  this.isStarted && this.calibrator.wrap.classList.add('handsfree-visible')
  Handsfree.plugins.head.calibration.framesCalibrated = 0
  Handsfree.enable('head.calibration')
  document.body.classList.add('handsfree-calibrating')

  // Disable calibration on calibration
  this.on('handsfreeCalibrationEnded', () => {
    Handsfree.disable('head.calibration')
    document.body.classList.remove('handsfree-calibrating')
    this.calibrator.wrap.classList.remove('handsfree-visible')
  })
}

/**
 * Calibration plugin
 */
Handsfree.use('head.calibration', {
  enabled: false,
  framesCalibrated: 0,
  numFramesToCalibrate: 60,

  onFrame(instance) {
    const bounds = instance.calibrator.marker.getBoundingClientRect()
    const center = {
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2
    }
    const dist = Math.sqrt(
      Math.pow(instance.head.pointer.x - center.x, 2) +
        Math.pow(instance.head.pointer.y - center.y, 2)
    )

    this.step(instance.head, dist, center)
    this.maybeEndCalibration(instance, dist)
  },

  /**
   * Step the pointer towards the center
   */
  step(head, dist, center) {
    const stepSize = dist < 40 ? 3 : 20

    // Move toward center
    if (head.pointer.x < center.x) {
      Handsfree.plugins.head.pointer.config.offset.x += stepSize
    } else {
      Handsfree.plugins.head.pointer.config.offset.x -= stepSize
    }
    if (head.pointer.y < center.y) {
      Handsfree.plugins.head.pointer.config.offset.y += stepSize
    } else {
      Handsfree.plugins.head.pointer.config.offset.y -= stepSize
    }
  },

  /**
   * Ends calibration when the pointer is near the center
   */
  maybeEndCalibration(instance, dist) {
    if (dist < 30) {
      this.framesCalibrated++
    } else {
      this.framesCalibrated = 0
    }

    if (this.framesCalibrated > this.numFramesToCalibrate) {
      instance.emit('handsfreeCalibrationEnded')
    }
  }
})
