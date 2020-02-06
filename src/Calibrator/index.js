export default class Calibrator {
  constructor(config, handsfree) {
    this.config = config
    this.handsfree = handsfree

    // The main wrapping element
    this.$wrap = null
    // The calibration target
    this.$target = null

    this.prepareWrap()

    this.setupPlugin()
  }

  /**
   * Creates the main calibration overlay
   */
  prepareWrap() {
    // Wrap
    this.$wrap = document.createElement('DIV')
    this.$wrap.classList.add('handsfree-calibrator-wrap')

    // Instructions
    let $p = document.createElement('p')
    $p.innerHTML = this.config.calibrator.instructions
    this.$wrap.appendChild($p)

    // Marker
    let $marker = document.createElement('DIV')
    $marker.classList.add('handsfree-calibrator-marker')
    this.$target = $marker
    this.$wrap.appendChild($marker)

    document.body.appendChild(this.$wrap)
  }

  /**
   * Starts the calibration
   */
  start() {
    this.$wrap.classList.add('handsfree-visible')
    this.handsfree.plugin.webojiCalibration.framesCalibrated = 0
    this.handsfree.plugin.webojiCalibration.enable()
    document.body.classList.add('handsfree-calibrating')

    // Disable calibration on calibration
    this.handsfree.on('handsfreeCalibrationEnded', () => {
      this.handsfree.plugin.webojiCalibration.disable()
      document.body.classList.remove('handsfree-calibrating')
      this.$wrap.classList.remove('handsfree-visible')
    })
  }

  /**
   * Creates a plugin used during calibration
   */
  setupPlugin() {
    const plugin = this

    /**
     * Calibration plugin
     */
    this.handsfree.use('webojiCalibration', {
      enabled: false,
      framesCalibrated: 0,
      numFramesToCalibrate: 60,

      onFrame({ weboji }) {
        const bounds = plugin.$target.getBoundingClientRect()
        const center = {
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2
        }
        const dist = Math.sqrt(
          Math.pow(weboji.pointer.x - center.x, 2) +
            Math.pow(weboji.pointer.y - center.y, 2)
        )

        this.step(weboji, dist, center)
        this.maybeEndCalibration(dist)
      },

      /**
       * Step the pointer towards the center
       */
      step(weboji, dist, center) {
        const stepSize = dist < 60 ? 3 : 20

        // Move toward center
        if (weboji.pointer.x < center.x) {
          handsfree.plugin.facePointer.config.offset.x += stepSize
        } else {
          handsfree.plugin.facePointer.config.offset.x -= stepSize
        }
        if (weboji.pointer.y < center.y) {
          handsfree.plugin.facePointer.config.offset.y += stepSize
        } else {
          handsfree.plugin.facePointer.config.offset.y -= stepSize
        }
      },

      /**
       * Ends calibration when the pointer is near the center
       */
      maybeEndCalibration(dist) {
        if (dist < 20) {
          this.framesCalibrated++
        } else {
          this.framesCalibrated = 0
        }

        if (this.framesCalibrated > this.numFramesToCalibrate) {
          this.handsfree.emit('handsfreeCalibrationEnded')
        }
      }
    })
  }
}
