# 🤺 Holistic

> **Technical documentation:** [https://google.github.io/mediapipe/solutions/hands](https://google.github.io/mediapipe/solutions/hands)

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6">
        <img src="https://media0.giphy.com/media/9wXxXyUldVNKADnpwn/giphy.gif" />
      </div>
      <div class="col-6">
        <ul>
          <li>468 2D face landmarks</li>
          <li>21 2D hand landmarks per hand with up to 4 hands</li>
          <li>33 2D pose landmarks</li>
          <li>📅 Extra helpers and plugins coming soon</li>
        </ul>
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-holistic" text-off="Try Holistic" text-on="Stop Holistic" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-holistic handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-holistic handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try Holistic</button>
        </div>
      </div>
    </div>
  </div>
</div>

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
    enabled: false,
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
        hands: false,
        facemesh: false,
        pose: false,
        holistic: true
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