---
sidebarDepth: 2
---
# 🤸‍♀️ Pose


<div class="row align-top">
  <div class="col-6">
    <p><img alt="A person striking various poses, with a wireframe overlaid on top of them" src="https://media0.giphy.com/media/VJ7aDV6F5id8wY2Ff0/giphy.gif" /></p>
    <ul>
      <li>Powered by <a href="https://www.npmjs.com/package/@mediapipe/pose">MediaPipe's Pose</a></li>
      <li>Full <a href="https://google.github.io/mediapipe/solutions/pose.html">technical documentation</a></li>
    </ul>
  </div>
  <div class="col-6">
    <Window title="Overview and basic demo">
      <section>
        <ul>
          <li>🤸‍♀️ Full body mode with 33 2D pose landmarks</li>
          <li>🤺 Upper body mode with 25 2D upper pose landmarks</li>
          <li>📅 Extra helpers and plugins coming soon</li>
        </ul>
        <p>This model doesn't come with any bonuses or plugins yet but they'll come soon. The API will remain exactly the same, so feel free to started with this model today!</p>
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-pose" text-off="Try basic Pose demo" text-on="Stop Pose Model" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-pose handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-pose handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try basic Pose demo</button>
        </div>
      </section>
    </Window>
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
handsfree.data.pose.poseLandmarks == [
  // Landmark 0
  {x, y, visibility},
  // Landmark 1
  {x, y, visibility},
  // ...
  // Landmark 32
  {x, y, visibility}
]

// landmark 0
handsfree.data.pose.poseLandmarks[0].x
handsfree.data.pose.poseLandmarks[0].y
// The confidence in this pose landmark
handsfree.data.pose.poseLandmarks[0].visibility
```

### Examples of accessing the data

```js
handsfree = new Handsfree({pose: true})
handsfree.start()

// From anywhere
handsfree.data.pose.poseLandmarks

// From inside a plugin
handsfree.use('logger', data => {
  if (!data.pose) return

  console.log(data.pose.poseLandmarks)
})

// From an event
document.addEventListener('handsfree-data', event => {
  const data = event.detail.data
  if (!data.pose) return

  console.log(event.detail.data.pose.poseLandmarks)
})
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
        holistic: false,
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