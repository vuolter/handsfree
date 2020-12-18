---
next: /ref/event/
sidebarDepth: 2
---
# 😉 Weboji

> **Technical documentation:** [https://github.com/jeeliz/jeelizWeboji/blob/master/doc/jeefacetransferAPI.pdf](https://github.com/jeeliz/jeelizWeboji/blob/master/doc/jeefacetransferAPI.pdf)

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6">
        <img src="https://media0.giphy.com/media/Iv2aSMS0QTy2P5JNCX/giphy.gif" />
      </div>
      <div class="col-6">
        <ul>
          <li>6DOF head pose estimations</li>
          <li>11 face morphs and 16 helper states</li>
          <li>Comes with "Face Pointer" based plugins</li>
        </ul>
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-weboji" text-off="Try Weboji" text-on="Stop Weboji" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-weboji handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-weboji handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try Weboji</button>
        </div>
      </div>
    </div>
  </div>
</div>


## Usage

### With defaults

```js
const handsfree = new Handsfree({weboji: true})
handsfree.start()
```

### With config

```js
// These are all the default values
handsfree = new Handsfree({
  weboji: {
    // Whether the model is enabled or not
    enabled: false,

    // Custom video settings
    videoSettings: {
      // The video, canvas, or image element
      // Omit this to auto create a <VIDEO> with the webcam
      videoElement: null,

      // ID of the device to use
      // Omit this to use the system default
      deviceId: null,

      // Which camera to use on the device
      // Possible values: 'user' (front), 'environment' (back)
      facingMode: 'user',

      // Video dimensions
      idealWidth: 320,
      idealHeight: 240,
      minWidth: 240,
      maxWidth: 1280,
      minHeight: 240,
      maxHeight: 1280
    },

    // Thresholds needed before these are considered "activated"
    // - Ranges from 0 (not active) to 1 (fully active)
    morphs: {
      threshold: {
        smileRight: 0.7,
        smileLeft: 0.7,
        browLeftDown: 0.8,
        browRightDown: 0.8,
        browLeftUp: 0.8,
        browRightUp: 0.8,
        eyeLeftClosed: 0.4,
        eyeRightClosed: 0.4,
        mouthOpen: 0.3,
        mouthRound: 0.8,
        upperLip: 0.5
      }
    }
  }
})
```

## Data

```js
/**
 * {Array} Face morphs, from 0 (not activated) to 1 (fully activated)
 * 
 * 0: smileRight → closed mouth smile right
 * 1: smileLeft → closed mouth smile left
 * 2: eyeBrowLeftDown → left eyebrow frowned
 * 3: eyeBrowRightDown → right eyebrow frowned
 * 4: eyeBrowLeftUp → raise left eyebrow (surprise)
 * 5: eyeBrowRightUp → raise right eyebrow (surprise)
 * 6: mouthOpen → open mouth
 * 7: mouthRound → o shaped mouth
 * 8: eyeRightClose → close right eye
 * 9: eyeLeftClose → close left eye
 * 10: mouthNasty → nasty mouth (show teeth)
 */
handsfree.data.weboji.morphs

/**
 * {Array} Head rotation [pitch, yaw, roll]
 * - in radians where [0, 0, 0] is the head pointed directly at camera
 */
handsfree.data.weboji.rotation

/**
 * {Array} Head translation [x, y, s]
 * - These are each between 0 and 1
 * - Scale refers to the size of the head in relation to the webcam frame
 */
handsfree.data.weboji.translation

/**
 * {Object} Where on the screen the head is pointed at {x, y}
 * - This is updated by: handsfree.plugin.facePointer
 */
handsfree.data.weboji.pointer

/**
 * {Object} Helper booleans checking if the morph has reached a threshold
 * 
 * .smileRight      Smirking lips to the right
 * .smileLeft       Smirking lips to the left
 * .smile           Smiling equally to both sides
 * .smirk           Smiling either to the right or left, but not both
 * .pursed          Kiss face
 * 
 * .browLeftUp      Left eyebrow raised up
 * .browRightUp     Right eyebrow raised up
 * .browsUp         Both eyebrows raised up
 * .browLeftDown    Left eyebrow frowning down
 * .browRightDown   Right eyebrow frowning down
 * .browsDown       Both eyebrows frowning down
 * .browseUpDown    One eyebrow down and the other up ("The Rock eyebrows")
 * 
 * .eyeLeftClosed   The left eye closed
 * .eyeRightClosed  The right eye closed
 * .eyesClosed      Both eyes closed
 * 
 * .mouthClosed
 * .mouthOpen
 */
handsfree.data.weboji.state
```

## API

Please see the [Weboji Docs](https://github.com/jeeliz/jeelizWeboji/blob/master/doc/jeefacetransferAPI.pdf) to see available methods exposed through `handsfree.face.api`:

```js
// Check if the head is detected or not
handsfree.face.api.is_detected()
```

## Using a pre-recorded video instead of a webcam

By default, setting `{face: true}` adds a new `<video>` element to the DOM to grab the webcam: 

```js
handsfree = new Handsfree({face: true})
```

To use a pre-recorded video or video stream, a canvas, or an image instead of a webcam set the `face.videoSettings.videoElement` property:

```js
handsfree = new Handsfree({
  face: {
    enabled: true,
    videoSettings: {
      videoElement: document.querySelector('#my-video')
    }
  }
})
```



<!-- Code -->
<script>
export default {
  data () {
    return {
      demoOpts: {
        weboji: true,
        hands: false,
        facemesh: false,
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