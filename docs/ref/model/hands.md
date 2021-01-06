---
sidebarDepth: 2
---
# Model: Hands

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6">
        <img src="https://media0.giphy.com/media/y4S6WFaCUWvqHL7UA8/giphy.gif" />
      </div>
      <div class="col-6">
        <ul>
          <li>21 2D hand landmarks per hand</li>
          <li>Track up to 4 hands at once</li>
          <li>📅 Extra helpers and plugins coming soon</li>
        </ul>
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-hands" text-off="Try Hands" text-on="Stop Hands" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-hands handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-hands handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try Hands</button>
        </div>
      </div>
    </div>
  </div>
</div>

> - [MediaPipe Pose NPM Package](https://www.npmjs.com/package/@mediapipe/hands)
> - [Technical documentation](https://google.github.io/mediapipe/solutions/hands.html)

## Usage

### With defaults

```js
const handsfree = new Handsfree({hands: true})
handsfree.start()
```

### With config

```js
const handsfree = new Handsfree({
  hands: {
    enabled: true,
    // The maximum number of hands to detect [0 - 4]
    maxNumHands: 2,

    // Minimum confidence [0 - 1] for a hand to be considered detected
    minDetectionConfidence: 0.5,

    // Minimum confidence [0 - 1] for the landmark tracker to be considered detected
    // Higher values are more robust at the expense of higher latency
    minTrackingConfidence: 0.5
  }
})

handsfree.start()
```

## Data

![](https://google.github.io/mediapipe/images/mobile/hand_landmarks.png)
<br><small>Image source, MediaPipe: [https://google.github.io/mediapipe/solutions/hands#hand-landmark-model](https://google.github.io/mediapipe/solutions/hands#hand-landmark-model)</small>

### Hand Landmarks

```js
// handIndex [0 - 3] An array of landmark points for each detected hands
handsfree.data.hands.multiHandLandmarks[handIndex] == [
  // Landmark 0
  {x, y},
  // Landmark 1
  {x, y},
  // ...
  // Landmark 20
  {x, y}
]

// hand 0, landmark 0
handsfree.data.hands.multiHandLandmarks[0][0].x
handsfree.data.hands.multiHandLandmarks[0][0].y
```

### Is it the right or left hand?

```js
// handIndex [0 - 3] An array of landmark points for each detected hands
handsfree.data.hands.multiHandedness[handIndex] == {
  // "right" or "left"
  label,
  // The probability that it is "right" or "left"
  score
}

// hand 0
handsfree.data.hands.multiHandLandmarks[0].label
handsfree.data.hands.multiHandLandmarks[0].score
```




<!-- Code -->
<script>
export default {
  data () {
    return {
      demoOpts: {
        weboji: false,
        hands: true,
        facemesh: false,
        pose: false,
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