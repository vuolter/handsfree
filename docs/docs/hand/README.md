# Hand Tracking
> **Model used:** [Google's Handpose](https://github.com/tensorflow/tfjs-models/tree/master/handpose)
>
> **License:** [Apache 2.0](https://github.com/tensorflow/tfjs-models/blob/master/LICENSE)

![](https://media4.giphy.com/media/FxLUuTSxXjJPx8K9L4/giphy.gif)

Each of the following can be accessed either through `handsfree.handpose.data` outside of a plugin, or through `data.handpose.data` when inside `onFrame(data => {})`. The alias to `handpose` is `hand`:

```js
// Alias outside of plugins
handsfree.handpose.api === handsfree.hand.api
handsfree.handpose.data === handsfree.hand.data

// Alias inside of plugins
handsfree.use('myPlugin', data => {
  data.handpose === data.hand
})
```

## Properties

```js
/**
 * How confident the model is that a hand is in view
 * [0 - 1]
 */
handsfree.hand.data.handInViewConfidence

/**
 * The top left and bottom right pixels containing the hand in the iframe
 */
handsfree.hand.data.boundingBox = {
  topLeft: [x, y],
  bottomRight: [x, y]
}

/**
 * [x, y, z] of various hand landmarks
 */
handsfree.hand.data.landmarks[0..9] = [...[x, y, z]]

/**
 * [x, y, z] of various hand landmarks
 */
handsfree.hand.data.annotations: {
  thumb: [...[x, y, z]], // 4 landmarks
  indexFinger: [...[x, y, z]], // 4 landmarks
  middleFinger: [...[x, y, z]], // 4 landmarks
  ringFinger: [...[x, y, z]], // 4 landmarks
  finger: [...[x, y, z]], // 4 landmarks
  palmBase: [[x, y, z]], // 1 landmarks
}
```