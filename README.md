<div align="center">
  <p><img src="https://media.giphy.com/media/3Z15Ve7WEQGkLa1FwC/giphy.gif" alt="handsfree.js"></p>
  <br>
  <h1>Handsfree.js</h1>
  <p>A wrapper library around computer vision models for working with face pointers, assistive tech, and creative expression 👋</p>
  <p>
    <img class="mr-1" src="https://img.shields.io/github/release-pre/handsfreejs/handsfree.svg"> <img class="mr-1" src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg">
    <img src="https://img.shields.io/github/repo-size/handsfreejs/handsfree.svg">
  </p>
  <p>
    <img class="mr-1" src="https://img.shields.io/github/issues-raw/handsfreejs/handsfree.svg"> <img src="https://img.shields.io/github/issues-pr-raw/handsfreejs/handsfree.svg">
  </p>
  <p>Powered by:</p>
  <p><a href="https://github.com/jeeliz/jeelizWeboji"><img width=100 src="https://jeeliz.com/wp-content/uploads/2018/01/LOGO_JEELIZ_BLUE.png"></a> &nbsp;&nbsp;&nbsp; <a href="https://ml5js.org/"><img src="https://i.imgur.com/rgguSyv.png" height=30></a> &nbsp;&nbsp;&nbsp; 
  <a href="https://github.com/tensorflow/tfjs-models/"><img src='https://i.imgur.com/KqlnNuA.png' height=30></a>
  <blockquote><br>with support from the <a href="https://www.cmu.edu/cfa/studio/index.html">Studio for Creative Inquiry at CMU</a>, <a href="https://glitch.com/@handsfreejs">Glitch.com</a>, the <a href="https://youtu.be/CJDpF4xUieY?t=58">School of AI</a> and you!<br><br></blockquote>
</div>

<br>
<br>
<br>

# HTML Quickstart

For more code examples, check out the `/demo/` folder or try them out on Glitch:
- [Glitch Sourcecode](https://glitch.com/edit/#!/handsfree-minimal-examples?path=README.md)
- [Glitch live demo](https://handsfree-minimal-examples.glitch.me/)

```html
<!-- Require dependencies, which adds Handsfree to global namespace -->
<link
  rel="stylesheet"
  href="https://unpkg.com/handsfree@7.0.9/dist/assets/handsfree.css" />
<script src="https://unpkg.com/handsfree@7.0.9/dist/handsfree.js"></script>

<!-- Instantiate Handsfree.js -->
<script>
  // Create a new instance. Use one instance for each camera
  const handsfree = new Handsfree({ weboji: true })

  // Create a plugin that logs head rotation
  handsfree.use('consoleLogger', ({ weboji }) => {
    if (weboji.pointer.state === 'mousedown') {
      console.log(`Clicked at: (${weboji.pointer.x}, ${weboji.pointer.y})`)
      console.log('Clicked on:', weboji.pointer.$target)
    }
  })
</script>

<!-- Start webcam on user input -->
<button onclick="handsfree.start()">Start Webcam</button>
```

# NPM Quickstart

> 🚨 This will be improved soon!

I switched over from Parcel to Rollup for package management and am still new to it. For now, a little extra setup is needed when installing through npm:

- Install with: `npm i handsfree`
- Copy this project's `/public/assets` folder into your own projects public folder (this makes the computer vision models accessible to your app)
- When instantiating `Handsfree`, set the `assetsPath` property to where you moved the assets into:

```js
import Handsfree from 'handsfree'
const handsfree = new Handsfree({
  weboji: true,
  assetsPath: '/public/assets/'
})
```

<br>
<br>
<br>

---

# Getting Started

## Instantiating

Once you've included Handsfree.js into your project you'll have a global `Handsfree` class in the `window`'s scope. You'll want to create one instance for every webcam you intend to use, along with some configs.

```js
// Instantiate with the weboji face tracker with defaults
let handsfree = new Handsfree({weboji: true})

// ...or...

// Instantiate and configure the face tracker
// - The following are all defaults (feel free to skip some)
handsfree = new Handsfree({
  // Where the files are
  assetsPath: document.currentScript.getAttribute('src') + '/assets/',

  /**
   * Used to show the webcam feed along with basic debug info
   */
  feedback: {
    enabled: false,
    
    // Where to inject the feedback canvas
    $target: document.body
  },

  /**
   * Face tracker
   */
  weboji: {
    // All models are disabled by default!
    enabled: false,
    
    // How many milliseconds to wait between detections
    // - Use to help improve UI performance on slower devices
    throttle: 0,
    
    // Represents the calibrator settings
    // - Minimal CSS styles are provided
    calibrator: {
      // The target element to act as the calibrator wrapping div
      // - automatically created if null
      target: null,
      
      // The message to display over the marker, can be HTML
      instructions: 'Point head towards center of circle below',

      // The target element to act as the calibrator target (should be inside target)
      // - optional if .target === null, otherwise required
      marker: null
    },

    // The confidence (between 0 and 1) required for various face morphs before
    // they are considered activated
    morphs: {
      threshold: {
        smileRight: 0.7,
        smileLeft: 0.7,
        browLeftDown: 0.8,
        browRightDown: 0.8,
        browLeftUp: 0.8,
        browRightUp: 0.8,
        eyeLeftClosed: 0.4,
        eyeRightClosed: 0.4,
        mouthOpen: 0.3,
        mouthRound: 0.8,
        upperLip: 0.5
      }
    }
  }
})
```

Once you've instantiated `Handsfree` you can start and stop it with:

```js
handsfree = new Handsfree({weboji: true})
handsfree.start()

// Currently this just reloads the page
handsfree.stop()
```

## Adding Functionality

By default, the `weboji` face tracker comes bundled with a set of plugins. Plugins add functionality that can be toggled on/off, which is useful when working on complex applications that require different gestures for different views. Plugins can also be overwritten.

Plugins are added with the `handsfree.use('myPlugin', opts)`:

```js
handsfree = new Handsfree({weboji: true})

handsfree.use('myPlugin', {
  // All plugins are true by default
  enabled: true,

  // A set of config values that can be overwritten
  config: {},

  // Called on every single webcam frame
  onFrame (data) {},

  // Called immediate after this plugin is added
  onUse (handsfree) {},

  // Called when the plugin is enabled from a disabled state
  // eg, after calling: handsfree.plugin.myPlugin.enable()
  onEnable (handsfree) {},

  // Called when the plugin is disabled from an enabled state
  // eg, after calling: handsfree.plugin.myPlugin.disable()
  onDisable (handsfree) {}
})
```

You can also pass a function as the second argument, which is assigned to the `.onFrame` callback:

```js
// This...
handsfree.use('myPlugin', data => {
  console.log(data.weboji.data.morphs)
})

// ...is similar to this
handsfree.use('myPlugin', {
  onFrame: data => {
    console.log(data.weboji.data.morphs)
  }
})
```

The `onFrame` method, which is called on every webcam frame, receives a `data` object containing data for each active model...`data.weboji` for Face Tracking and `data.posenet` for Pose Estimation. If you're only using one model, then it's usually easier to destructure:

```js
// This
handsfree.use('myPlugin', {weboji} => {
  console.log(weboji.data)
})

// Instead of this
handsfree.use('myPlugin', data => {
  console.log(data.weboji.data)
})
```

See `/src/demo` and `/src/handsfree/plugins` for examples (simpler ones will be made soon)!

## Removing Functionality

You can disable all the pre-packaged plugins with `handsfree.disablePlugins()` or by passing a list of plugin names to disable with `handsfree.disablePlugins(['pluginName'])` or just a string with `handsfree.disablePlugins('pluginName')`.

You can also just delete the plugin with `delete handsfree.plugin['pluginName']`

<br>
<br>
<br>

---

<br>
<br>
<br>

## Weboji - Face Tracker

Each of the following can be accessed either through `handsfree.weboji.data` outside of a plugin, or through `data.weboji.data` when inside `onFrame`.

### Properties

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
handsfree.weboji.data.morphs

/**
 * {Array} Head rotation [pitch, yaw, roll]
 * - in radians where [0, 0, 0] is the head pointed directly at camera
 */
handsfree.weboji.data.rotation

/**
 * {Array} Head translation [x, y, s]
 * - These are each between 0 and 1
 * - Scale refers to the size of the head in relation to the webcam frame
 */
handsfree.weboji.data.translation

/**
 * {Object} Where on the screen the head is pointed at {x, y}
 * - This is updated by: handsfree.plugin.facePointer
 */
handsfree.weboji.data.pointer

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
handsfree.weboji.data.state
```

### Methods

Please see the [Weboji Docs](https://github.com/jeeliz/jeelizWeboji/blob/master/doc/jeefacetransferAPI.pdf) to see available methods exposed through `handsfree.weboji.api`:

```js
// Check if the head is detected or not
handsfree.weboji.api.is_detected()
```

## PoseNet - Pose Estimation

> 🚨 Please note: The PoseNet integration will be overhauled soon. It's not recommended to use it in production in it's current state

### Properties

Each of the following can be accessed either through `handsfree.posenet.data` outside of a plugin, or through `data.posenet.data` when inside onFrame.

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

### Methods

The [PoseNet API](https://github.com/tensorflow/tfjs-models/tree/master/posenet) is available through `handsfree.posenet.api`.

## Toggling the plugin on/off

You can use the `.disable` and `.enable` methods of a plugin to toggle them on/off. If a plugin has a `.onDisable` or `.onEnable` then the corresponding method will be called.

```js
handsfree.use('myPlugin', {
  onEnable () {console.log('enabled 😀')},
  onDisable () {console.log('disabled 😞')}
})

handsfree.plugin.myPlugin.enable()
// console: enabled 😀

handsfree.plugin.myPlugin.disable()
// console: disabled 😞
```

<br>
<br>
<br>

---

<br>
<br>
<br>

# Core Plugins

> Documentation on the plugins that come with Handsfree.js will be available soon

<br>
<br>
<br>

---

<br>
<br>
<br>

# Local Development

## Local dev server

- Install [NodeJS](https://nodejs.org/en/download/)
- Download this repository
  - If you have [Git](https://git-scm.com/), run: `git clone https://github.com/handsfreejs/handsfree`
  - If you don't have Git, [download the latest zip](https://github.com/midiblocks/handsfree/archive/master.zip)
- Install dependencies by running `npm i` from the project root
- Start development on `localhost:8080` by running `npm start`


---

<br>
<br>
<br>

# License & Attributions

Handsfree.js is available for free and commercial use under [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).

## Models

- [Jeeliz Weboji](https://github.com/jeeliz/jeelizWeboji) (Apache License 2.0) - Face and head pose estimation

## Art

- [Monkey logo adaption](https://www.designevo.com/apps/logo/?name=cute-monkey-and-interesting-gaming)

<br>
<br>
<br>

---

<br>
<br>
<br>

# Special Thanks

- [@Golan](https://twitter.com/golan) and the [The STUDIO for Creative Inquiry](http://studioforcreativeinquiry.org/) for hosting me for a residency during 2019 and for helping me approach projects in a more expressive way
- [@AnilDash](https://twitter.com/anildash) for supporting the project during Winter 2018 out of the blue and the opportunities to share my project on [Glitch.com](https://glitch.com/@ozramos)
- [The School of AI](https://twitter.com/SchoolOfAIOffic) for the [2018 Fellowship](https://www.youtube.com/watch?v=CJDpF4xUieY&t=58) in support of this project
- [@jessscon](https://twitter.com/jessscon) and [Google PAIR](https://research.google/teams/brain/pair/) for the very early support that made starting this project possible
- Everyone who's supported me on [Patreon](https://patreon.com/midiblocks), GoFundMe, and through [Twitter](https://twitter.com/midiblocks) over the years
