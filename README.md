<div align="center">
  <p>~ Presenting ~</p>
  <p>with support from the <a href="https://www.cmu.edu/cfa/studio/index.html">Studio for Creative Inquiry at CMU</a>, <a href="https://glitch.com/@handsfreejs">Glitch.com</a>, the <a href="https://youtu.be/CJDpF4xUieY?t=58">School of AI</a> and you!</p>
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
  <p>Powered by:</p>
  <p><a href="https://github.com/jeeliz/jeelizWeboji"><img width=100 src="https://jeeliz.com/wp-content/uploads/2018/01/LOGO_JEELIZ_BLUE.png"></a></p>
</div>

<br>
<br>
<br>

# Quickstart

For more examples, see the `/examples/` folder:

```html
<!DOCTYPE html>
<head>
  <!-- Require dependencies, which adds Handsfree to global namespace -->
  <!-- prettier-ignore -->
  <link rel="stylesheet" href="https://unpkg.com/handsfree@6.0.7/dist/handsfree.css" />
  <script src="https://unpkg.com/handsfree@6.0.7/dist/handsfree.js"></script>
</head>
<body>
  <button onclick="handsfree.start()">Start Webcam</button>

  <script>
    // Create a new instance. Use one instance for each camera
    const handsfree = new Handsfree({})

    // Create a simple plugin that displays pointer values on every frame
    Handsfree.use('consoleLogger', ({ head }) => {
      console.log(`---
      Pitch ${(head.rotation[0] * 180) / Math.PI}
      Yaw ${(head.rotation[1] * 180) / Math.PI}
      Roll ${(head.rotation[1] * 180) / Math.PI}`)
    })
  </script>
</body>
```

<br>
<br>
<br>

<div align="center">
  <img src="https://i.imgur.com/qkYyazG.gif" width=250>
  <h1>Learn how to use Handsfree.js</h1>
  <p><a href="https://github.com/handsfreejs/handsfree/wiki/Config">Config</a> &middot; <a href="https://github.com/handsfreejs/handsfree/wiki/Methods">Methods</a> &middot; <a href="https://github.com/handsfreejs/handsfree/wiki/Properties">Properties</a> &middot; <a href="https://github.com/handsfreejs/handsfree/wiki/Plugins">Plugins</a> &middot; <a href="https://github.com/handsfreejs/handsfree/wiki/Events">Events</a> &middot; <a href="https://github.com/handsfreejs/handsfree/wiki/Classes">Classes</a></p>
  <p><a href="https://github.com/handsfreejs/handsfree/wiki/Head">The Head</a> &middot; <a href="https://github.com/handsfreejs/handsfree/wiki/Body">The Body</a></p>

  <h1>Tutorials</h1>
</div>

- [Getting Started](https://dev.to/heyozramos/handsfree-js-a-web-based-face-pointer-24m1): Learn how to setup Handsfree.js and access the `handsfree.pointer` properties
- [Controlling a YouTube 360 video](https://dev.to/heyozramos/controlling-youtube-360-videos-handsfree-2801): Learn how to access and use `handsfree.head.rotation` to control a 360 video
- [Puppeteering Emojis with face morphs](https://dev.to/heyozramos/puppeteering-emojis-with-face-morphs-with-handsfree-js-55kp): Explores the face morph activation properties
- [Face Painting with P5.js](https://dev.to/heyozramos/face-painting-with-p5-js-2b64): Integrate with P5.js to paint with your face

---

> The rest of this document is for running Handsfree.js.org and the Handsfree.js library locally.
>
> **👆 See the above wiki links for how to actually use Handsfree.js in your own app 👆**

---

<br>
<br>
<br>

# Local Handsfree.js Development

- Install the [ParcelJS package bundler](https://parceljs.org/) on your system globally with `yarn global add parcel-bundler`
- Install dependencies by running `yarn` the from project root
- Run `yarn start` from the project root
- This will open `/examples/index.html` on `localhost:1234`

## All scripts

```bash
# Local development on localhost:1234
yarn start

# Bundle the library into /dist
yarn bundle
```

## Building the handsfree.js library

To create a single `handsfree.js` script (with accompanying models) for use within your own projects, do the following:

- Install [Parcel](https://parceljs.org/) on your system globally with: `yarn global add parcel-bundler`
- Install dependencies with `yarn`
- Run `yarn bundle`
- The files will be built into `/dist/`

The resulting directory structure should remain intact. If you'd like to host the `models` folder separate from the `handsfree.js` file, then set `Handsfree.libSrc` to its parent path. In other words if you're serving the models out of `example.com/path/to/models` then `Handsfree.libSrc = "/path/to"`.

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

# Special Thanks

A very special thanks goes out to [@Golan](https://twitter.com/golan) for inviting me out to his studio, [The STUDIO for Creative Inquiry at Carnegie Mellon](http://studioforcreativeinquiry.org/) during the [Spring of 2019](https://www.flickr.com/photos/creativeinquiry/albums/72157703188612302). It was during this residency that I was encouraged to begin integrating Handsfree.js into different libraries and where I had a chance to use Handsfree.js with a real UR5 robot!

Another special thanks goes out to [@AnilDash](https://twitter.com/anildash) for sponsoring me during Winter 2018. Also a thank you to [The School of AI](https://twitter.com/SchoolOfAIOffic) for the [2018 Fellowship](https://www.youtube.com/watch?v=CJDpF4xUieY&t=58). And a very special thanks to [Jess Holbrook](https://twitter.com/jessscon) from Google Pair for driving all the way (way) out to meet me and helping kickstart this all with a new computer!

Thanks also to everyone who's supported me on Patreon, GoFundMe, and through Twitter over the months (and almost years!). And thanks everyone else for believing in this project 👋
