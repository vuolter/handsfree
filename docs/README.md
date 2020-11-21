<h1 class="mb-0">Handsfree.js</h1>
<h3 style="padding-top: 2em">Build handsfree User Experiences and add face, hand, and/or pose tracking to your projects in a snap ✨</h3>
<p class="verticle-middle-children space-children">
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/stars/midiblocks/handsfree?style=social"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/release-pre/handsfreejs/handsfree.svg"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/repo-size/handsfreejs/handsfree.svg"></a>
</p>

---

```js
const handsfree = new Handsfree({face: true})
handsfree.start()
```

<table>
  <tr>
    <td class="col-6"><img src="https://media.giphy.com/media/Iv2aSMS0QTy2P5JNCX/source.gif"></td>
    <td class="col-6">
      <h2>Try it!</h2>
      <ul>
        <li>Move head to move red pointer</li>
        <li>Smile to the left or right to click on things</li>
        <li>Move pointer above/or below page to scroll</li>
      </ul>
      <HandsfreeToggle text-off="Activate Face Pointer" text-on="Stop Handsfree" />
    </td>
  </tr>
</table>

::: warning 📅 Coming Soon!
These docs should be finished by Sunday 11/22
:::

<blockquote class="verticle-middle-children space-children text-center">
  <strong>Powered by:</strong>
  <a href="https://github.com/jeeliz/jeelizWeboji"><img width=100 src="https://jeeliz.com/wp-content/uploads/2018/01/LOGO_JEELIZ_BLUE.png"></a>
  <a href="https://github.com/tensorflow/tfjs-models/"><img src='https://i.imgur.com/KqlnNuA.png' height=30></a> <a href="https://ml5js.org/"><img src="https://i.imgur.com/rgguSyv.png" height=30></a>
</blockquote>

## How it Works

1. Create a new instance of `Handsfree` with some models you'd like to use:
```js
const handsfree = new Handsfree({face: true})
```

2. When you run `handsfree.start()` the models you chose are loaded, along with any dependencies. Throughout the Handsfree lifecycle, various classes are added to the DOM `body` which you can style:

```css
/* Helper classes */
.handsfree-show-when-stopped
.handsfree-show-when-loading
.handsfree-hide-when-loading

/* Automatically assigned body classes */
body.handsfree-started
body.handsfree-clicked
body.handsfree-calibrating

/* When different models are loaded */
body.handsfree-model-weboji
body.handsfree-model-handpose
body.handsfree-model-posenet
```

3. Throughout the lifecycle, various events are dispatched which you can hook into. You can also hook into the main "game loop" by creating a plugin with `handsfree.use(pluginName, callbackOrOptions)`. Plugins can be toggled on/off, allowing for rich and dynamic User Experiences:

## Models

In Handsfree.js, models are added to the page through the Model API. The Model API ensures a few things:

- Automatic dependency and state management
- The ability to dynamically toggle and throttle models
- The ability to hot-swap a model out for another

Here are the models that come with Handsfree.js out of the box:

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