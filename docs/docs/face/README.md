# Face Tracking (through [Weboji](https://github.com/jeeliz/jeelizWeboji))

![](https://media.giphy.com/media/Iv2aSMS0QTy2P5JNCX/source.gif)

Each of the following can be accessed either through `handsfree.weboji.data` outside of a plugin, or through `data.weboji` when inside `onFrame(data => {})`. The alias to `weboji` is `face`:

```js
// Alias outside of plugins
handsfree.weboji.api === handsfree.face.api
handsfree.weboji.data === handsfree.face.data

// Alias inside of plugins
handsfree.use('myPlugin', data => {
  data.weboji === data.face
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