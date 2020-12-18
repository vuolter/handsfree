---
sidebarDepth: 2
---
# 🤸‍♀️ Pose

> **Technical documentation:** [https://google.github.io/mediapipe/solutions/hands](https://google.github.io/mediapipe/solutions/hands)

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6">
        <img src="https://media0.giphy.com/media/VJ7aDV6F5id8wY2Ff0/giphy.gif" />
      </div>
      <div class="col-6">
        <ul>
          <li>Full body mode with 33 2D pose landmarks</li>
          <li>Upper body mode with 25 2D upper pose landmarks</li>
          <li>📅 Extra helpers and plugins coming soon</li>
        </ul>
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-pose" text-off="Try Pose" text-on="Stop Pose" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-pose handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-pose handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try Pose</button>
        </div>
      </div>
    </div>
  </div>
</div>

## Usage

### With defaults

```js
const handsfree = new Handsfree({pose: true})
handsfree.start()
```

### With config

```js
const handsfree = new Handsfree({
  pose: {
    enabled: false,
    
    // Outputs only the top 25 pose landmarks if true,
    // otherwise shows all 33 full body pose landmarks
    // - Note: Setting this to true may result in better accuracy 
    upperBodyOnly: false,

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
        pose: true,
        holistic: false
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