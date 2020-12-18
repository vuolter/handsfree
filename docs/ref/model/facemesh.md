---
prev: /ref/model/
---

# 😏 FaceMesh

> **Technical documentation:** [https://google.github.io/mediapipe/solutions/face_mesh.html](https://google.github.io/mediapipe/solutions/face_mesh.html)

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6">
        <router-link to="/ref/model/hands.html"><img src="https://media0.giphy.com/media/g2msiDwoLqabEMrmaL/giphy.gif" /></router-link>
      </div>
      <div class="col-6">
        <ul>
          <li>468 3D face landmarks</li>
          <li>Track up to 4 faces at once</li>
          <li>📅 Extra helpers and plugins coming soon</li>
        </ul>
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-facemesh" text-off="Try FaceMesh" text-on="Stop FaceMesh" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-facemesh handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-facemesh handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try FaceMesh</button>
        </div>
      </div>
    </div>
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
handsfree.model.facemesh.data.multiFaceLandmarks[faceIndex] == [
  // Landmark 0
  {x, y},
  // Landmark 1
  {x, y},
  // ...
  // Landmark 467
  {x, y}
]

// Landmark 0 and face 0
handsfree.model.facemesh.data.multiFaceLandmarks[0][0].x
handsfree.model.facemesh.data.multiFaceLandmarks[0][0].y
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