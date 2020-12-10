# Face Tracking
> **Model used:** [Jeeliz's Weboji](https://github.com/jeeliz/jeelizWeboji)
>
> **License:** [Apache 2.0](https://github.com/jeeliz/jeelizWeboji/blob/master/LICENSE)

<div class="window">
  <div class="window-body">
    <div class="row">
      <div class="col-6">
        <p><strong>Face Pointers</strong></p>
        <p><img src="https://media.giphy.com/media/Iv2aSMS0QTy2P5JNCX/source.gif"></p>
        <p><strong>Head-tracked Motion Parallax Display</strong></p>
        <p><img src="https://media4.giphy.com/media/8sCpFH9JCws8iWsaoj/giphy.gif"></p>
      </div>
      <div class="col-6">
        <p><strong>Puppeteering Industrial Robots</strong></p>
        <p><img src="https://media0.giphy.com/media/1XE2rnMPk6BFu8VQRr/giphy.gif"></p>
        <p><strong>Controlling Desktop Pointer</strong></p>
        <p><img src="https://media3.giphy.com/media/YATR9GZSSHKeNw3fht/giphy.gif"></p>
      </div>
    </div>
  </div>
</div>

## Setup

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

## Config

```js
// These are all the default values
handsfree = new Handsfree({
  face: {
    // Whether the model is enabled or not
    enabled: false,

    // How many milliseconds to wait between each inference
    throttle: 0,
    
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
    
    // Represents the calibrator settings
    calibrator: {
      // (optional) The target element to act as the calibrator wrapping div
      target: null,
      // The message to display over the marker, can be HTML
      instructions: 'Point head towards center of circle below',
      // (optional if .target === null, otherwise required) The target element to act as the calibrator target (should be inside target)
      marker: null
    }
  }
})
```

## Accessing data

Each of the following can be accessed either through `handsfree.face.data` outside of a plugin, or through `data.face` when inside `onFrame(data => {})`:

```js
// Outside of a plugin
console.log(handsfree.face.data)

// Inside of a plugin
handsfree.use('myPlugin', data => {
  console.log(data.face)
})
```

## Properties

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
handsfree.face.data.morphs

/**
 * {Array} Head rotation [pitch, yaw, roll]
 * - in radians where [0, 0, 0] is the head pointed directly at camera
 */
handsfree.face.data.rotation

/**
 * {Array} Head translation [x, y, s]
 * - These are each between 0 and 1
 * - Scale refers to the size of the head in relation to the webcam frame
 */
handsfree.face.data.translation

/**
 * {Object} Where on the screen the head is pointed at {x, y}
 * - This is updated by: handsfree.plugin.facePointer
 */
handsfree.face.data.pointer

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
handsfree.face.data.state
```

## Methods

Please see the [Weboji Docs](https://github.com/jeeliz/jeelizWeboji/blob/master/doc/jeefacetransferAPI.pdf) to see available methods exposed through `handsfree.face.api`:

```js
// Check if the head is detected or not
handsfree.face.api.is_detected()
```