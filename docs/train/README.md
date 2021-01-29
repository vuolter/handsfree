---
sidebarDepth: 2
---
# 🤖 Train Gesture

<div class="row align-top">
  <div class="col-6">
    <p><img alt="A 3D model of a hand projected above a person's hand" src="https://media0.giphy.com/media/y4S6WFaCUWvqHL7UA8/giphy.gif" /></p>
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
  callbackToRunOnDetection
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
        handpose: true
      }
    }
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