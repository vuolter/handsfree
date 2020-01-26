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
  opts = merge(
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
  this.gestureRecorder.opts = opts
  this.reload()
  handsfree.start()

  // Countdown Message
  const countdown = () => {
    let message = this.config.gestureRecorder.countdownMessage.replace(
      /\{countdown\}/g,
      opts.delaySeconds - timesLooped
    )
    this.gestureRecorder.$message.innerHTML = message
  }

  // Enable gestureRecorder plugin
  let timesLooped = 0
  countdown()
  const interval = setInterval(() => {
    ++timesLooped
    countdown()

    if (timesLooped >= opts.delaySeconds) {
      clearInterval(interval)
      this.gestureRecorder.samples = []
      Handsfree.enable('gestureRecorder.collectSample')
    }
  }, 1000)

  this.gestureRecorder.wrap.classList.add('handsfree-visible')
  document.body.classList.add('handsfree-recording-gesture')

  // End gesture recording
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
  enabled: false,

  onFrame({ config, head, body, emit, gestureRecorder }) {
    let data = []

    // Exit if models aren't active yet
    if (
      gestureRecorder.opts.models.includes('head') &&
      !head.translation.length
    )
      return
    if (gestureRecorder.opts.models.includes('bodypix') && !body.pose.keypoints)
      return

    // Loop through each model and store data in a flattened array
    gestureRecorder.opts.models.forEach((model) => {
      switch (model) {
        case 'head':
          Array.prototype.push.apply(
            data,
            head.translation,
            head.rotation,
            head.morphs
          )
          break

        case 'bodypix':
          let flatKeypoints = []
          body.pose.keypoints.forEach((keypoint) => {
            flatKeypoints.push(keypoint.x)
            flatKeypoints.push(keypoint.y)
          })

          Array.prototype.push.apply(data, flatKeypoints)
          break
      }
    })
    gestureRecorder.samples.push(data)

    // Update message
    let message = config.gestureRecorder.recordingMessage.replace(
      /\{numSamples\}/g,
      gestureRecorder.samples.length
    )
    gestureRecorder.$message.innerHTML = message

    // Finish recording after reaching target samples
    if (gestureRecorder.samples.length >= gestureRecorder.opts.numSamples) {
      Handsfree.disable('gestureRecorder.collectSample')
      emit('handsfreeGestureRecordingEnded')
    }
  }
})
