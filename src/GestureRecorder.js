import { merge } from 'lodash'

const Handsfree = window.Handsfree

/**
 * Creates a calibrator panel
 */
// Handsfree.prototype.createGestureRecorderOverlay = function() {
//   if (!handsfree.config.$wrap) {
//     // Wrap
//     handsfree.overlay.$wrap = document.createElement('DIV')
//     handsfree.overlay.$wrap.classList.add('handsfree-gesture-recorder-wrap')

//     // Countdown Message
//     handsfree.overlay.$message = document.createElement('h1')

//     document.body.appendChild(handsfree.overlay.$wrap)
//     handsfree.overlay.$wrap.appendChild(handsfree.overlay.$message)
//   }
// }

/**
 * Start calibrating
 */
// Handsfree.prototype.recordGesture = function(opts, onReady) {
//   // Setup opts
//   opts = merge(
//     {
//       gestureSet: '',
//       download: false,
//       delaySeconds: 3,
//       numSamples: 100,
//       labels: ['base'],
//       models: ['weboji'],
//       onReady
//     },
//     opts
//   )

//   // Make sure selected models are running
//   if (typeof opts.models === 'string') opts.models = [opts.models]
//   opts.models.forEach((model) => {
//     handsfree.model[model].enabled = true
//   })
//   this.recordConfig = opts
//   this.numSecondsWaited = 0
//   handsfree.reload()
//   handsfree.start()

//   // Enable gestureRecorder plugin
//   this.curLabelIndex = 0
//   this.countdown(() => {
//     this.samples = []
//     this.curLabelIndex = 0
//     this.recordConfig.labels.forEach(() => {
//       this.samples.push([])
//     })

//     Handsfree.enable('gestureRecorder.collectSample')
//   })

//   // End gesture recording
//   handsfree.on('handsfreeGestureRecordingEnded', () => {
//     Handsfree.disable('gestureRecorder.collectSample')
//     handsfree.createGestureModel()
//   })
// }

/**
 * Countdown to recording a gesture
 * @param {Function} cb The callback to call once we've counted down
 */
// Handsfree.prototype.gestureRecordCountdown = function(cb) {
//   // Show countdown
//   handsfree.overlay.$wrap.classList.add('handsfree-visible')
//   document.body.classList.add('handsfree-recording-gesture')

//   // Update message
//   let secondsLeft = this.recordConfig.delaySeconds - this.numSecondsWaited

//   secondsLeft = secondsLeft < 0 ? 0 : secondsLeft
//   let message = handsfree.config.countdownMessage.replace(
//     /\{countdown\}/g,
//     secondsLeft
//   )
//   message = message.replace(
//     /\{label\}/g,
//     this.recordConfig.labels[this.curLabelIndex]
//   )
//   handsfree.overlay.$message.innerHTML = message

//   // Zero data and start collecting samples
//   if (this.numSecondsWaited >= this.recordConfig.delaySeconds) {
//     cb()
//   } else {
//     setTimeout(() => {
//       ++this.numSecondsWaited
//       this.countdown(cb)
//     }, 1000)
//   }
// }

/**
 * Create a model
 */
Handsfree.prototype.createGestureModel = function() {
  const onML5Ready = () => {
    // Update message
    let message = handsfree.config.trainingMessage.replace(
      /\{gestureSetName\}/g,
      this.recordConfig.gestureSet
    )
    handsfree.overlay.$message.innerHTML = message

    // Create brain
    const brain = (handsfree.gestureRecorder.brain = ml5.neuralNetwork({
      inputs: this.samples[0].length,
      outputs: this.recordConfig.labels.length,
      task: 'classification',
      debug: true
    }))

    // Add data
    this.samples.forEach((samples, i) => {
      let data = []
      samples.forEach((sample) => {
        data.push(...sample)
      })
      brain.addData(data, [this.recordConfig.labels[i]])
    })

    // Train
    brain.normalizeData()
    handsfree.gestureRecorder.brain.vis.tfvis.visor().open &&
      handsfree.gestureRecorder.brain.vis.tfvis.visor().open()
    brain.train({ epochs: 50 }, () => {
      handsfree.finishedTrainingGestures()
    })
  }

  // Load ML5 if it hasn't been loaded yet
  if (handsfree.dependencies.ml5) {
    onML5Ready()
  } else {
    handsfree.loadAndWait([Handsfree.libSrc + 'models/ml5@0.4.3.js'], () => {
      handsfree.dependencies.ml5 = true
      onML5Ready()
    })
  }
}

/**
 * Called once training is complete
 */
Handsfree.prototype.finishedTrainingGestures = function() {
  const model = handsfree.gestureRecorder.brain.model
  handsfree.gestureSets[this.recordConfig.gestureSet] = model

  handsfree.gestureRecorder.brain.vis.tfvis.visor().close()

  // Persist models
  if (this.recordConfig.download) {
    handsfree.gestureRecorder.brain.save(() => {
      this.recordConfig.onReady && this.recordConfig.onReady(model)

      document.body.classList.remove('handsfree-recording-gesture')
      handsfree.overlay.$wrap.classList.remove('handsfree-visible')
    }, this.recordConfig.gestureSet.toString())
  } else {
    document.body.classList.remove('handsfree-recording-gesture')
    handsfree.overlay.$wrap.classList.remove('handsfree-visible')
  }
}

/**
 * Loads a gestureSet model
 *
 * @param {Object} gestureSets A list of {gesturSetName: URL}
 */
Handsfree.prototype.loadGestures = function(gestureSets) {
  // Load TensorFlow
  const onML5Ready = () => {
    let gesturesToLoad = Object.keys(gestureSets).length
    handsfree.missingGestureSets = []
    document.body.classList.add('handsfree-loading-gestures')

    Object.keys(gestureSets).forEach(async (gestureSet) => {
      try {
        handsfree.gestureSets[gestureSet] = await ml5.tf.loadLayersModel(
          gestureSets[gestureSet]
        )
      } catch (e) {
        handsfree.missingGestureSets.push(gestureSet)
      }

      if (--gesturesToLoad <= 0) {
        document.body.classList.remove('handsfree-loading-gestures')
        handsfree.emit('handsfreeGesturesLoaded')
      }
    })
  }

  // Load TensorFlow if it hasn't been loaded yet
  if (handsfree.dependencies.ml5) {
    onML5Ready()
  } else {
    handsfree.loadAndWait([Handsfree.libSrc + 'models/ml5@0.4.3.js'], () => {
      handsfree.dependencies.ml5 = true
      onML5Ready()
    })
  }
}
