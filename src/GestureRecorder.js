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
Handsfree.prototype.recordGesture = function(opts, onReady) {
  // Setup opts
  opts = merge(
    {
      gestureSet: '',
      delaySeconds: 3,
      numSamples: 100,
      labels: ['base'],
      models: ['weboji'],
      storeInIndexedDB: false,
      exportToJSON: false,
      onReady
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
  this.gestureRecorder.curLabelIndex = 0
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
    this.createGestureModel()
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
      gestureRecorder.config.models.includes('weboji') &&
      !handsfree.weboji.translation.length
    )
      return

    // Loop through each model and store data in a flattened array
    gestureRecorder.config.models.forEach((model) => {
      switch (model) {
        case 'weboji':
          Array.prototype.push.apply(
            data,
            handsfree.weboji.translation,
            handsfree.weboji.rotation,
            handsfree.weboji.morphs
          )
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
Handsfree.prototype.createGestureModel = function() {
  const onML5Ready = () => {
    // Update message
    let message = this.config.gestureRecorder.trainingMessage.replace(
      /\{gestureSetName\}/g,
      this.gestureRecorder.config.gestureSet
    )
    this.gestureRecorder.$message.innerHTML = message

    // Create brain
    this.dependencies.tf = true
    const brain = (this.gestureRecorder.brain = ml5.neuralNetwork({
      inputs: this.gestureRecorder.samples[0].length,
      outputs: this.gestureRecorder.config.labels.length,
      task: 'classification',
      debug: true
    }))

    // Add data
    this.gestureRecorder.samples.forEach((samples, i) => {
      let data = []
      samples.forEach((sample) => {
        data.push(...sample)
      })
      brain.addData(data, [this.gestureRecorder.config.labels[i]])
    })

    // Train
    brain.normalizeData()
    this.gestureRecorder.brain.vis.tfvis.visor().open &&
      this.gestureRecorder.brain.vis.tfvis.visor().open()
    brain.train({ epochs: 50 }, () => {
      this.finishedTrainingGestures()
    })
  }

  // Load ML5 if it hasn't been loaded yet
  if (this.dependencies.tf) {
    onML5Ready()
  } else {
    this.loadAndWait([Handsfree.libSrc + 'models/ml5@0.4.3.js'], () => {
      onML5Ready()
    })
  }
}

/**
 * Called once training is complete
 */
Handsfree.prototype.finishedTrainingGestures = function() {
  const model = this.gestureRecorder.brain.model
  this.gestureSets[this.gestureRecorder.config.gestureSet] = model

  this.gestureRecorder.brain.vis.tfvis.visor().close()

  // Persist models
  if (this.gestureRecorder.config.storeInIndexedDB)
    model.save('indexeddb://' + this.gestureRecorder.config.gestureSet)
  if (this.gestureRecorder.config.exportToJSON)
    model.save('downloads://' + this.gestureRecorder.config.gestureSet)

  this.gestureRecorder.config.onReady &&
    this.gestureRecorder.config.onReady(model)

  document.body.classList.remove('handsfree-recording-gesture')
  this.gestureRecorder.wrap.classList.remove('handsfree-visible')
}

/**
 * Loads a gestureSet model
 *
 * @param {Object} gestureSets A list of {gesturSetName: URL}
 */
Handsfree.prototype.loadGestures = function(gestureSets) {
  // Load TensorFlow
  const onTFReady = () => {
    let gesturesToLoad = Object.keys(gestureSets).length
    this.missingGestureSets = []
    document.body.classList.add('handsfree-loading-gestures')

    Object.keys(gestureSets).forEach(async (gestureSet) => {
      try {
        this.gestureSets[gestureSet] = await tf.loadLayersModel(
          gestureSets[gestureSet]
        )
      } catch (e) {
        this.missingGestureSets.push(gestureSet)
      }

      if (--gesturesToLoad <= 0) {
        document.body.classList.remove('handsfree-loading-gestures')
        this.emit('handsfreeGesturesLoaded')
      }
    })
  }

  // Load TensorFlow if it hasn't been loaded yet
  if (this.gestureRecorder.loadedTF) {
    onTFReady()
  } else {
    this.loadAndWait([Handsfree.libSrc + 'models/tfjs@1.2.js'], () => {
      onTFReady()
    })
  }
}
