/**
 * Recursively collect gesture samples
 */
window.addEventListener('DOMContentLoaded', () => {
  window.Handsfree.use('gestureRecorder.collectSample', {
    enabled: false,

    onFrame(handsfree) {
      let data = []
      let gestureRecorder = handsfree.gestureRecorder

      // Exit if models aren't active yet
      if (
        gestureRecorder.recordConfig.models.includes('weboji') &&
        !handsfree.weboji.translation.length
      )
        return

      // Loop through each model and store data in a flattened array
      gestureRecorder.recordConfig.models.forEach((model) => {
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
      let message = gestureRecorder.config.recordingMessage.replace(
        /\{numSamples\}/g,
        gestureRecorder.samples[gestureRecorder.curLabelIndex].length
      )
      message = message.replace(
        /\{label\}/g,
        gestureRecorder.recordConfig.labels[gestureRecorder.curLabelIndex]
      )
      gestureRecorder.overlay.$message.innerHTML = message

      // Finish recording or countdown for next label
      if (
        gestureRecorder.samples[gestureRecorder.curLabelIndex].length >=
        gestureRecorder.recordConfig.numSamples
      ) {
        gestureRecorder.curLabelIndex++
        Handsfree.disable('gestureRecorder.collectSample')

        if (
          gestureRecorder.curLabelIndex <
          gestureRecorder.recordConfig.labels.length
        ) {
          gestureRecorder.numSecondsWaited = 0
          gestureRecorder.countdown(() => {
            Handsfree.enable('gestureRecorder.collectSample')
          })
        } else {
          handsfree.emit('handsfreeGestureRecordingEnded')
        }
      }
    }
  })
})
