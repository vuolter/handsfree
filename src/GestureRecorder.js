import { merge } from 'lodash'

const Handsfree = window.Handsfree

/**
 * Creates a calibrator panel
 */
Handsfree.prototype.createGestureRecorderOverlay = function() {
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
  opts = merge(
    {
      gestureName: '',
      delaySeconds: 3,
      numSamples: 100,
      labels: ['base'],
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
  this.gestureRecorder.config = opts
  this.gestureRecorder.countdownTimesLooped = 0
  this.reload()
  handsfree.start()

  // Enable gestureRecorder plugin
  this.gestureRecordCountdown(() => {
    this.gestureRecorder.samples = []
    this.gestureRecorder.curLabelIndex = 0
    this.gestureRecorder.config.labels.forEach(() => {
      this.gestureRecorder.samples.push([])
    })

    Handsfree.enable('gestureRecorder.collectSample')
  })

  // End gesture recording
  this.on('handsfreeGestureRecordingEnded', () => {
    Handsfree.disable('gestureRecorder.collectSample')
    document.body.classList.remove('handsfree-recording-gesture')
    this.gestureRecorder.wrap.classList.remove('handsfree-visible')
    this.createModel()
  })
}

/**
 * Countdown to recording a gesture
 * @param {Function} cb The callback to call once we've counted down
 */
Handsfree.prototype.gestureRecordCountdown = function(cb) {
  // Show countdown
  this.gestureRecorder.wrap.classList.add('handsfree-visible')
  document.body.classList.add('handsfree-recording-gesture')

  // Update message
  let secondsLeft =
    this.gestureRecorder.config.delaySeconds -
    this.gestureRecorder.countdownTimesLooped

  secondsLeft = secondsLeft < 0 ? 0 : secondsLeft
  let message = this.config.gestureRecorder.countdownMessage.replace(
    /\{countdown\}/g,
    secondsLeft
  )
  message = message.replace(
    /\{label\}/g,
    this.gestureRecorder.config.labels[this.gestureRecorder.curLabelIndex]
  )
  this.gestureRecorder.$message.innerHTML = message

  // Zero data and start collecting samples
  if (
    this.gestureRecorder.countdownTimesLooped >=
    this.gestureRecorder.config.delaySeconds
  ) {
    cb()
  } else {
    setTimeout(() => {
      ++this.gestureRecorder.countdownTimesLooped
      this.gestureRecordCountdown(cb)
    }, 1000)
  }
}

/**
 * Recursively collect gesture samples
 */
Handsfree.use('gestureRecorder.collectSample', {
  enabled: false,

  onFrame(handsfree) {
    let data = []
    let gestureRecorder = handsfree.gestureRecorder

    // Exit if models aren't active yet
    if (
      gestureRecorder.config.models.includes('head') &&
      !handsfree.head.translation.length
    )
      return
    if (
      gestureRecorder.config.models.includes('bodypix') &&
      !handsfree.body.pose.keypoints
    )
      return

    // Loop through each model and store data in a flattened array
    gestureRecorder.config.models.forEach((model) => {
      switch (model) {
        case 'head':
          Array.prototype.push.apply(
            data,
            handsfree.head.translation,
            handsfree.head.rotation,
            handsfree.head.morphs
          )
          break

        case 'bodypix':
          let flatKeypoints = []
          handsfree.body.pose.keypoints.forEach((keypoint) => {
            flatKeypoints.push(keypoint.x)
            flatKeypoints.push(keypoint.y)
          })

          Array.prototype.push.apply(data, flatKeypoints)
          break
      }
    })
    gestureRecorder.samples[gestureRecorder.curLabelIndex].push(data)

    // Update message
    let message = handsfree.config.gestureRecorder.recordingMessage.replace(
      /\{numSamples\}/g,
      gestureRecorder.samples[gestureRecorder.curLabelIndex].length
    )
    message = message.replace(
      /\{label\}/g,
      gestureRecorder.config.labels[gestureRecorder.curLabelIndex]
    )
    gestureRecorder.$message.innerHTML = message

    // Finish recording or countdown for next label
    if (
      gestureRecorder.samples[gestureRecorder.curLabelIndex].length >=
      gestureRecorder.config.numSamples
    ) {
      gestureRecorder.curLabelIndex++
      Handsfree.disable('gestureRecorder.collectSample')

      if (
        gestureRecorder.curLabelIndex < gestureRecorder.config.labels.length
      ) {
        handsfree.gestureRecorder.countdownTimesLooped = 0
        handsfree.gestureRecordCountdown(() => {
          Handsfree.enable('gestureRecorder.collectSample')
        })
      } else {
        handsfree.emit('handsfreeGestureRecordingEnded')
      }
    }
  }
})

/**
 * Create a model
 */
Handsfree.prototype.createModel = function() {
  this.loadAndWait([Handsfree.libSrc + 'models/ml5@0.4.3.js'], () => {
    this.ml5 = window.ml5

    // this.ml5.neuralNetwork({
    //   inputs: this.gestureRecorder.samples[0].length,
    //   outputs: this.gestureRecorder.config.labels.length,
    //   task: 'classification',
    //   debug: true
    // })
  })
}
