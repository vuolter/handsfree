import { merge } from 'lodash'

const Handsfree = window.Handsfree

/**
 * Creates a calibrator panel
 */
Handsfree.prototype.createGestureRecorderOverlay = function(opts) {
  if (!this.config.gestureRecorder.target) {
    // Wrap
    this.gestureRecorder.wrap = document.createElement('DIV')
    this.gestureRecorder.wrap.classList.add('handsfree-gesture-recorder-wrap')

    // Countdown Message
    this.gestureRecorder.$message = document.createElement('h1')

    document.body.appendChild(this.gestureRecorder.wrap)
    this.gestureRecorder.wrap.appendChild(this.gestureRecorder.$message)
  }
}

/**
 * Start calibrating
 */
Handsfree.prototype.recordGesture = function(opts) {
  // Setup opts
  this.gestureRecorder.opts = opts = merge(
    {
      gestureName: '',
      delaySeconds: 3,
      numSamples: 100,
      models: ['head'],
      storeInLocalStorage: false,
      exportToJSON: false
    },
    opts
  )

  // Make sure selected models are running
  if (typeof opts.models === 'string') opts.models = [opts.models]
  opts.models.forEach((model) => {
    this.model[model].enabled = true
  })
  this.reload()

  // Countdown Message
  let timesLooped = 0
  const interval = setInterval(() => {
    let message = this.config.gestureRecorder.countdownMessage.replace(
      /\{countdown\}/g,
      opts.delaySeconds - timesLooped
    )
    this.gestureRecorder.$message.innerHTML = message

    if (++timesLooped === opts.delaySeconds) {
      clearInterval(interval)
      this.gestureRecorder.samples = []
      Handsfree.enable('gestureRecorder.collectSample')
      handsfree.start()
    }
  }, 1000)

  this.gestureRecorder.wrap.classList.add('handsfree-visible')
  document.body.classList.add('handsfree-recording-gesture')

  // Disable calibration on calibration
  this.on('handsfreeGestureRecordingEnded', () => {
    Handsfree.disable('gestureRecorder.collectSample')
    document.body.classList.remove('handsfree-recording-gesture')
    this.gestureRecorder.wrap.classList.remove('handsfree-visible')
  })
}

/**
 * Recursively collect gesture samples
 */
Handsfree.use('gestureRecorder.collectSample', {
  onFrame() {
    console.log('collecting sample')
  }
})
