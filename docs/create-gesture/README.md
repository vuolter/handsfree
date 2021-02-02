---
sidebarDepth: 2
---
# 🖖 Create Gesture

<div class="row align-top">
  <div class="col-6"><div></div></div>
  <div class="col-6">
    <Window title="Step 1: Choose a model">
      <section>
        <p>To begin, select a model below:</p>
        <p>
          <select ref="modelSelector" class="full-width" @change="updateModel">
            <option value="hands">🖐 MediaPipe Hands</option>
          </select>
        </p>
        <div class="model-button-container model-button-container-hands">
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-hands" text-off="Start Hands" text-on="Stop Hands Model" :opts="demoOpts.hands" />
          <button class="handsfree-show-when-started-without-hands handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-hands handsfree-hide-when-loading" @click="startDemo('hands')"><Fa-Video /> Start Hands</button>
        </div>
        <div class="model-button-container model-button-container-handpose hidden">
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-handpose" text-off="Start Handpose" text-on="Stop Handpose Model" :opts="demoOpts.handpose" />
          <button class="handsfree-show-when-started-without-handpose handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-handpose handsfree-hide-when-loading" @click="startDemo('handpose')"><Fa-Video /> Start Handpose</button>
        </div>
      </section>
    </Window>
  </div>
</div>

<Window title="Step 2: Collect samples">
  <div class="row align-top">
    <div class="col-6">
      <fieldset>
        <legend>Current Shape</legend>
        <ul ref="currentShapeBox" class="mt-0 mb-0 tree-view" style="min-height: 430px">
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
        </ul>
      </fieldset>
    </div>
    <div class="col-6">
      <ol>
        <li>Select the number of hands required for this gesture to work</li>
        <li>Click the button below to record landmarks for 3 seconds</li>
        <li>Move your hands around slightly to capture subtle variations</li>
      </ol>
      <p>
        <fieldset>
          <legend>Number of hands</legend>
          <div class="field-row">
            <input id="radio-1-hands" type="radio" name="radio-number-hands" checked>
            <label for="radio-1-hands">1 Hand</label>
          </div>
          <div class="field-row">
            <input id="radio-2-hands" disabled type="radio" name="radio-number-hands">
            <label for="radio-2-hands">2 Hands</label>
          </div>
        </fieldset>
      </p>
      <div>
        <button ref="recordLandmarks" class="handsfree-hide-when-loading full-width" @click="startRecordingShapes">Record landmarks</button>
        <button disabled class="handsfree-show-when-loading"><Fa-Spinner spin /> Loading...</button>
      </div>
    </div>
  </div>
</Window>


<Window title="Step 3: Clean Data">
  <p>Click on any of the frames below that don't look right to remove them. The final gesture description does not use a neural network, so the number of samples isn't as important as the quality!</p>
  <div ref="recordingCanvasContainer" class="row align-top">
  </div>
</Window>

<Window title="Step 4: Gesture Description">
  <div class="row align-top">
    <div class="col-6">
      <fieldset>
        <legend>Gesture Description</legend>
        <textarea ref="gestureDescriptionJSON" style="width: 100%" rows=20></textarea>
      </fieldset>
    </div>
    <div class="col-6"></div>
  </div>
</Window>




<!-- Code -->
<script>
let countdown = 3

export default {
  data () {
    return {
      recordedShapes: [],

      demoOpts: {
        hands: {
          autostart: true,
          weboji: false,
          hands: {
            enabled: true,
            maxNumHands: 1
          },
          handpose: false,
          facemesh: false,
          pose: false,
          holistic: false,
        },
        handpose: {
          autostart: true,
          weboji: false,
          hands: false,
          handpose: true,
          facemesh: false,
          pose: false,
          holistic: false,
        }
      }
    }
  },

  /**
   * Creates a plugin that highlights emojis
   */
  mounted () {
    // Recursive because of the way we're loading handsfree into the docs
    const checkHandsfree = () => {
      if (this.$root.handsfree) {
        this.$nextTick(() => {
          this.$root.handsfree.use('displayShape', this.displayShape)

          this.$root.handsfree.use('recordShapes', {
            enabled: false,
            onFrame: this.$root.handsfree.throttle(this.recordShapes, 100),
            onEnable: this.resetShapes,
            onDisable: this.stopRecordingShapes
          })
        })
      } else {
        setTimeout(checkHandsfree, 5)
      }
    }

    checkHandsfree()
  },

  destroyed () {
    this.$root.handsfree.plugin.displayShape.disable()
    this.$root.handsfree.plugin.recordShapes.disable()
  },

  methods: {
    /**
     * Start the page with our preset options
     * @param {string} model The name of the model to switch to
     * @param {Function} callback 
     */
    startDemo (model, callback) {
      this.$root.handsfree.update(this.demoOpts[model], callback)
    },

    /**
     * Change the model and update buttons
     */
    updateModel (ev) {
      const model = ev.target.value

      document.querySelectorAll('.model-button-container').forEach($el => {
        if ($el.classList.contains(`model-button-container-${model}`)) {
          $el.classList.remove('hidden')
        } else {
          $el.classList.add('hidden')
        }
      })
    },

    /**
     * Clears out the recorded shapes
     */
    resetShapes () {
      this.recordedShapes = []
    },

    /**
     * Shows what the current model shape is
     */
    displayShape (data) {
      // MediaPipe Hands
      if (data.hands && data.hands.gesture) {
        let shape = ''
        const gestures = data.hands.gesture
        const gesture = gestures.find(gesture => !!gesture)
        
        if (gesture) {
          shape += `<li>Thumb | ${gesture.pose[0][1]} | ${gesture.pose[0][2]}</li>`
          shape += `<li>Index | ${gesture.pose[1][1]} | ${gesture.pose[1][2]}</li>`
          shape += `<li>Middle | ${gesture.pose[2][1]} | ${gesture.pose[2][2]}</li>`
          shape += `<li>Ring | ${gesture.pose[3][1]} | ${gesture.pose[3][2]}</li>`
          shape += `<li>Pinky | ${gesture.pose[4][1]} | ${gesture.pose[4][2]}</li>`
          shape += `<li>--------</li>`
          shape += '<li></li>'
        } else {
          shape += '<li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li>'
        }

        this.$refs.currentShapeBox.innerHTML = shape
      }

      // TensorFlow Handpose
      // @todo
      // if (data.handpose) {}
    },

    /**
     * Records the gesture shapes over 3 seconds
     */
    startRecordingShapes () {
      if (!this.$root.handsfree.isLooping) {
        this.startDemo(this.$refs.modelSelector.value, this.startRecordingShapes)
      } else {
        countdown = 0
        this.$refs.recordLandmarks.disabled = true
        this.countdown()
      }
    },

    /**
     * Handle the countdown
     */
    countdown () {
      if (--countdown > 0) {
        this.$refs.recordLandmarks.innerText = `${countdown}...`
        setTimeout(() => {
          this.countdown()
        }, 1000)
      } else {
        this.$root.handsfree.plugin.recordShapes.enable()
        this.$refs.recordLandmarks.innerText = 'Recording...'
      }
    },

    /**
     * Record landmarks and the shape
     */
    recordShapes (data) {
      if (data.hands) {
        this.recordedShapes.push({
          gesture: data.hands.gesture,
          landmarks: data.hands.landmarks
        })
      }
      // @todo
      // if (data.handpose) {}

      if (this.recordedShapes.length > 29) {
        this.$root.handsfree.plugin.recordShapes.disable()
      }
    },

    /**
     * Stop recording landmarks/shapes and re-enable button
     */
    stopRecordingShapes () {
      this.$refs.recordLandmarks.disabled = false
      this.$refs.recordLandmarks.innerText = 'Record Landmarks'
      this.renderRecording()
    },

    /**
     * Displays a grid of all the shapes
     */
    renderRecording () {
      this.$refs.recordingCanvasContainer.innerHTML = ''
      
      this.recordedShapes.forEach((recording, frame) => {
        const $wrap = document.createElement('DIV')
        $wrap.classList.add('landmark-canvas-wrap', 'col-5')

        const $canvas = document.createElement('CANVAS')
        $canvas.classList.add('landmark-canvas')
        
        $canvas.width = this.$root.handsfree.debug.$canvas.hands.width
        $canvas.height = this.$root.handsfree.debug.$canvas.hands.height
        $canvas.addEventListener('click', () => this.toggleFrame($canvas, frame))

        $wrap.appendChild($canvas)
        this.$refs.recordingCanvasContainer.appendChild($wrap)

        this.renderHand($canvas, recording)
        this.generateGestureDescription()
      })
    },

    /**
     * Renders the landmark into each canvas
     */
    renderHand ($canvas, frame) {
      const context = $canvas.getContext('2d')
      
      // Draw skeletons
      frame.landmarks.forEach(landmarks => {
        drawConnectors(context, landmarks, HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 5})
        drawLandmarks(context, landmarks, {color: '#FF0000', lineWidth: 2})
      })
    },

    /**
     * Select a frame on/off for compiling
     * - Regenerates gesture description each time
     */
    toggleFrame ($canvas, frame) {
      if ($canvas.classList.contains('removed')) {
        $canvas.classList.remove('removed')
        this.recordedShapes[frame].removed = false
      } else {
        $canvas.classList.add('removed')
        this.recordedShapes[frame].removed = true
      }

      this.generateGestureDescription()
    },

    /**
     * Generates the gesture description as JSON
     */
    generateGestureDescription () {
      const description = {
        Thumb: {
          curl: {},
          direction: {}
        },
        Index: {
          curl: {},
          direction: {}
        },
        Middle: {
          curl: {},
          direction: {}
        },
        Ring: {
          curl: {},
          direction: {}
        },
        Pinky: {
          curl: {},
          direction: {}
        },
      }
      
      const numHands = document.querySelector('[name="radio-number-hands"]:checked').value

      // Loop through each frame
      this.recordedShapes.forEach(shape => {
        if (shape.removed) return
        const gesture = shape.gesture.find(gesture => !!gesture)

        if (gesture.pose) {
          const landmarks = shape.landmarks.find(landmarks => !!landmarks)

          // loop through each finger
          gesture.pose.forEach(finger => {
            // Tally same curls
            if (!description[finger[0]].curl[finger[1]]) {
              description[finger[0]].curl[finger[1]] = 1
            } else {
              description[finger[0]].curl[finger[1]]++
            }
  
            // Tally same directions
            if (!description[finger[0]].direction[finger[2]]) {
              description[finger[0]].direction[finger[2]] = 1
            } else {
              description[finger[0]].direction[finger[2]]++
            }
          })
        }
      })

      this.$refs.gestureDescriptionJSON.value = JSON.stringify(description, null, 2)
    }
  }
}
</script>

<style lang="stylus">
.gesture-emoji
  font-size 30px
  display inline-block
  margin-right 10px
  margin-bottom 10px
  opacity 0.2

  &.active
    opacity 1

.landmark-canvas-wrap
  padding 3px
  box-sizing border-box
  
.landmark-canvas
  background #222
  width 100%
  transform scale(-1, 1)

  &:hover
    opacity 0.5
    background #666
  
  &.removed
    opacity 0.35
    background #999
</style>