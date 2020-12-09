<h1 class="mb-0"><a href="https://github.com/midiblocks/handsfree"><img src="/branding/handsfree.png"></a></h1>
<h3 style="padding-top: 2em">Build handsfree User Experiences and add face, hand, and pose tracking to your projects in a snap 👌✨</h3>
<p class="verticle-middle-children space-children">
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/stars/midiblocks/handsfree?style=social"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/tag/handsfreejs/handsfree.svg"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/repo-size/handsfreejs/handsfree.svg"></a>
</p>

---

```js
const handsfree = new Handsfree({face: true})
handsfree.start()
```

<div class="window">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://media.giphy.com/media/Iv2aSMS0QTy2P5JNCX/source.gif"></div>
      <div class="col-6">
        <h2>Try it!</h2>
        <ul>
          <li>Move head to move red pointer</li>
          <li>Smile to the left or right to click on things</li>
          <li>Move pointer above/or below page to scroll</li>
        </ul>
        <HandsfreeToggle class="block-children" text-off="Activate Face Pointer" text-on="Stop Handsfree" />
      </div>
    </div>
  </div>
</div>

<blockquote class="verticle-middle-children space-children text-center">
  <strong>Powered by:</strong>
  <a href="https://github.com/jeeliz/jeelizWeboji"><img width=100 src="/branding/jeeliz.png"></a>
  <a href="https://github.com/tensorflow/tfjs-models/"><img src='/branding/tensorflow.png' height=30></a> <a href="https://ml5js.org/"><img src="/branding/ml5.png" height=30></a>
</blockquote>

## Available Models

Handsfree.js comes bundled with three computer vision models which can be combined and individually throttled to create dynamic User Experiences:

<table>
  <tr>
    <td style="width: 50%"><a href="/examples/face-pointer"><img src="https://media.giphy.com/media/Iv2aSMS0QTy2P5JNCX/source.gif"></a></td>
    <td>
      <div><strong><a href="/docs/face">Face Tracking</a> (through <a href="https://github.com/jeeliz/jeelizWeboji">Weboji</a>)</strong></div>
      <ul>
        <li>Detect 3D head position and rotation</li>
        <li>11 face morphs for eyes and mouth</li>
        <li>~1.4Mb filesize</li>
      </ul>
      <div><strong>Featured Example:</strong> <a href="/examples/face-pointer">Face Pointer Sandbox</a></div>
    </td>
  </tr>
  <tr>
    <td style="width: 50%"><a href="/examples/hand-gestures"><img src="https://media4.giphy.com/media/FxLUuTSxXjJPx8K9L4/giphy.gif"></a></td>
    <td>
      <div><strong><a href="/docs/hand">Hand Tracking</a> (through <a href="https://github.com/tensorflow/tfjs-models/tree/master/handpose">Handpose</a>)</strong></div>
      <ul>
        <li>Detect 3D position of palm and fingers</li>
        <li>Get vectors for where palm/fingers are pointed</li>
        <li>~2.9Mb filesize</li>
      </ul>
      <div><strong>Featured Example:</strong> <a href="/examples/hand-gestures">Hand Pointer Sandbox</a></div>
    </td>
  </tr>
  <tr>
    <td style="width: 50%"><a href="https://flappy-pose.glitch.me/"><img src="https://media1.giphy.com/media/gUHHKdnuOW4OGOXcrI/giphy.gif"></a></td>
    <td>
      <div><strong><a href="/docs/pose">Pose Estimation</a> (through <a href="https://github.com/tensorflow/tfjs-models/tree/master/posenet">PoseNet/ml5.js</a>)</strong></div>
      <ul>
        <li>Detect 2D keypoints for face, arms, and legs</li>
        <li>Detect many people at the same time</li>
        <li>~2.6Mb filesize</li>
      </ul>
      <div><strong>Featured Demo:</strong> <a href="https://flappy-pose.glitch.me/">Flappy Pose</a></div>
    </td>
  </tr>
</table>

## Installing

### Through CDN
```html
<head>
  <!-- Include Handsfree.js -->
  <link rel="stylesheet" href="https://unpkg.com/handsfree@7.2.12/build/lib/assets/handsfree.css" />
  <script src="https://unpkg.com/handsfree@7.2.12/build/lib/handsfree.js"></script>
</head>

<body>
  <!-- Instantiate and start it -->
  <script>
    const handsfree = new Handsfree({face: true})
    handsfree.start()
  </script>
</body>
```

### Through NPM

::: warning 💻 Extra steps required
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

## Example Workflow

The following aims to give you a quick overview of how things work. The key takeaway is that everything is centered around hooks/plugins, which are basically named callbacks which are run on every frame and can be toggled on and off.

```js
// Let's enable face tracking with the default Face Pointer
const handsfree = new Handsfree({face: true})

// Now let's start things up
handsfree.start()

// Let's create a plugin called "logger"
// - Plugins run on every frame and is how you "plug in" to the main loop
// - "this" context is the plugin itself. In this case, handsfree.plugin.logger
handsfree.use('logger', {face} => {
  console.log(face.morphs, face.rotation, face.pointer, face, this)
})

// Let's switch to hand tracking now. To demonstrate that you can do this live,
// let's create a plugin that switches to hand tracking when both eyebrows go up
handsfree.use('handTrackingSwitcher', {face} => {
  if (face.state.browsUp) {
    // Disable this plugin
    // Same as handsfree.plugin.handTrackingSwitcher.disable()
    this.disable()

    // Turn off face tracking and enable hand tracking
    handsfree.start({
      face: false,
      hand: true
    })
  }
})

// You can enable and disable any combination of models and plugins
handsfree.start({
  face: true,
  hand: true,
  pose: true,

  // This is also how you configure (or pre-configure) a bunch of plugins at once
  plugin: {
    fingerPointer: {enabled: false},
    faceScroll: {
      vertScroll: {
        scrollSpeed: 0.01
      }
    }
  }
})

// Plugins allow you to instantly switch out entire User Experiences
const page1 = ['facePointer', 'faceScroll']
const page2 = ['fingerPointer', 'handScroll']
handsfree.disablePlugins(page1)
handsfree.enablePlugins(page2)

// To work with models directly, use the .api property of the model itself (not the data)
handsfree.plugin.logger.onFrame = (data) => {
  console.log(handsfree.face?.api, handsfree.hand?.api, handsfree.pose?.api)
}
```