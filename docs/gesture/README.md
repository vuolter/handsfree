# 🖖 Gestures

::: warning 🚧 Work in progress
The gesture API is still being experimental. However a migration tool will be provided to update gestures between most versions.
:::

<div class="row align-top">
  <div class="col-6"></div>
  <div class="col-6">
    <Window title="Demo: Try Hand Gestures">
      <p>
        <span class="gesture-emoji" gesture="callMe">🤙</span>
        <span class="gesture-emoji" gesture="fist">👊</span>
        <span class="gesture-emoji" gesture="horns">🤘</span>
        <span class="gesture-emoji" gesture="love">🤟</span>
        <span class="gesture-emoji" gesture="ok">👌</span>
        <span class="gesture-emoji" gesture="pointUp">👆</span>
        <span class="gesture-emoji" gesture="pointRight">👉</span>
        <span class="gesture-emoji" gesture="pointDown">👇</span>
        <span class="gesture-emoji" gesture="pointDown">👈</span>
        <span class="gesture-emoji" gesture="spock">🖖</span>
        <span class="gesture-emoji" gesture="stop">🖐</span>
        <span class="gesture-emoji" gesture="thumbDown">👎</span>
        <span class="gesture-emoji" gesture="thumbUp">👍</span>
        <span class="gesture-emoji" gesture="victory">✌</span>
      </p>
      <div>
        <HandsfreeToggle class="full-width handsfree-hide-when-started-without-hands" text-off="Try Gesture Demo" text-on="Stop Hands Model" :opts="demoOpts" />
        <button class="handsfree-show-when-started-without-hands handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
        <button class="handsfree-show-when-started-without-hands handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try Gesture Demo</button>
      </div>      
    </Window>
  </div>
</div>


<script>
export default {
  data: () => ({
    demoOpts: {
      autostart: true,
      weboji: false,
      hands: true,
      handpose: false,
      facemesh: false,
      pose: false,
    }
  }),

  mounted () {
    /**
     * Plugin to detect and toggle models
     */
    let lastGestureHandpose = null
    let lastGestureHands = [null, null, null, null]
    let currentShapeHands = ''

    // Recursive because of the way we're loading handsfree into the docs
    const checkHandsfree = () => {
      if (this.$root.handsfree) {
        this.$root.handsfree.enableGestures('core')
        
        this.$root.handsfree.use('gestureEmojiDetector', ({hands, handpose}) => {
          if (hands?.gesture) {
            hands.gesture.forEach((gesture, n) => {
              if (gesture && gesture.name !== lastGestureHands[n]) {
                let $el = document.querySelector(`.gesture-emoji[gesture="${lastGestureHands[n]}"]`)
                if ($el) $el.classList.remove('active')
                $el = document.querySelector(`.gesture-emoji[gesture="${gesture.name}"]`)
                if ($el) $el.classList.add('active')
                
                lastGestureHands[n] = gesture.name
              }
    
              // Disable the gesture emoji if no gestures
              if (lastGestureHands[n] && !gesture?.name) {
                let $el = document.querySelector(`.gesture-emoji[gesture="${lastGestureHands[n]}"]`)
                if ($el) $el.classList.remove('active')
    
                lastGestureHands[n] = null
              }
            })
          }
    
          // Toggle the gesture emoji
          if (handpose?.gesture && handpose.gesture.name !== lastGestureHandpose) {
            let $el = document.querySelector(`.gesture-emoji[gesture="${lastGestureHandpose}"]`)
            if ($el) $el.classList.remove('active')
            $el = document.querySelector(`.gesture-emoji[gesture="${handpose.gesture.name}"]`)
            if ($el) $el.classList.add('active')
            
            lastGestureHandpose = handpose.gesture.name
          }
    
          // Disable the gesture emoji if no gestures
          if (lastGestureHandpose && !handpose?.gesture?.name) {
            let $el = document.querySelector(`.gesture-emoji[gesture="${lastGestureHandpose}"]`)
            if ($el) $el.classList.remove('active')
    
            lastGestureHandpose = null
          }
        })
      } else {
        setTimeout(checkHandsfree, 5)
      }
    }

    checkHandsfree()
  },

  methods: {
    startDemo () {
      this.$root.handsfree.update(this.demoOpts)
    }
  }
}
</script>

<!-- Demo styles -->
<style lang="stylus">
  /* Emojis */
  .gesture-emoji
    font-size 28px
    display inline-block
    margin-right 10px
    margin-bottom 10px
    opacity 0.2

  .gesture-emoji.active
    opacity 1
</style>