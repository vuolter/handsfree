<div align="center">
  <p>~ Presenting ~</p>
  <p>with support from the <a href="https://www.cmu.edu/cfa/studio/index.html">Studio for Creative Inquiry at CMU</a>, <a href="https://glitch.com/@handsfreejs">Glitch.com</a>, the <a href="https://youtu.be/CJDpF4xUieY?t=58">School of AI</a> and <a href="https://patreon.com/handsfreejs">you</a>!</p>
  <br>
  <p><img src="https://media.giphy.com/media/3Z15Ve7WEQGkLa1FwC/giphy.gif" alt="handsfree.js"></p>
  <br>
  <h1>Handsfree.js</h1>
  <p>A wrapper library around computer vision models for interacting with apps handsfree 👋</p>
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
</div>

<br>
<br>
<br>

# Quickstart

**Explore the docs:** https://handsfree.js.org

For more code examples, check out the `/examples/` folder!

```html
<!DOCTYPE html>
<head>
  <!-- Require dependencies, which adds Handsfree to global namespace -->
  <script src="https://unpkg.com/handsfree@7.0.0/dist/handsfree.js"></script>
</head>
<body>
  <button onclick="handsfree.start()">Start Webcam</button>

  <script>
    // Create a new instance. Use one instance for each camera
    const handsfree = new Handsfree({})

    // Create a plugin that logs head rotation
    handsfree.use('consoleLogger', ({ weboji }) => {
      console.log(`---
      Pitch ${(weboji.rotation[0] * 180) / Math.PI}
      Yaw ${(weboji.rotation[1] * 180) / Math.PI}
      Roll ${(weboji.rotation[1] * 180) / Math.PI}`)
    })
  </script>
</body>
```

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
  - If you don't have Git, [download the latest zip](https://github.com/handsfreejs/handsfree/archive/master.zip)
- Install dependencies by running `npm i` from the project root
- Start development on `localhost:1234` by running `npm start`

## File structure

- The examples served on `localhost:1234` start in `/examples/index.pug`
- The Handsfree.js library itself starts in `/src/Handsfree.js`

<br>
<br>
<br>

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

A very special thanks goes out to [@Golan](https://twitter.com/golan) for inviting me out to [The STUDIO for Creative Inquiry at Carnegie Mellon](http://studioforcreativeinquiry.org/) during the [Spring of 2019](https://www.flickr.com/photos/creativeinquiry/albums/72157703188612302) and again for May 2020!

Another special thanks goes out to [@AnilDash](https://twitter.com/anildash) for sponsoring me during Winter 2018. Also a thank you to [The School of AI](https://twitter.com/SchoolOfAIOffic) for the [2018 Fellowship](https://www.youtube.com/watch?v=CJDpF4xUieY&t=58). And a very special thanks to [Jess Holbrook](https://twitter.com/jessscon) from Google Pair for driving all the way out to meet me and helping kickstart this all with a new computer!

Thanks also to everyone who's supported me on Patreon, GoFundMe, and through Twitter over the years.
