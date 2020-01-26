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
    let $p = document.createElement('p')
    $p.innerHTML = this.config.gestureRecorder.countdownMessage
    this.gestureRecorder.wrap.appendChild($p)

    document.body.appendChild(this.gestureRecorder.wrap)
  }
}

/**
 * Start calibrating
 */
Handsfree.prototype.recordGesture = function(opts) {
  // Make sure selected models are running
  if (typeof opts.models === 'string') opts.models = [opts.models]
  opts.models.forEach((model) => {
    this.model[model].enabled = true
  })
  this.reload()

  // Setup opts
  opts = merge(
    {
      gestureName: '',
      delayTime: 3000,
      duration: 5000,
      models: 'head',
      storeInLocalStorage: false,
      exportToJSON: false
    },
    opts
  )
}
