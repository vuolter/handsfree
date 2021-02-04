/**
 * The Gesture Creator
 * @see /create-gesture/
 */
let countdown = 3
import {drawConnectors, drawLandmarks} from '../.vuepress/public/handsfreejs/@mediapipe/drawing_utils.js'
const HAND_CONNECTIONS = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]]

export default {
  filters: {
    prettyPrintJSON (obj) {return `handsfree.useGesture(${JSON.stringify(obj, null, 2)})`}
  },
  
  data () {
    // Load last created gesture
    let lastGesture = localStorage.lastCreatedGesture || {}
    if (typeof lastGesture === 'string') {
      try {
        lastGesture = JSON.parse(lastGesture)
      } catch (err) {
        console.error(err)
        lastGesture = {}
      }
    }

    const gesture = Object.assign({}, lastGesture)
    delete gesture.recordedShapes
    delete gesture.fingerWeights

    return {
      // Contains all the captured shapes during recording
      recordedShapes: lastGesture.recordedShapes || [],

      // this is the object that is represented in the textarea
      gesture: gesture.name ? gesture : {
        name: 'untitled',
        algorithm: 'fingerpose',
        models: 'hands',
        description: []
      },

      fingerWeights: lastGesture.fingerWeights || {
        Thumb: null,
        Index: null,
        Middle: null,
        Ring: null,
        Pinky: null
      },

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
   * Creates a plugins
   */
  mounted () {
    // Recursive because of the way we're loading handsfree into the docs
    const checkHandsfree = () => {
      if (this.$root.handsfree) {
        // @fixme turn this into a vuex listener/dispatch
        this.$nextTick(() => {
          this.$root.handsfree.use('displayShape', this.displayShape)
          this.$root.handsfree.use('recordShapes', {
            enabled: false,
            onFrame: this.$root.handsfree.throttle(this.recordShapes, 100),
            onEnable: this.resetShapes,
            onDisable: this.stopRecordingShapes
          })
          this.$root.handsfree.use('displayCurrentGesture', this.displayCurrentGesture)

          if (this.recordedShapes.length) {
            this.renderRecording()
          }
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
      this.gesture.models = model

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

        recording.removed && $canvas.classList.add('removed')
        
        $wrap.appendChild($canvas)
        this.$refs.recordingCanvasContainer.appendChild($wrap)

        this.renderHand($canvas, recording)
      })

      this.generateGestureDescription()
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
     * - Adds the gesture to handsfree.gesture.lastCreated
     */
    generateGestureDescription () {
      const json = []
      
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
      
      // Loop through each frame to generate a description object
      this.recordedShapes.forEach(shape => {
        if (shape.removed) return
        const gesture = shape.gesture.find(gesture => !!gesture)

        if (gesture?.pose) {
          // loop through each finger and tally curls and directions
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

      // Create the final description
      Object.keys(description).forEach(fingerKey => {
        const finger = description[fingerKey]

        // Get the highest curl value
        const curls = Object.keys(finger.curl).map(key => {
          return finger.curl[key]
        })
        const maxCurl = curls[curls.indexOf(Math.max(...curls))]
        
        // Add curls
        Object.keys(finger.curl).forEach(curlKey => {
          json.push([
            'addCurl',
            fingerKey,
            curlKey.split(' ').join(''),
            finger.curl[curlKey] / maxCurl
          ])
        })

        // Get the highest direction value
        const directions = Object.keys(finger.direction).map(key => {
          return finger.direction[key]
        })
        const maxDirection = directions[directions.indexOf(Math.max(...directions))]
        
        // Add direction
        Object.keys(finger.direction).forEach(directionKey => {
          json.push([
            'addDirection',
            fingerKey,
            directionKey.split(' ').join(''),
            finger.direction[directionKey] / maxDirection
          ])
        })
      })

      // Add finger weights
      Object.keys(this.fingerWeights).forEach(key => {
        if (this.fingerWeights[key]) {
          json.push(['setWeight', key, 2])
        }
      })
      
      // Parse the description into a fingerpose object
      this.gesture.description = json
      this.saveGesture()      

      this.$root.handsfree.useGesture(this.gesture)
    },

    /**
     * Displays the currently active gesture
     */
    displayCurrentGesture (data) {
      if (data.hands?.gesture?.[0]) {
        this.$refs.currentGesture.innerText = data.hands.gesture[0].name
      }
    },

    updateFingerWeight () {
      this.generateGestureDescription()
    },
    
    /**
     * Persist the gesture name to localStroage
     */
    onGestureNameUpdate () {
      if (this.gesture.name.indexOf(' ') >= 0) {
        this.gesture.name = this.gesture.name.split(' ').join('')
      }

      if (!this.gesture.name) {
        this.gesture.name = 'untitled'
      }
      
      this.saveGesture()
    },

    /**
     * Saves the gesture to localStorage
     */
    saveGesture () {
      localStorage.lastCreatedGesture = JSON.stringify({
        ...this.gesture,
        recordedShapes: this.recordedShapes,
        fingerWeights: this.fingerWeights
      })
    }
  }
}