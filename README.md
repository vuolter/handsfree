<div align="center">
  <p><a href="https://handsfree.js.org"><img src="https://i.imgur.com/WbfpozB.jpg" alt="handsfree.js.org" title="handsfree.js.org"></a></p>
  <p>Build handsfree User Experiences and add face, hand, and/or pose tracking to your projects in a snap 👌✨</p>
  <p>
    <img class="mr-1" src="https://img.shields.io/github/release-pre/handsfreejs/handsfree.svg"> <img class="mr-1" src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg">
    <img src="https://img.shields.io/github/repo-size/handsfreejs/handsfree.svg">
  </p>
  <p>
    <img class="mr-1" src="https://img.shields.io/github/issues-raw/handsfreejs/handsfree.svg"> <img src="https://img.shields.io/github/issues-pr-raw/handsfreejs/handsfree.svg">
  </p>
  <p>Powered by:</p>
  <p><a href="https://github.com/jeeliz/jeelizWeboji"><img width=100 src="https://jeeliz.com/wp-content/uploads/2018/01/LOGO_JEELIZ_BLUE.png"></a> &nbsp;&nbsp;&nbsp; <a href="https://ml5js.org/"><img src="https://i.imgur.com/rgguSyv.png" height=30></a> &nbsp;&nbsp;&nbsp; 
  <a href="https://github.com/tensorflow/tfjs-models/"><img src='https://i.imgur.com/Z5PUig3.png' height=30></a>
</div>

<br>
<br>
<br>
<hr>
<br>
<br>
<br>

<div align="center">
  <h2>Explore the interactive docs at: <a href="https://handsfree.js.org">Handsfree.js.org</a></h2>
</div>

<br>
<br>
<br>
<hr>
<br>
<br>
<br>

## Face Tracking Examples
<table>
  <tr>
    <td>
      <p><strong>Face Pointers</strong></p>
      <p><img src="https://media4.giphy.com/media/Iv2aSMS0QTy2P5JNCX/giphy.gif"></p>
    </td>
    <td>
      <p><strong>Motion Parallax Display</strong></p>
      <p><img src="https://media4.giphy.com/media/8sCpFH9JCws8iWsaoj/giphy.gif"></p>
    </td>
  </tr>
  <tr>
    <td>
      <p><strong>Puppeteering Industrial Robots</strong></p>
      <p><img src="https://media4.giphy.com/media/1XE2rnMPk6BFu8VQRr/giphy.gif"></p>
    </td>
    <td>
      <p><strong>Playing desktop games with face clicks</strong></p>
      <p><img src="https://media4.giphy.com/media/YATR9GZSSHKeNw3fht/giphy.gif"></p>
    </td>
  </tr>
</table>

<br>
<hr>
<br>

## Hand Tracking Examples
<table>
  <tr>
    <td>
      <p><strong>Hand Pointers</strong></p>
      <p><img src="https://media4.giphy.com/media/FxLUuTSxXjJPx8K9L4/giphy.gif"></p>
    </td>
    <td>
      <p><strong>Use with Three.js</strong></p>
      <p><img src="https://media4.giphy.com/media/brC1Ow2v62htVmpfLh/giphy.gif"></p>
    </td>
  </tr>
  <tr>
    <td>
      <p><strong>Playing desktop games with pinch clicks</strong></p>
      <p><img src="https://media4.giphy.com/media/pdDOkUpnRbzMk8r0L4/giphy.gif"></p>
    </td>
    <td>
      <p><strong>Laser pointers but with your finger</strong></p>
      <p><img src="https://media4.giphy.com/media/2vcbWI2ZAPeGvJVpII/giphy.gif"></p>
    </td>
  </tr>
</table>

<br>
<hr>
<br>

## Pose Estimation Examples
<table>
  <tr>
    <td>
      <p><strong>Flappy Pose - Flappy Bird but where you have to flap your arms</strong></p>
      <p><img src="https://media4.giphy.com/media/hwNj7nfkDljmlnaNRA/giphy.gif"></p>
    </td>
    <td></td>
  </tr>
</table>

<br>
<br>
<br>
<hr>
<br>
<br>
<br>

# Quickstart

## Through CDN
```html
<head>
  <!-- Include Handsfree.js -->
  <link rel="stylesheet" href="https://unpkg.com/handsfree@7.2.15/build/lib/assets/handsfree.css" />
  <script src="https://unpkg.com/handsfree@7.2.15/build/lib/handsfree.js"></script>
</head>

<body>
  <!-- Instantiate and start it -->
  <script>
    const handsfree = new Handsfree({face: true})
    handsfree.start()
  </script>
</body>
```

## Through NPM

> 🚨 Extra steps required 🚨
>
> In order to keep startup times snappy some dependencies must be loaded at runtime:
>
> - Install with: `npm i handsfree`
> - Copy `node_modules/handsfree/build/lib/assets` folder into your projects public folder
> - When instantiating `Handsfree` set the `assetsPath` option to where you moved the assets into

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

<br>
<br>
<br>
<hr>
<br>
<br>
<br>

# Local Development

## Running Handsfree.js.org locally

- Install [NodeJS](https://nodejs.org/en/download/)
- Download this repository: `git clone https://github.com/handsfreejs/handsfree`
- Install dependencies by running `npm i` from the project root
- Start development on `localhost:8080` by running `npm start`


## Command line scripts
```bash
# Start local development on localhost:8080
npm start 

# Build into /dist/lib/ and /dist/docs/
npm run build

# Build only /dist/docs/
npm run build:docs

# Build only /dist/lib/
npm run build:lib
```

## Dev Notes
- See [vuepress-component-font-awesome](https://github.com/HiYue/vuepress-component-font-awesome#generate-specified-icons-only) for adding fonts. Remember to run `npm run fa:build` when adding new fonts so that they are copied over into the `docs/.vuepress/components/FA`  folder
- You may occasionally need to restart server when adding new files to the `/docs`, this is true when changing `/docs/.vuepress.config.js` as well

<br>
<br>
<br>
<hr>
<br>
<br>
<br>

<div align="center">
  <h2>Explore the interactive docs at: <a href="https://handsfree.js.org">Handsfree.js.org</a></h2>
</div>

<br>
<br>
<br>
<hr>
<br>
<br>
<br>

# License & Attributions

## License: Apache 2.0 and...

The Handsfree.js core is available for free and commercial use under [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html). However, to use the models and plugins included with Handsfree.js you'll also have to follow their licenses (❓ feel free to start an issue about this):

- [Jeeliz Weboji](https://github.com/jeeliz/jeelizWeboji) (Apache 2.0) - Used for face and head tracking
- [ml5.js](https://github.com/ml5js/ml5-library) (MIT) - Currently used for pose estimation (PoseNet)
- [TensorFlow.js](https://github.com/tensorflow/tfjs-models) (Apache 2.0) - PoseNet and Handpose

## Attributions
I'd like to also thank the following people and projects:
- [98.css by @jdan](https://github.com/jdan/98.css) (MIT) - Used as boilerplate for documentation theme
- [Handpose Three.js boilerplate by @LingDong-](https://github.com/LingDong-/handpose-facemesh-demos) - Boilerplate for rendering Handpose in 3D space

<br>
<br>
<br>

---

<br>
<br>
<br>

# Special Thanks

- [@Golan](https://twitter.com/golan) and the [The STUDIO for Creative Inquiry](http://studioforcreativeinquiry.org/) for hosting me for a residency during 2019 and for helping me approach projects in a more expressive way. Also for inviting me back for a multi-month residency in Spring 2021!!!
- [@AnilDash](https://twitter.com/anildash) for supporting the project during Winter 2018 out of the blue and the opportunities to share my project on [Glitch.com](https://glitch.com/@ozramos)
- [The School of AI](https://twitter.com/SchoolOfAIOffic) for the [2018 Fellowship](https://www.youtube.com/watch?v=CJDpF4xUieY&t=58) in support of this project
- [@jessscon](https://twitter.com/jessscon) and [Google PAIR](https://research.google/teams/brain/pair/) for the very early support that made starting this project possible
- Everyone who's supported me on [Patreon](https://patreon.com/midiblocks), GoFundMe, and through [Twitter](https://twitter.com/midiblocks) over the years
