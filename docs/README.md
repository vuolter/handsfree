---
sidebarDepth: 1
meta:
  - name: description
    content: Add face, hand, and pose tracking to your projects, create handsfree user experiences, and tap into our growing library of plugins and integrations ✨👌
next: /guide/the-loop.html
---

<h1 class="mb-0"><img src="/branding/handsfree.png"></h1>
<h3 style="padding-top: 2em">Build handsfree User Experiences and add face, hand, and pose tracking to your projects in a snap 👌✨</h3>
<p class="verticle-middle-children space-children">
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/stars/midiblocks/handsfree?style=social"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/tag/handsfreejs/handsfree.svg"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/repo-size/handsfreejs/handsfree.svg"></a>
</p>

---

```js
// Enable Mediapipe's "Holistic" model (550+ landmarks for face, hands, pose)
const handsfree = new Handsfree({holistic: true})
// Enable plugins tagged with "browsing"
handsfree.enablePlugins('browsing')
// Start tracking
handsfree.start()
```

<div class="window">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://media4.giphy.com/media/FxLUuTSxXjJPx8K9L4/giphy.gif"></div>
      <div class="col-6">
        <h2>Run the above code!</h2>
        <ul>
          <li>🖐 Move pointer with your palm</li>
          <li>👌 Pinch your thumb and index to click</li>
          <li>✊ While making a fist, move hand to scroll page</li>
        </ul>
        <HandsfreeToggle class="block-children" text-off="Activate Handsfree mode" text-on="Stop Handsfree Mode" />
      </div>
    </div>
  </div>
</div>

<blockquote>
  <div class="verticle-middle-children space-children text-center">
    <strong>Powered by</strong>
    <a href="https://google.github.io/mediapipe/solutions/holistic"><img src='/branding/tensorflow.png' height=30></a>
    <a href="https://github.com/jeeliz/jeelizWeboji"><img src='/branding/jeeliz.png' height=30></a>
  </div>
  <hr style="margin: 20px auto">
  <div class="text-center">
    <p><a href="https://github.com/sponsors/midiblocks">Become a sponsor 💜</a></p>
  </div>
  <hr style="margin: 20px auto">
  <div class="text-center">
    <strong>Special thanks to:</strong> <a href="https://studioforcreativeinquiry.org/">The STUDIO for Creative Inquiry</a>, <a href="https://glitch.com">Glitch.com</a>, <a href="https://research.google/teams/brain/pair/">Google PAIR</a>, and you!
  </div>
</blockquote>

## Installing from CDN

```html
<head>
  <!-- Include Handsfree.js -->
  <link rel="stylesheet" href="https://unpkg.com/handsfree@8.0.0/build/lib/assets/handsfree.css" />
  <script src="https://unpkg.com/handsfree@8.0.0/build/lib/handsfree.js"></script>
</head>

<body>
  <!-- Instantiate and start it -->
  <script>
    const handsfree = new Handsfree({holistic: true})
    handsfree.enablePlugins('browsing')
    handsfree.start()
  </script>
</body>
```

## Installing from NPM

### 1) Install and move assets into your public folder
```bash
# Add handsfree to your project
npm install handsfree

# Move the models into your project's public directory
# - change PUBLIC below to where you keep your project's assets

# ON WINDOWS
move node_modules/handsfree/build/lib/assets PUBLIC
# EVERYWHERE ELSE
mv node_modules/handsfree/build/lib/assets PUBLIC
```

### 2) Tell Handsfree where to look for the models
```js
import Handsfree from 'handsfree'

const handsfree = new Handsfree({
  holistic: true,
  // Set this to your where you moved the models into
  assetsPath: '/PUBLIC/assets',
})
handsfree.enablePlugins('browsing')
handsfree.start()
```

## Models
<ModelList />

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
  console.log(data.morphs, data.rotation, data.pointer, data, this)
})

// Let's switch to hand tracking now. To demonstrate that you can do this live,
// let's create a plugin that switches to hand tracking when both eyebrows go up
handsfree.use('handTrackingSwitcher', data => {
  if (data.state.browsUp) {
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