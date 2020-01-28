export default class GestureRecorder {
  /**
   * (∩｀-´)⊃━☆ﾟ.*・｡ﾟ GestureRecorder
   *
   * @param {Object} config The handsfree instance config
   */
  constructor(config = {}, handsfree) {
    // Shorthand to this class' config
    this.config = config.gestureRecorder
    // Options passed into handsfree.recordGesture
    this.recordConfig = {}
    // Collected samples
    this.samples = []
    // A reference to the parent instance
    this.handsfree = handsfree

    // Overlay
    this.overlay = {
      // The wrapping div
      $wrap: this.config.$wrap,
      // The div recieving collecting/training updates
      $message: this.config.$message
    }

    // Misc properties
    // Used within countdown timers
    this.numSecondsWaited = 0
    // The current label being sampled/trained
    this.curLabelIndex = 0

    this.createOverlay()
  }

  /**
   * Creates a gesture recording overlay
   */
  createOverlay() {
    // Setup wrapping element
    if (!this.config.$wrap) {
      this.overlay.$wrap = document.createElement('DIV')
      this.overlay.$wrap.classList.add('handsfree-gesture-recorder-wrap')

      document.body.appendChild(this.overlay.$wrap)
    }

    // Setup message container
    if (!this.config.$message) {
      this.overlay.$message = document.createElement('h1')
      this.overlay.$wrap.appendChild(this.overlay.$message)
    }
  }

  /**
   * Start recording a gesture
   *
   * @param {Object} opts Config options
   * @param {Function} onReady Callback to call once recording, training, and saving is done
   */
  record(opts = {}, onReady = null) {
    // Set defaults
    this.recordConfig = Object.assign(
      {
        gestureSet: '',
        download: false,
        delaySeconds: 3,
        numSamples: 100,
        labels: ['base'],
        models: ['weboji'],
        onReady
      },
      opts
    )

    // Make sure selected models are running
    if (typeof this.recordConfig.models === 'string') {
      this.recordConfig.models = [this.recordConfig.models]
    }
    this.recordConfig.models.forEach((model) => {
      this.handsfree.model[model].enabled = true
    })

    // Reload and run
    this.numSecondsWaited = 0
    this.handsfree.reload()
    this.handsfree.start()

    // Enable gestureRecorder plugin
    this.curLabelIndex = 0
    this.countdown(() => {
      this.samples = []
      this.curLabelIndex = 0
      this.recordConfig.labels.forEach(() => {
        this.samples.push([])
      })

      window.Handsfree.enable('gestureRecorder.collectSample')
    })

    // End gesture recording
    this.handsfree.on('handsfreeGestureRecordingEnded', () => {
      window.Handsfree.disable('gestureRecorder.collectSample')
      this.handsfree.createGestureModel()
    })
  }

  /**
   * Countdown to recording a gesture
   * @param {Function} cb The callback to call once we've counted down
   */
  countdown(cb) {
    // Show countdown
    this.overlay.$wrap.classList.add('handsfree-visible')
    document.body.classList.add('handsfree-recording-gesture')

    // Update message
    let secondsLeft = this.recordConfig.delaySeconds - this.numSecondsWaited

    secondsLeft = secondsLeft < 0 ? 0 : secondsLeft
    let message = this.config.countdownMessage.replace(
      /\{countdown\}/g,
      secondsLeft
    )
    message = message.replace(
      /\{label\}/g,
      this.recordConfig.labels[this.curLabelIndex]
    )
    this.overlay.$message.innerHTML = message

    // Zero data and start collecting samples
    if (this.numSecondsWaited >= this.recordConfig.delaySeconds) {
      cb()
    } else {
      setTimeout(() => {
        ++this.numSecondsWaited
        this.countdown(cb)
      }, 1000)
    }
  }
}

require('./gestureCollectingPlugin')
