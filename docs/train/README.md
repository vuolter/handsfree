---
sidebarDepth: 2
---
# 🤖 Train Gesture

<div class="row align-top">
  <div class="col-6">
    <Window title="Test available gestures">
      <section>
        <div>
          <span class="gesture-emoji" gesture="victory">✌</span>
          <span class="gesture-emoji" gesture="thumbDown">👎</span>
        </div>
      </section>
    </Window>
  </div>
  <div class="col-6">
    <Window title="Training a custom gesture">
      <section>
        <select class="full-width">
          <option value="handpose">Handpose (3D)</option>
          <option value="hands">Hands (2D)</option>
        </select>
        <p>Select a model above and then click the button below to begin training a custom gesture. A JSON object will then be generated to describe your gesture which you can use with:</p>
        <div class="language-js extra-class"><pre class="language-js"><code>handsfree<span class="token punctuation">.</span><span class="token function">useGesture</span><span class="token punctuation">(</span>
  gestureName<span class="token punctuation">,</span>
  gestureJSON<span class="token punctuation">,</span>
  config
<span class="token punctuation">)</span>
</code></pre></div>
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-hands" text-off="Train a gesture" text-on="Stop Hands Model" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-hands handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-hands handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try basic Hands demo</button>
        </div>
      </section>
    </Window>
  </div>
</div>


<!-- Code -->
<script>
export default {
  data () {
    return {
      demoOpts: {
        autostart: true,

        weboji: false,
        hands: false,
        facemesh: false,
        pose: false,
        holistic: false,
        handpose: true,

        gesture: {
          victory: true,
          thumbDown: true
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
          let lastGesture = ''
          
          this.$root.handsfree.use('gestureEmojiDetector', ({handpose}) => {
            if (!handpose) return

            // Toggle the gesture emoji
            if (handpose.gesture && handpose.gesture.name !== lastGesture) {
              let $el = document.querySelector(`.gesture-emoji[gesture="${lastGesture}"]`)
              if ($el) $el.classList.remove('active')
              $el = document.querySelector(`.gesture-emoji[gesture="${handpose.gesture.name}"]`)
              if ($el) $el.classList.add('active')
              
              lastGesture = handpose.gesture.name
            }

            // Disable the gesture emoji if no gestures
            if (!handpose.gesture?.name) {
              let $el = document.querySelector(`.gesture-emoji[gesture="${lastGesture}"]`)
              if ($el) $el.classList.remove('active')

              lastGesture = null
            }
          })
        })
      } else {
        setTimeout(checkHandsfree, 5)
      }
    }

    checkHandsfree()
  },

  destroyed () {
    console.log('test')
    this.$root.handsfree.plugin.gestureEmojiDetector.disable()
  },

  methods: {
    /**
     * Start the page with our preset options
     */
    startDemo () {
      this.$root.handsfree.update(this.demoOpts)
    }
  }
}
</script>

<style lang="stylus">
.gesture-emoji
  font-size 32px
  display inline-block
  margin-right 10px
  opacity 0.2

  &.active
    opacity 1
</style>