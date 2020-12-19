<div align="center">
  <p><a href="https://handsfree.js.org"><img src="https://media1.giphy.com/media/TTeLMReRXakENiBRHx/giphy.gif" alt="handsfree.js.org" title="handsfree.js.org"></a></p>
  <p>Build handsfree User Experiences and add face, hand, and pose tracking to your projects in a snap 👌✨</p>
  <p>
    <img class="mr-1" src="https://img.shields.io/github/tag/handsfreejs/handsfree.svg"> <img class="mr-1" src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg">
    <img src="https://img.shields.io/github/repo-size/handsfreejs/handsfree.svg">
  </p>
  <p>
    <img class="mr-1" src="https://img.shields.io/github/issues-raw/handsfreejs/handsfree.svg"> <img src="https://img.shields.io/github/issues-pr-raw/handsfreejs/handsfree.svg">
  </p>
  <p>Powered by:</p>
  <p>
    <a href="https://mediapipe.dev"><img src="https://i.imgur.com/VGSWYrC.png" height=30></a>
    &nbsp;&nbsp;&nbsp;
    <a href="https://github.com/tensorflow/tfjs-models/"><img src='https://i.imgur.com/Z5PUig3.png' height=30></a>
    &nbsp;&nbsp;&nbsp; 
    <a href="https://github.com/jeeliz/jeelizWeboji"><img width=100 src="https://jeeliz.com/wp-content/uploads/2018/01/LOGO_JEELIZ_BLUE.png"></a>
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
## Installing from CDN

```html
<head>
  <!-- Include Handsfree.js -->
  <link rel="stylesheet" href="https://unpkg.com/handsfree@8.0.2/build/lib/assets/handsfree.css" />
  <script src="https://unpkg.com/handsfree@8.0.2/build/lib/handsfree.js"></script>
</head>

<body>
  <!-- Instantiate and start it -->
  <script>
    const handsfree = new Handsfree({hands: true})
    handsfree.enablePlugins('browsing')
    handsfree.start()
  </script>
</body>
```

## Installing from NPM

```bash 
# From your projects root
npm i handsfree
```

```js
// Inside your app
import Handsfree from 'handsfree'

const handsfree = new Handsfree({hands: true})
handsfree.enablePlugins('browsing')
handsfree.start()
```

### Hosting the models yourself

The above will load models, some over 10Mb, from the [Unpkg CDN](https://unpkg.com/browse/handsfree@8.0.2/build/lib/assets). If you'd rather host these yourself (for example, to use offline) then you can eject the models from the npm package into your project's public folder:

```bash
# Move the models into your project's public directory
# - change PUBLIC below to where you keep your project's assets

# ON WINDOWS
move node_modules/handsfree/build/lib/assets PUBLIC
# EVERYWHERE ELSE
mv node_modules/handsfree/build/lib/assets PUBLIC
```

```js
import Handsfree from 'handsfree'

const handsfree = new Handsfree({
  hands: true,
  // Set this to your where you moved the models into
  assetsPath: '/PUBLIC/assets',
})
handsfree.enablePlugins('browsing')
handsfree.start()
```

## Example Workflow

The following aims to give you a quick overview of how things work. The key takeaway is that everything is centered around hooks/plugins, which are basically named callbacks which are run on every frame and can be toggled on and off.

## Quickstart Workflow

The following workflow demonstrates how to use all features of Handsfree.js. Check out the [Guides](/guides/) and [References](/ref/) to dive deeper, and feel free to post on the [Google Groups](https://groups.google.com/g/handsfreejs) or [Discord](https://discord.gg/TDJEaTp7) if you get stuck!

```js
// Let's enable face tracking with the default Face Pointer
const handsfree = new Handsfree({weboji: true})
handsfree.enablePlugins('browsing')

// Now let's start things up
handsfree.start()

// Let's create a plugin called "logger"
// - Plugins run on every frame and is how you "plug in" to the main loop
// - "this" context is the plugin itself. In this case, handsfree.plugin.logger
handsfree.use('logger', data => {
  console.log(data.weboji.morphs, data.weboji.rotation, data.weboji.pointer, data, this)
})

// Let's switch to hand tracking now. To demonstrate that you can do this live,
// let's create a plugin that switches to hand tracking when both eyebrows go up
handsfree.use('handTrackingSwitcher', {weboji} => {
  if (weboji.state.browsUp) {
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
handsfree.update({
  // Disable weboji which is currently running
  weboji: false,
  // Start the holistic model
  holistic: true,

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

// Disable all plugins
handsfree.disablePlugins()
// Enable only the plugins for making music (not actually implemented yet)
handsfree.enablePlugins('music')

// Overwrite our logger to display the original model APIs
handsfree.plugin.logger.onFrame = (data) => {
  console.log(handsfree.model.holistic?.api, handsfree.model.weboji?.api, handsfree.model.pose?.api)
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

## License: Apache 2.0

The Handsfree.js core is available for free and commercial use under [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html). Each of the models are also available for free and commercial use under Apache 2.0:

- [Jeeliz Weboji](https://github.com/jeeliz/jeelizWeboji) (Apache 2.0)
- [MediaPipe Models](https://google.github.io/mediapipe/solutions/solutions) (Apache 2.0)
- [TensorFlow.js](https://github.com/tensorflow/tfjs-models) (Apache 2.0)

## Attributions
I'd like to also thank the following people and projects:
- [98.css by @jdan](https://github.com/jdan/98.css) (MIT) - Used as boilerplate for documentation theme

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
