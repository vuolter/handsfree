# Hand Tracking (through [Handpose](https://github.com/tensorflow/tfjs-models/tree/master/handpose))

![](https://media.giphy.com/media/2vcbWI2ZAPeGvJVpII/source.gif)

Each of the following can be accessed either through `handsfree.handpose.data` outside of a plugin, or through `data.handpose.data` when inside `onFrame(data => {})`.

### Properties

```js
/**
 * How confident the model is that a hand is in view
 * [0 - 1]
 */
handsfree.handpose.data.handInViewConfidence

/**
 * The top left and bottom right pixels containing the hand in the iframe
 */
handsfree.handpose.data.boundingBox = {
  topLeft: [x, y],
  bottomRight: [x, y]
}

/**
 * [x, y, z] of various hand landmarks
 */
handsfree.handpose.data.landmarks[0..9] = [...[x, y, z]]

/**
 * [x, y, z] of various hand landmarks
 */
handsfree.handpose.data.annotations: {
  thumb: [...[x, y, z]], // 4 landmarks
  indexFinger: [...[x, y, z]], // 4 landmarks
  middleFinger: [...[x, y, z]], // 4 landmarks
  ringFinger: [...[x, y, z]], // 4 landmarks
  finger: [...[x, y, z]], // 4 landmarks
  palmBase: [[x, y, z]], // 1 landmarks
}
```