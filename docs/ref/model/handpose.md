---
sidebarDepth: 2
---
# Model: Handpose

<Window title="Overview and demo" :maximize="true">
  <div class="row">
    <div class="col-6">
      <p><img alt="A 3D model of a hand projected above a person's hand" src="https://media0.giphy.com/media/BPUnqDBgTav2yCfJjE/giphy.gif" /></p>
      <ul>
        <li><a href="https://github.com/tensorflow/tfjs-models/tree/master/handpose">Original TensorFlow Handpose model on GitHub</a></li>
        <li><a href="https://github.com/LingDong-/handpose-facemesh-demos">Debugger remixed from @LingDong-'s <code>handpose-facemesh-demos</code> on GitHub</a></li>
      </ul>
    </div>
    <div class="col-6">
      <Window>
        <p><code>handsfree = new Handsfree({hands: true})</code></p>
        <ul>
          <li>🖐 21 3D hand landmarks</li>
          <li>1️⃣ Only one hand at a time is supported</li>
          <li>🧰 Includes <a href="https://github.com/mrdoob/three.js/">THREE r124</a>, <a href="https://github.com/tensorflow/tfjs">TensorFlow 2.1</a></li>
        </ul>
        <p>This model includes a fingertip raycaster, center of palm object, and a minimal THREE environment which doubles a basic debugger for your project.</p>
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-handpose" text-off="Try Handpose" text-on="Stop Handpose" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-handpose handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-handpose handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try Handpose</button>
        </div>
      </Window>
    </div>
  </div>
</Window>

## Examples

<!-- 🙌 Hi! If you'd like to add your project, just uncomment below with and replace the ALL_CAPS to your info. Thanks so much 🙏 -->

<!--
<div class="row">
  <div class="col-6">
    <Window title="DEMO_TITLE" :maximize="true">
      <div>
        <a href="LINK_TO_DEMO"><img alt="SHORT_DESCRIPTION" src="LINK_TO_GIPHY_OR_OTHER_PUBLIC_GIF_URL"></a>
      </div>
      <p>A_BRIEF_DESCRIPTION</p>
      <div>
        <ul>
          <li><a href="LINK_TO_DEMO">Try it on Glitch</a></li>
          <li><a href="LINK_TO_SOURCE_OR_GITHUB">See the source</a></li>
        </ul>
      </div>
    </Window>
  </div>
</div>
-->

<div class="row">
  <div class="col-6">
    <Window title="Handsfree Jenga" :maximize="true">
      <div>
        <a href="https://handsfree-jenga.glitch.me/"><img alt="Person playing virtual Jenga by pinching and pulling on the blocks in the air with the guide of a Palm Pointer" src="https://media4.giphy.com/media/brC1Ow2v62htVmpfLh/giphy.gif"></a>
      </div>
      <p>This experiment led to the palmPointer plugin which was used here to guide the hand on the screen. The pinch gesture used here to "grab" the blocks was then generalized to all fingers, with 3+ events per finger.</p>
      <div>
        <ul>
          <li><a href="https://handsfree-jenga.glitch.me/">Try it on Glitch</a></li>
          <li><a href="https://glitch.com/edit/#!/handsfree-jenga?path=README.md">See the source</a></li>
        </ul>
      </div>
    </Window>
  </div>
  <div class="col-6">
    <Window title="Add your project">
      If you've made something with this model I'd love to showcase it here! DM me <a href="https://twitter.com/midiblocks">on Twitter</a>, <a class="https://github.com/midiblocks/handsfree/edit/master/docs/ref/model/handpose.md">make a pull request</a>, or <a href="https://discord.gg/q96txF5Wf5">find us on Discord</a>.  
    </Window>
  </div>
</div>

> - [TensorFlow Handpose Model](https://github.com/tensorflow/tfjs-models/tree/master/handpose)

## Usage

### With defaults

```js
handsfree = new Handsfree({handpose: true})
handsfree.start()
```

### With config

```js
handsfree = new Handsfree({
  handpose: {
    enabled: true,

    // The backend to use: 'webgl' or 'wasm'
    // 🚨 Currently only webgl is supported
    backend: 'webgl',

    // How many frames to go without running the bounding box detector. 
    // Set to a lower value if you want a safety net in case the mesh detector produces consistently flawed predictions.
    maxContinuousChecks: Infinity,

    // Threshold for discarding a prediction
    detectionConfidence: 0.8,

    // A float representing the threshold for deciding whether boxes overlap too much in non-maximum suppression. Must be between [0, 1]
    iouThreshold: 0.3,

    // A threshold for deciding when to remove boxes based on score in non-maximum suppression.
    scoreThreshold: 0.75
  }
})
```

## Data

![](/hand-indices.jpg)

```js
// Get the [x, y, z] of various landmarks
// Thumb tip
handsfree.hand.data.landmarks[4]
// Index fingertip
handsfree.hand.data.landmarks[8]

// How confident the model is that a hand is in view [0 - 1]
handsfree.hand.data.handInViewConfidence

// The top left and bottom right pixels containing the hand in the iframe
handsfree.hand.data.boundingBox = {
  topLeft: [x, y],
  bottomRight: [x, y]
}

// [x, y, z] of various hand landmarks
handsfree.hand.data.annotations: {
  thumb: [...[x, y, z]], // 4 landmarks
  indexFinger: [...[x, y, z]], // 4 landmarks
  middleFinger: [...[x, y, z]], // 4 landmarks
  ringFinger: [...[x, y, z]], // 4 landmarks
  finger: [...[x, y, z]], // 4 landmarks
  palmBase: [[x, y, z]], // 1 landmarks
}
```

## Three.js Properties

The following helper Three.js properties are also available:

```js
// A THREE Arrow object protuding from the index finger
// - You can use this to calculate pointing vectors
handsfree.hand.three.arrow
// The THREE camera
handsfree.hand.three.camera
// An additional mesh that is positioned at the center of the palm
// - This is where we raycast the Hand Pointer from
handsfree.hand.three.centerPalmObj
// The meshes representing each skeleton joint
// - You can tap into the rotation to calculate pointing vectors for each fingertip
handsfree.hand.three.meshes[]
// A reusable THREE raycaster
// @see https://threejs.org/docs/#api/en/core/Raycaster
handsfree.hand.three.raycaster
// The THREE scene and renderer used to hold the hand model
handsfree.hand.three.renderer
handsfree.hand.three.scene
// The screen object. The Hand Pointer raycasts from the centerPalmObj
// onto this screen object. The point of intersection is then mapped to
// the device screen to position the pointer
handsfree.hand.three.screen
```





<!-- Code -->
<script>
export default {
  data () {
    return {
      demoOpts: {
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