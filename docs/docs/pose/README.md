# Pose Estimation
> **Model used:** [Google's PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)
>
> **License:** [MIT](https://github.com/ml5js/ml5-library/blob/main/LICENSE)

::: danger 🚨 Please note
The PoseNet integration will be overhauled soon. It's not recommended to use it in production in it's current state
:::

## Properties

Each of the following can be accessed either through `handsfree.posenet.data` outside of a plugin, or through `data.posenet` when inside `onFrame(data => {})`. The alias to `posenet` is `pose`:

```js
/**
 * {Array} Keypoint confidence. Each index is an object with:
 * 
 * {part: 'name', position: {x, y}, score}
 * 
 * Where {x, y} is the pixel on the screen the keypoint is at
 * and the score is how confident the algorithm is
 */
handsfree.posenet.pose.keypoints[]

/**
 * {Number} How confident the algorithm is about the whole pose
 */
handsfree.posenet.pose.score

/**
 * {Object} Each of the above can also be accessed by name
 */
handsfree.posenet.pose.nose

handsfree.posenet.pose.leftAnkle
handsfree.posenet.pose.leftEar
handsfree.posenet.pose.leftElbow
handsfree.posenet.pose.leftEye
handsfree.posenet.pose.leftHip
handsfree.posenet.pose.leftKnee
handsfree.posenet.pose.leftShoulder
handsfree.posenet.pose.leftWrist

handsfree.posenet.pose.rightAnkle
handsfree.posenet.pose.rightEar
handsfree.posenet.pose.rightElbow
handsfree.posenet.pose.rightEye
handsfree.posenet.pose.rightHip
handsfree.posenet.pose.rightKnee
handsfree.posenet.pose.rightShoulder
handsfree.posenet.pose.rightWrist
```

## Methods

The [PoseNet API](https://github.com/tensorflow/tfjs-models/tree/master/posenet) is available through `handsfree.posenet.api`.