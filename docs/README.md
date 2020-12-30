---
sidebarDepth: 1
meta:
  - name: description
    content: Add face, hand, and pose tracking to your projects, create handsfree user experiences, and tap into our growing library of plugins and integrations ✨👌
next: /guide/
---

<div id="hero-video" style="position: relative">
  <h1 class="mb-0"><img alt="Handsfree.js" title="Handsfree.js" src="/branding/handsfree.png"></h1>
  <video muted loop autoplay src="/model-wall.mp4" style="width: 100%"></video>
</div>

<h3 style="padding-top: 2em">Build handsfree User Experiences and add face, hand, and pose tracking to your projects in a snap ✨👌</h3>
<p class="verticle-middle-children space-children text-center">
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/stars/midiblocks/handsfree?style=social"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/tag/handsfreejs/handsfree.svg"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/repo-size/handsfreejs/handsfree.svg"></a>
</p>

---

```js
// Enable Mediapipe's "Hands" model
const handsfree = new Handsfree({hands: true})
// Enable plugins tagged with "browsing"
handsfree.enablePlugins('browsing')
// Start tracking
handsfree.start()
```

<div class="window">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://media4.giphy.com/media/tQ1vFtoMWWpgdCoJJj/giphy.gif"></div>
      <div class="col-6">
        <h2>Run the above code!</h2>
        <ul>
          <li>👌 Pinch your thumb and index to grab the page</li>
          <li>↕ While pinched, move hand up and down to scroll page</li>
        </ul>
        <HandsfreeToggle class="full-width handsfree-hide-when-started-without-hands" text-off="Scroll page with hands" text-on="Stop Hands" :opts="demoOpts" />
        <button class="handsfree-show-when-started-without-hands handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
        <button class="handsfree-show-when-started-without-hands handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Scroll page with hands</button>
      </div>
    </div>
  </div>
</div>

<blockquote>
  <div class="verticle-middle-children space-children text-center">
    <strong>Powered by</strong>
    <a href="https://www.tensorflow.org/js/"><img src='/branding/tensorflow.png' height=30></a>
    <a href="https://mediapipe.dev/"><img src='/branding/mediapipe.png' height=30></a>
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
  <link rel="stylesheet" href="https://unpkg.com/handsfree@8.0.10/build/lib/assets/handsfree.css" />
  <script src="https://unpkg.com/handsfree@8.0.10/build/lib/handsfree.js"></script>
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

The above will load models, some over 10Mb, from the [Unpkg CDN](https://unpkg.com/browse/handsfree@8.0.10/build/lib/assets). If you'd rather host these yourself (for example, to use offline) then you can eject the models from the npm package into your project's public folder:

```bash
# Move the models into your project's public directory
# - change PUBLIC below to where you keep your project's assets

# ON WINDOWS
xcopy /e node_modules\handsfree\build\lib PUBLIC
# EVERYWHERE ELSE
cp -r node_modules/handsfree/build/lib/* PUBLIC
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

## Models
<ModelList />

## Quickstart Workflow

The following workflow demonstrates how to use all features of Handsfree.js. Check out the [Guides](/guides/) and [References](/ref/) to dive deeper, and feel free to post on the [Google Groups](https://groups.google.com/g/handsfreejs) or [Discord](https://discord.gg/snbB62DUT9) if you get stuck!

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
handsfree.use('handTrackingSwitcher', ({weboji}) => {
  if (weboji.state.browsUp) {
    // Disable this plugin
    // Same as handsfree.plugin.handTrackingSwitcher.disable()
    this.disable()

    // Turn off face tracking and enable hand tracking
    handsfree.update({
      weboji: false,
      hands: true
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






<!-- Code -->
<script>
export default {
  data () {
    return {
      demoOpts: {
        weboji: false,
        hands: true,
        facemesh: false,
        pose: false,
        holistic: false,

        plugin: {
          pinchScroll: {enabled: true}
        }
      }
    }
  },

  methods: {
    /**
     * Start the page with our preset options
     */
    startDemo () {
      this.$root.handsfree.update(this.demoOpts)
    }
  }
}
</script>


<style>
  #hero-video {
    margin-bottom: 1em;
  }
  #hero-video h1 {
    position: absolute;
    top: 50%;
    transform: translateY(-75%);
    padding: 3%  20% 2% 20%;
    background: rgba(34,34,34, 25%);
    background: linear-gradient(90deg, rgba(34,34,34,0) 0%, rgba(34,34,34,1) 40%, rgba(34,34,34,1) 50%, rgba(34,34,34,1) 60%, rgba(34,34,34,0) 100%)
  }
</style>