<h1>Handsfree.js</h1>

<p class="mt-0 verticle-middle-children space-children">
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/stars/midiblocks/handsfree?style=social"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/release-pre/handsfreejs/handsfree.svg"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/repo-size/handsfreejs/handsfree.svg"></a>
</p>

---

### Handsfree.js is a library that helps you add face tracking, hand tracking, and/or pose estimation to your JavaScript projects in a snap. It also:

- Manages dependencies to minimize impact on initial page load times
- Creates a single, pluggable "game loop" that is passed face morphs, keypoints, confidences and more
- Comes with a collection of plugins for accelerating assistive tech development, including Face Pointers and Finger Pointers

<!-- <blockquote>
  <p class="verticle-middle-children space-children">
    <strong>Powered by:</strong>
    <a href="https://github.com/jeeliz/jeelizWeboji"><img width=100 src="https://jeeliz.com/wp-content/uploads/2018/01/LOGO_JEELIZ_BLUE.png"></a>
    <a href="https://github.com/tensorflow/tfjs-models/"><img src='https://i.imgur.com/KqlnNuA.png' height=30></a> <a href="https://ml5js.org/"><img src="https://i.imgur.com/rgguSyv.png" height=30></a>
  </p>
  <hr>
  <br>
</blockquote> -->

<table>
  <tr>
    <td style="width: 50%"><a href="/examples/face-pointer"><img src="https://media.giphy.com/media/Iv2aSMS0QTy2P5JNCX/source.gif"></a></td>
    <td>
      <div><strong>Face Tracking (through <a href="https://github.com/jeeliz/jeelizWeboji">Weboji</a>)</strong></div>
      <ul>
        <li>Detect 3D head position and rotation</li>
        <li>11 face morphs for eyes and mouth</li>
        <li>~1.4Mb filesize</li>
      </ul>
      <div><strong>Featured Example:</strong> <a href="/examples/face-pointer">Face Pointer</a></div>
    </td>
  </tr>
  <tr>
    <td style="width: 50%"><a href="/examples/finger-pointer"><img src="https://media2.giphy.com/media/2vcbWI2ZAPeGvJVpII/giphy.gif"></a></td>
    <td>
      <div><strong>Hand Tracking (through <a href="https://github.com/tensorflow/tfjs-models/tree/master/handpose">Handpose</a>)</strong></div>
      <ul>
        <li>Detect 3D position of palm and fingers</li>
        <li>Get vectors for where fingers are pointed</li>
        <li>~2.9Mb filesize</li>
      </ul>
      <div><strong>Featured Example:</strong> <a href="/examples/finger-pointer">Finger Pointer</a></div>
    </td>
  </tr>
  <tr>
    <td style="width: 50%"><a href="https://flappy-pose.glitch.me/"><img src="https://media1.giphy.com/media/gUHHKdnuOW4OGOXcrI/giphy.gif"></a></td>
    <td>
      <div><strong>Pose Estimation (through <a href="https://github.com/tensorflow/tfjs-models/tree/master/posenet">PoseNet/ml5.js</a>)</strong></div>
      <ul>
        <li>Detect 2D keypoints for face, arms, and legs</li>
        <li>Detect many people at the same time</li>
        <li>~2.6Mb filesize</li>
      </ul>
      <div><strong>Featured Example:</strong> <a href="https://flappy-pose.glitch.me/">coming soon</a></div>
    </td>
  </tr>
</table>

## Try it

Press the start button below to enable a "Face Pointer". Move the pointer with your head, and scroll the page by moving the pointer above and below the window. Click on things with a smirk (smile to either side).

```js
const handsfree = new Handsfree({face: true})
handsfree.start()
```

<HandsfreeToggle text-off="Activate Face Pointer" text-on="Stop Handsfree" />

## Quickstart

### Through CDN
```html
<!-- Include Handsfree.js -->
<link rel="stylesheet" href="https://unpkg.com/handsfree@7.1.0/dist/assets/handsfree.css" />
<script src="https://unpkg.com/handsfree@7.1.0/dist/handsfree.js"></script>

<!-- Instantiate and start it -->
<script>
  const handsfree = new Handsfree({face: true})
  handsfree.start()
</script>
```

### Through NPM

::: warning Important
In order to keep startup times snappy some dependencies must be loaded at runtime:

- Install with: `npm i handsfree`
- Copy `node_modules/handsfree/build/lib/assets` folder into your projects public folder
- When instantiating `Handsfree` set the `assetsPath` option to where you moved the assets into
:::

```js
import Handsfree from 'handsfree'
const handsfree = new Handsfree({
  assetsPath: '/public/assets/',
  face: true
})

handsfree.start()
```