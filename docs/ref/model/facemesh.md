---
prev: /ref/model/
sidebarDepth: 2
---

# Model: FaceMesh

<div class="row align-top">
  <div class="col-6">
    <p><img alt="A 3D model of a hand projected above a person's hand" src="https://media0.giphy.com/media/g2msiDwoLqabEMrmaL/giphy.gif" /></p>
    <ul>
      <li>Powered by <a href="https://www.npmjs.com/package/@mediapipe/face_mesh">MediaPipe's Face Mesh</a></li>
      <li>Full <a href="https://google.github.io/mediapipe/solutions/face_mesh.html">technical documentation</a></li>
    </ul>
  </div>
  <div class="col-6">
    <Window title="Overview and basic demo">
      <section>
        <ul>
          <li>🙂 468 2D face landmarks</li>
          <li>😁😜 Track up to 4 faces at once</li>
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
const handsfree = new Handsfree({facemesh: true})
handsfree.start()
```

### With config

```js
const handsfree = new Handsfree({
  facemesh: {
    enabled: true,
    // The maximum number of faces to detect [1 - 4]
    maxNumFaces: 1,

    // Minimum confidence [0 - 1] for a face to be considered detected
    minDetectionConfidence: 0.5,
    
    // Minimum confidence [0 - 1] for the landmark tracker to be considered detected
    // Higher values are more robust at the expense of higher latency
    minTrackingConfidence: 0.5
  }
})

handsfree.start()
```

## Data
```js
// faceIndex [0 - 3] An array of landmark points for each detected face
handsfree.data.facemesh.multiFaceLandmarks[faceIndex] == [
  // Landmark 0
  {x, y},
  // Landmark 1
  {x, y},
  // ...
  // Landmark 467
  {x, y}
]

// face 0, landmark 0
handsfree.data.facemesh.multiFaceLandmarks[0][0].x
handsfree.data.facemesh.multiFaceLandmarks[0][0].y
```

### Examples of accessing the data

```js
handsfree = new Handsfree({facemesh: true})
handsfree.start()

// From anywhere
handsfree.data.facemesh.multiFaceLandmarks[0]

// From inside a plugin
handsfree.use('logger', data => {
  if (!data.facemesh) return

  console.log(data.facemesh.multiFaceLandmarks[0][0])
})

// From an event
document.addEventListener('handsfree-data', event => {
  const data = event.detail.data
  if (!data.facemesh) return

  console.log(event.detail.data.facemesh.multiFaceLandmarks)
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
        facemesh: true,
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