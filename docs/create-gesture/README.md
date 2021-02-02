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
          <select id="gesture-model-selector" class="full-width" @change="updateModel">
            <option value="hands">🖐🖐 MediaPipe Hands (2D)</option>
            <option value="handpose">🖐 TensorFLow Handpose (3D)</option>
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
        <ul ref="currentShapeBox" class="mt-0 mb-0 tree-view">
        </ul>
      </fieldset>
    </div>
  </div>
</Window>








<!-- Code -->
<script>
export default {
  data () {
    return {
      demoOpts: {
        hands: {
          autostart: true,
          weboji: false,
          hands: true,
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
          let lastGestureHandpose = null
          let lastGestureHands = [null, null, null, null]
          let currentShapeHands = ''
          
          this.$root.handsfree.use('displayShape', this.displayShape)
        })
      } else {
        setTimeout(checkHandsfree, 5)
      }
    }

    checkHandsfree()
  },

  destroyed () {
    this.$root.handsfree.plugin.gestureEmojiDetector.disable()
  },

  methods: {
    /**
     * Start the page with our preset options
     * @param {string} model The name of the model to switch to
     */
    startDemo (model) {
      this.$root.handsfree.update(this.demoOpts[model])
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
     * Shows what the current model shape is
     */
    displayShape (data) {
      // MediaPipe Hands
      if (data.hands && data.hands.gesture) {
        let shape = ''
        
        data.hands.gesture.forEach((gesture, hand) => {
          if (gesture) {
            shape += `<li>🖐 Hand # ${hand}</li>`
            shape += `<li>Thumb | ${gesture.pose[0][1]} | ${gesture.pose[0][2]}</li>`
            shape += `<li>Index | ${gesture.pose[1][1]} | ${gesture.pose[1][2]}</li>`
            shape += `<li>Middle | ${gesture.pose[2][1]} | ${gesture.pose[2][2]}</li>`
            shape += `<li>Ring | ${gesture.pose[3][1]} | ${gesture.pose[3][2]}</li>`
            shape += `<li>Pinky | ${gesture.pose[4][1]} | ${gesture.pose[4][2]}</li>`
            shape += `<li>--------</li>`
            shape += '<li></li>'
          }
        })
        this.$refs.currentShapeBox.innerHTML = shape
      }

      // TensorFlow Handpose
      if (data.handpose) {

      }
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
</style>