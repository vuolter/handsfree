# Prop: `handsfree.data`

This property contains references to all the debug elements used to hold the webcam stream and the skeleton and keypoint overlays. The following elements are all automatically created if you omit the [.setup config](/ref/prop/config/#setup-canvas) during instantiation.

## Properties

handsfree.debug.$canvas: CANVAS
: The 2D canvas element used for overlaying the skeleton/keypoints. Currently this is used for the [handpose](/ref/model/handpose/) and [holistic](/ref/model/holistic/) models

handsfree.debug.$canvasWebGL: CANVAS
: The WebGL canvas element used for overlaying the skeleton/keypoints. Currently this is only used for the [weboji model](/ref/model/weboji/)

handsfree.debug.$video: VIDEO
: The video element containing the webcam stream. You can access the stream directly with `handsfree.debug.$video.srcObject`. Currently this is only used by the [weboji model](/ref/model/weboji/) as each model handles the stream differently. This will be unified eventually!

handsfree.debug.$wrap: CANVAS
: The element that contains the canvases and video. If you need to move all the debug elements around in your DOM, this is the element to target

## Example

```js
const handsfree = new Handsfree({weboji: true})
handsfree.start()

// Move the debuggers to a DIV#debug-window
document.querySelector('#debug-window').appendChild(handsfree.debug.$wrap)

// Apply a filter to the canvas
handsfree.debug.$canvasWebGL.style.filter = 'blur(4px)'
```