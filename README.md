<div align="center">
  <p>~ Presenting ~</p>
  <p>with support from <a href="https://glitch.com/@handsfreejs">Glitch.com</a>, the <a href="https://www.cmu.edu/cfa/studio/index.html">STUDIO at CMU</a>, the <a href="https://youtu.be/CJDpF4xUieY?t=58">School of AI</a> and you!</p>
  <br>
  <p><img src="https://media.giphy.com/media/3Z15Ve7WEQGkLa1FwC/giphy.gif" alt="handsfree.js"></p>
  <br>
  <h1>Handsfree.js</h1>
  <p>A wrapper library around web-based computer vision models for the purpose of interacting with the web handsfree</p>
  <p>
    <img class="mr-1" src="https://img.shields.io/github/release-pre/handsfreejs/handsfree.svg"> <img class="mr-1" src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg">
    <img src="https://img.shields.io/github/repo-size/handsfreejs/handsfree.svg">
  </p>
  <p>
    <img class="mr-1" src="https://img.shields.io/github/issues-raw/handsfreejs/handsfree.svg"> <img src="https://img.shields.io/github/issues-pr-raw/handsfreejs/handsfree.svg">
  </p>
  <p>Powered by <a href="https://github.com/jeeliz/jeelizWeboji">Jeeliz Weboji</a></p>
</div>

# Quickstart

```html
<!DOCTYPE html>
<head>
  <!-- Require dependencies -->
  <link rel="stylesheet" href="https://unpkg.com/handsfree@5.0.0/dist/handsfreejs/handsfree.css">
  <script src="https://unpkg.com/handsfree@5.0.0/dist/handsfreejs/handsfree.js">
</head>
<body>
  <script>
    // Create a new instance. Use one instance for each camera
    const handsfree = new Handsfree({})

    // Create a simple plugin that displays pointer values on every frame
    Handsfree.use('consoleLogger', (pointer, context) => {
      console.log(pointer)
    })

    // Start tracking
    handsfree.start()
  </script>
</body>
```

# Usage

Start by including Handsfree.js and it's stylesheet:

```html
<!-- Include with HTML -->
<link rel="stylesheet" href="https://unpkg.com/handsfree@5.0.0/dist/handsfreejs/handsfree.css">
<script src="https://unpkg.com/handsfree@5.0.0/dist/handsfreejs/handsfree.js">
```

```js
// Or include with JavaScript
import 'handsfree'
```

In both cases, you'll get a `window.Handsfree` which you'll then use to configure an instance with `const handsfree = new Handsfree(config)`. One instance will need to be created for each camera that you'd like to enable, but note that each instance can track multiple users.

> From here on out, we'll refer to uppercase `Handsfree` as the class object and lowercase `handsfree` as an instance of that object

## Config

```js
let config = {
  // Whether Handsfree should automatically start after instantiation
  autostart: false,

  debugger: {
    // Where to inject the debugger into
    target: document.body
  },

  sensitivity: {
    // A factor to adjust the cursors move speed by
    xy: 0.7,
    // How much wider (+) or narrower (-) a smile needs to be to click
    click: 0
  },

  stabilizer: {
    // How much stabilization to use: 0 = none, 3 = heavy
    factor: 1,
    // Number of frames to stabilizer over
    buffer: 30
  },

  // Configs specific to plugins
  plugin: {
    click: {
      // Morphs to watch for and their required confidences
      morphs: {
        0: 0.5,
        1: 0.5
      }
    },

    vertScroll: {
      // The multiplier to scroll by. Lower numbers are slower
      scrollSpeed: 0.15,
      // How many pixels from the the edge to scroll
      scrollZone: 100
    }
  }
}

const handsfree = new Handsfree(config)
```

## Methods

```js
// Start tracking
handsfree.start()

// Stop tracking
handsfree.stop()

// Emit an event to be listened to with handsfree.on
handsfree.emit(eventName, ...args)

// A callback to call when handsfree.emit(eventName) is called
handsfree.on(eventName, cb)
```

## Properties

The following properties are available:

```js
handsfree.pointer = {
  // The inferred pointer position
  x: 0,
  y: 0,
  // The pointer DIV element
  $el: null,
  // The pointer state ('mouseDown', 'mouseDrag', 'mouseUp', '')
  state: ''
}

// The original config object passed during instantiation
handsfree._config
// The cleaned config object with their defaults
handsfree.config

// Number of instances
Handsfree.numInstances = 0
// Instance id (the first instance is 1, the second is 2, and so on)
handsfree.id

// document.currentScript as run from inside Handsfree (used for calling dependencies)
Handsfree.libSrc

// Contains the JEELIZ tracker library once it's been injected
handsfree.trackerSDK = null

// Whether we're tracking or not
handsfree.isStarted = false

// Contains a collection of callbacks to call on every frame
handsfree.plugins = []
```

## Morphs

The following morph values are available on `handsfree.head.morphs`

```
0: smileRight → closed mouth smile right
1: smileLeft → closed mouth smile left
2: eyeBrowLeftDown → eyebrow left frowned
3: eyeBrowRightDown → eyebrow right frowned
4: eyeBrowLeftUp → eyebrow left up (surprised)
5: eyeBrowRightUp → eyebrow right up (surprised)
6: mouthOpen → mouth open
7: mouthRound → mouth round
8: eyeRightClose → close right eye
9: eyeLeftClose → close left eye
10: mouthNasty → mouth nasty (upper lip raised)
```

---

# Adding Functionality

Using `Handsfree.use(name, callback)` adds a `callback` to be called on every inference loop for every instance. We call these plugins. The plugin recieves `(pointer, handsfree)` - `pointer` is the pointers current `(x,y)` and `handsfree` is the Handsfree instance (use `handsfree.head` to get that instances head pose data, for example). Here's a basic example of scrolling the page:

```js
Handsfree.use('verticalScroll', (pointer, handsfree) => {
  if (pointer.y < 100) window.scrollTo(0, window.scrollY + pointer.y)
  if (pointer.y > window.innerHeight)
    window.scrollTo(0, window.scrollY + (pointer.y - window.innerHeight))
})
```

Using `Handsfree.use()` with the same plugin name overwrites the existing one.

## Events

The following `handsfree.emit` are called:

```js
// Called when dependencies are ready and the handsfree.start() is runnable
handsfree.on('dependenciesReady')

// Called when .start()
handsfree.on('started')
```

To listen to these events without the `handsfree` instance, use the `document` instead by prefacing the events with `handsfree-`:

```js
document.addEventListener(`handsfree-dependenciesReady`, callback)
document.addEventListener(`handsfree-started`, callback)
document.addEventListener(`handsfree-${eventName}`, callback)
```

## Classes

The following classes are added to the `<body>` to help make styling your app easier:

```css
/* Added while handsfree is loading dependencies */
.handsfree-loading

/* Added when handsfree is tracking */
.handsfree-started
```

The following are some helpers you can add to your elements:

```css
/* Hidden while loading */
.handsfree-hide-when-loading

/* Show while loading */
.handsfree-show-when-loading
```

# Local Development

This project contains the Handsfree.js library (see `/src/handsfree`) and a development environment with sample code and demos. To run these, you'll need [NodeJS](https://nodejs.org/en/download/) and the [Yarn package manager](https://yarnpkg.com/en/docs/install#windows-stable).

After downloading this project repo, you'll then need to install dependencies by running `yarn` in the project's root directory. Then you'll have the following commands available:

```bash
# Start a local dev environment on localhost:8080
yarn start

# Build for production into /dist/sandbox/
yarn build

# Deploy to handsfree.js.org
yarn deploy

# Create handsfree.js in /dist/handsfreejs/
yarn bundle
```

## Deploy Script

Running `yarn deploy` will commit everything inside of `/dist` to the `gh-pages` branch of the repository set in `package.json:deploy.repo` using the `package.json:deploy.url` custom domain. This lets you quickly deploy this repository to GitHub Pages!

## Creating the handsfree.js library

When you run `yarn start`, `yarn build`, or `yarn deploy` what you're actually doing is running or building the development environment. To create a single `handsfree.js` script for use within your own projects, do the following:

- Install [Parcel](https://parceljs.org/) on your system globally with: `yarn global add parcel-bundler`
- Run `npm bundle`
- The files will be built into `/dist/handsfree/`

# License & Attributions

Handsfree.js is available for free and commercial use under [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).

## Models

- [Jeeliz Weboji](https://github.com/jeeliz/jeelizWeboji) (Apache License 2.0) - Face and head pose estimation

## Attributions

- Fireworks code adapted from [Julian Garnier's Anime Fireworks CodePen](https://codepen.io/juliangarnier/pen/gmOwJX)
