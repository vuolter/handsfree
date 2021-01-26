---
next: /ref/event/
sidebarDepth: 2
---
# Model: Weboji


<div class="row align-top">
  <div class="col-6">
    <p><img alt="A person moving a virtual mouse pointer by moving their head" src="https://media0.giphy.com/media/Iv2aSMS0QTy2P5JNCX/giphy.gif" /></p>
    <ul>
      <li>Powered by <a href="https://github.com/jeeliz/jeelizWeboji">Jeeliz's Weboji</a></li>
      <li>Full <a href="https://github.com/jeeliz/jeelizWeboji/blob/master/doc/jeefacetransferAPI.pdf">technical documentation</a></li>
    </ul>
  </div>
  <div class="col-6">
    <Window title="Overview and basic demo">
      <section>
        <ul>
          <li>😀 6DOF head pose estimations</li>
          <li>😜 11 face morphs and 16 helper states</li>
          <li>🔌 Comes with "Face Pointer" based plugins</li>
        </ul>
        <p>This model uses morphs to help estimate various face states simultaneously and includes assistive tech plugins for browsing pages with face gestures.</p>
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-weboji" text-off="Try basic Weboji demo" text-on="Stop Weboji Model" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-weboji handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-weboji handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try basic Weboji demo</button>
        </div>
      </section>
    </Window>
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
 * {Boolean} Whether the face is detected or not
 */
handsfree.data.weboji.isDetected

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
 * {Array} Head rotation [pitch, yaw, roll]
 * - in degrees where [0, 0, 0] is the head pointed directly at camera
 */
handsfree.data.weboji.degree

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

Please see the [Weboji Docs](https://github.com/jeeliz/jeelizWeboji/blob/master/doc/jeefacetransferAPI.pdf) to see available methods exposed through `handsfree.model.weboji.api`:

```js
// Check if the head is detected or not
handsfree.model.weboji.api.is_detected()
```

## Using a pre-recorded video instead of a webcam

By default, setting `{weboji: true}` adds a new `<video>` element to the DOM to grab the webcam: 

```js
handsfree = new Handsfree({weboji: true})
```

To use a pre-recorded video or video stream, a canvas, or an image instead of a webcam set the `.videoSettings.videoElement` property:

```js
handsfree = new Handsfree({
  weboji: {
    enabled: true,
    videoSettings: {
      videoElement: document.querySelector('#my-video')
    }
  }
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
    <Window title='Playing "Into the Breach" handsfree' :maximize="true">
      <section>
        <div>
          <a href="https://github.com/MIDIBlocks/midiblocks-web"><img alt="Person playing Into the Breach with face gestures" src="https://media3.giphy.com/media/eABiZprIEtouRZIc75/giphy.gif"></a>
        </div>
        <p>This example uses the <a href="https://midiblocks.com">Midiblocks Platform</a> to map head movements to control the desktop mouse with the <router-link to="/ref/plugin/facePointer/">facePointer plugin</router-link> and trigger native mouse clicks with the <router-link to="/ref/plugin/faceClick/">faceClick plugin</router-link>.</p>
        <div>
          <ul>
            <li><a href="https://midiblocks.com">Try the Midiblocks web demo</a></li>
            <li><a href="https://github.com/midiblocks/midiblocks-web">See the Midiblocks source</a></li>
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

## See also

- Integrations
  - A-Frame
    - ["Look around" handsfree](/integration/aframe/look-around-handsfree/)
- Plugins
  - [faceClick](/ref/model/faceClick/)
  - [facePointer](/ref/model/facePointer/)
  - [faceScroll](/ref/model/faceScroll/)

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
        holistic: false,
        handpose: false,

        plugin: {
          facePointer: {enabled: true},
          faceScroll: {enabled: true},
          faceClick: {enabled: true}
        }
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