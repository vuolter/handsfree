---
sidebarDepth: 2
---
# Model: Hands

<div class="row align-top">
  <div class="col-6">
    <p><img alt="A 3D model of a hand projected above a person's hand" src="https://media0.giphy.com/media/y4S6WFaCUWvqHL7UA8/giphy.gif" /></p>
    <ul>
      <li>Powered by <a href="https://www.npmjs.com/package/@mediapipe/hands">MediaPipe's Hands</a></li>
      <li>Full <a href="https://google.github.io/mediapipe/solutions/hands.html">technical documentation</a></li>
    </ul>
  </div>
  <div class="col-6">
    <Window title="Overview and basic demo">
      <section>
        <ul>
          <li>🖐 21 2D hand landmarks</li>
          <li>🖐🖐 Track up to 4 hands total</li>
        </ul>
        <p>This model includes dozens of <router-link to="/ref/plugin/pinchers/">Pinch Events</router-link> and helper styles to get you going quickly, along with a <router-link to="/ref/plugin/pinchScroll/">plugin for scrolling pages handsfree</router-link>.</p>
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-hands" text-off="Try basic Hands demo" text-on="Stop Hands Model" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-hands handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-hands handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try basic Hands demo</button>
        </div>
      </section>
    </Window>
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
handsfree.data.hands.multiHandedness[0].label
handsfree.data.hands.multiHandedness[0].score
```

### Examples of accessing the data

```js
handsfree = new Handsfree({hands: true})
handsfree.start()

// From anywhere
handsfree.data.hands.multiHandLandmarks

// From inside a plugin
handsfree.use('logger', data => {
  if (!data.hands) return

  console.log(data.hands.multiHandLandmarks[0])
})

// From an event
document.addEventListener('handsfree-data', event => {
  const data = event.detail
  if (!data.hands) return

  console.log(data.hands.multiHandedness)
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
    <Window title="Scroll pages handsfree" :maximize="true">
      <section>
        <div>
          <router-link to="/ref/plugin/pinchScroll/"><img alt="Person scrolling page by pinching the air and moving hand up and down to scroll in that direction" src="https://media1.giphy.com/media/BSkodGjuwBPAEwxjGv/giphy.gif"></router-link>
        </div>
        <p>The <router-link to="/ref/plugin/pinchScroll/">pinchScroll plugin</router-link> helps you scroll pages with a pinch gesture. In the GIF above, it's being used within a Browser Extension to scroll pages you visit handsfree.</p>
        <div>
          <ul>
            <li><router-link to="/ref/plugin/pinchScroll/">Try it on the plugin page</router-link></li>
            <li><router-link to="/ref/plugin/pinchScroll.html#full-plugin-code">See the source</router-link></li>
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

## See Also

- [pinchers plugin](/ref/plugin/pinchers/) - This plugin adds dozens of new events and helper styles for pinching any finger (index, middle, ring, pinky) to your thumb. It is enabled by default
- [pinchScroll plugin](/ref/plugin/pinchScroll/) - Adds the ability to scroll pages with a pinch gesture






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