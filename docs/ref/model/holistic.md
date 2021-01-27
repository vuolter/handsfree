---
sidebarDepth: 2
---
# Model: Holistic

<div class="row align-top">
  <div class="col-6">
    <p><img alt="A person making various poses with their face, hands, and body with a wireframe overlaid on top" src="https://media0.giphy.com/media/9wXxXyUldVNKADnpwn/giphy.gif" /></p>
    <ul>
      <li>Powered by <a href="https://www.npmjs.com/package/@mediapipe/holistic">MediaPipe's Holistic</a></li>
      <li>Full <a href="https://google.github.io/mediapipe/solutions/holistic.html">technical documentation</a></li>
    </ul>
  </div>
  <div class="col-6">
    <Window title="Overview and basic demo">
      <section>
        <ul>
          <li>🙂 468 2D face landmarks</li>
          <li>🖐 21 2D hand landmarks per hand with up to 4 hands</li>
          <li>🤺 33 2D pose landmarks</li>
          <li>📅 Extra helpers and plugins coming soon</li>
        </ul>
        <p>This model doesn't come with any bonuses or plugins yet but they'll come soon. The API will remain exactly the same, so feel free to started with this model today!</p>
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-holistic" text-off="Try basic Holistic demo" text-on="Stop Holistic Model" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-holistic handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-holistic handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try basic Holistic demo</button>
        </div>
      </section>
    </Window>
  </div>
</div>

::: tip ☝ Note
While this model uses a collection of models similar to MediaPipe [Hands](/ref/model/hands/), [Pose](/ref/model/pose/), and [FaceMesh](/ref/model/facemesh/), they only contain the keypoints and not the other models data points. Plugins for those specific models aren't working for this Holistic model yet, but they will be soon.
:::

## Usage

### With defaults

```js
const handsfree = new Handsfree({holistic: true})
handsfree.start()
```

### With config

```js
const handsfree = new Handsfree({
  holistic: {
    enabled: false,
    
    // Outputs only the top 25 pose landmarks if true,
    // otherwise shows all 33 full body pose landmarks
    // - Note: Setting this to true may result in better accuracy 
    upperBodyOnly: true,

    // Helps reduce jitter over multiple frames if true
    smoothLandmarks: true,

    // Minimum confidence [0 - 1] for a person detection to be considered detected
    minDetectionConfidence: 0.5,
        
    // Minimum confidence [0 - 1] for the pose tracker to be considered detected
    // Higher values are more robust at the expense of higher latency
    minTrackingConfidence: 0.5
  }
})

handsfree.start()
```

## Data

### Left Hand Landmarks

![](https://google.github.io/mediapipe/images/mobile/hand_landmarks.png)
<br><small>Image source, MediaPipe: [https://google.github.io/mediapipe/solutions/hands#hand-landmark-model](https://google.github.io/mediapipe/solutions/hands#hand-landmark-model)</small>

```js
// An array of landmark points for the left hand
handsfree.data.holistic.leftHandLandmarks == [
  // Landmark 0
  {x, y},
  // Landmark 1
  {x, y},
  // ...
  // Landmark 20
  {x, y}
]

// landmark 0
handsfree.data.holistic.leftHandLandmarks[0].x
handsfree.data.holistic.leftHandLandmarks[0].y
```

### Right Hand Landmarks

```js
// An array of landmark points for the right hand
handsfree.data.holistic.rightHandLandmarks == [
  // Landmark 0
  {x, y},
  // Landmark 1
  {x, y},
  // ...
  // Landmark 20
  {x, y}
]

// landmark 0
handsfree.data.holistic.rightHandLandmarks[0].x
handsfree.data.holistic.rightHandLandmarks[0].y
```

### Face Landmarks
```js
// An array of landmark points for the face
handsfree.data.holistic.faceLandmarks == [
  // Landmark 0
  {x, y},
  // Landmark 1
  {x, y},
  // ...
  // Landmark 467
  {x, y}
]

// landmark 0
handsfree.data.holistic.faceLandmarks[0].x
handsfree.data.holistic.faceLandmarks[0].y
```

### Pose Landmarks
![](https://google.github.io/mediapipe/images/mobile/pose_tracking_full_body_landmarks.png)
<br><small>Image source, MediaPipe: [https://google.github.io/mediapipe/solutions/pose#pose-landmark-model-blazepose-tracker](https://google.github.io/mediapipe/solutions/pose#pose-landmark-model-blazepose-tracker)</small>

```js
// An array of landmark points for the face
handsfree.data.holistic.poseLandmarks == [
  // Landmark 0
  {x, y, visibility},
  // Landmark 1
  {x, y, visibility},
  // ...
  // Landmark 32
  {x, y, visibility}
]

// landmark 0
handsfree.data.holistic.poseLandmarks[0].x
handsfree.data.holistic.poseLandmarks[0].y
// The confidence in this pose landmark
handsfree.data.holistic.poseLandmarks[0].visibility
```


### Examples of accessing the data

```js
handsfree = new Handsfree({holistic: true})
handsfree.start()

// From anywhere
handsfree.data.holistic.multiFaceLandmarks

// From inside a plugin
handsfree.use('logger', data => {
  if (!data.holistic?.poseLandmarks) return

  console.log(data.holistic.poseLandmarks[0])
})

// From an event
document.addEventListener('handsfree-data', event => {
  const data = event.detail
  if (!data.holistic?.leftHandLandmarks) return

  console.log(data.holistic.leftHandLandmarks)
})
```


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

<div class="row align-top">
  <div class="col-6">
    <Window title="Flappy Pose" :maximize="true">
      <section>
        <div>
          <router-link to="/ref/plugin/pinchScroll/"><img alt="Person playing Flappy Bird by flapping their arms. Flappy Bird is a game where you must flap the birds wings to fly or dodge barriers" src="https://media3.giphy.com/media/gUHHKdnuOW4OGOXcrI/giphy.gif"></router-link>
        </div>
        <p>In this game, the goal is to flap your arms to get the bird to fly around dodging obstacles. Made with an older version of Handsfree, but the API is very similar!</p>
        <div>
          <ul>
            <li><a href="https://flappy-pose.glitch.me/">Try it on Glitch</a></li>
            <li><a href="https://glitch.com/edit/#!/flappy-pose?path=src%2Fflap.js%3A32%3A4">See the source</a></li>
          </ul>
        </div>
      </section>
    </Window>
  </div>
  <div class="col-6">
    <Window title="Add your project">
      If you've made something with this model I'd love to showcase it here! DM me <a href="https://twitter.com/midiblocks">on Twitter</a>, <a class="https://github.com/midiblocks/handsfree/edit/master/docs/ref/model/hands.md">make a pull request</a>, or <a href="https://discord.gg/q96txF5Wf5">find us on Discord</a>.  
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
        holistic: true,
        handpose: false
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