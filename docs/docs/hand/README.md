# Hand Tracking
> **Model used:** [Google's Handpose](https://github.com/tensorflow/tfjs-models/tree/master/handpose)
>
> **License:** [Apache 2.0](https://github.com/tensorflow/tfjs-models/blob/master/LICENSE)


<div class="window">
  <div class="window-body">
    <div class="row align-top">
      <div class="col-6">
        <p><strong>Hand Pointers</strong></p>
        <p><img src="https://media4.giphy.com/media/FxLUuTSxXjJPx8K9L4/giphy.gif"></p>
        <p><strong>Using with Three.js</strong></p>
        <p><img src="https://media4.giphy.com/media/brC1Ow2v62htVmpfLh/giphy.gif"></p>
      </div>
      <div class="col-6">
        <p><strong>Controlling Desktop Pointer</strong></p>
        <p><img src="https://media2.giphy.com/media/pdDOkUpnRbzMk8r0L4/giphy.gif"></p>
        <p><strong>Finger Laser Pointers</strong></p>
        <p><img src="https://media1.giphy.com/media/2vcbWI2ZAPeGvJVpII/giphy.gif"></p>
      </div>
    </div>
  </div>
</div>

## Setup

By default, setting `{hand: true}` adds a new `<video>` element to the DOM to grab the webcam: 

```js
handsfree = new Handsfree({hand: true})
```

## Config

```js
// These are all the default values
handsfree = new Handsfree({
  hand: {
    // Whether the model is enabled or not
    enabled: false,

    // How many milliseconds to wait between each inference
    throttle: 0,

    // Model config
    model: {
      // How many frames to go without running the bounding box detector.
      // - Set to a lower value if you want a safety net in case the mesh
      //   detector produces consistently flawed predictions
      maxContinuousChecks: Infinity,

      // Threshold for discarding a prediction
      detectionConfidence: 0.8,

      // A float representing the threshold for deciding whether boxes overlap
      // too much in non-maximum suppression. Must be between [0, 1]
      iouThreshold: 0.3,

      // A threshold for deciding when to remove boxes based on score in non-maximum suppression
      scoreThreshold: 0.75
    }
  }
})
```

## Accessing data

Each of the following can be accessed either through `handsfree.hand.data` outside of a plugin, or through `data.hand` when inside `onFrame(data => {})`:

```js
// Outside of a plugin
console.log(handsfree.hand.data)

// Inside of a plugin
handsfree.use('myPlugin', data => {
  console.log(data.hand)
})
```

## Hand Index

Refer to the following image when accessing meshes or a finger index:

![](/hand-indices.jpg)

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

## Three.js Properties

The following helper Three.js properties are also available:

```js
// A THREE Arrow object protuding from the index finger
// - You can use this to calculate pointing vectors
handsfree.hand.three.arrow

// The THREE camera
handsfree.hand.three.camera

// An additional mesh that is positioned at the center of the palm
// - This is where we raycast the Hand Pointer from
handsfree.hand.three.centerPalmObj

// The meshes representing each skeleton joint
// - You can tap into the rotation to calculate pointing vectors for each fingertip
handsfree.hand.three.meshes[]

// A reusable THREE raycaster
// @see https://threejs.org/docs/#api/en/core/Raycaster
handsfree.hand.three.raycaster

// The THREE scene and renderer used to hold the hand model
handsfree.hand.three.renderer
handsfree.hand.three.scene

// The screen object. The Hand Pointer raycasts from the centerPalmObj
// onto this screen object. The point of intersection is then mapped to
// the device screen to position the pointer
handsfree.hand.three.screen
```