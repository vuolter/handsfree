---
sidebarDepth: 2
---
# Model: Holistic

<div class="row align-top">
  <div class="col-6">
    <p><img alt="A 3D model of a hand projected above a person's hand" src="https://media0.giphy.com/media/9wXxXyUldVNKADnpwn/giphy.gif" /></p>
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
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-facemesh" text-off="Try basic Face Mesh demo" text-on="Stop Face Mesh Model" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-facemesh handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-facemesh handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try basic Face Mesh demo</button>
        </div>
      </section>
    </Window>
  </div>
</div>


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