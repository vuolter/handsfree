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
  href="https://unpkg.com/handsfree@7.0.8/dist/handsfree.css" />
<script src="https://unpkg.com/handsfree@7.0.8/dist/handsfree.js"></script>

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

I switched over from Parcel to Rollup for package management and am still new to it. For now, a little extra setup is needed when installing through npm:

- Install with: `npm i handsfree`
- Copy this project's `/public/assets` folder into your own projects public folder (this makes the computer vision models accessible to your app)
- When instantiating `Handsfree`, set the `assetsPath` property:

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

Once you've included Handsfree.js into your project you'll have a global `Handsfree` class in the `window`'s scope. You'll want to create one instance for every webcam you intend to use, along with some config:

```js
// Instantiate with the weboji head tracker with defaults...
let handsfree = new Handsfree({weboji: true})

// ...or fine tune the head tracker
handsfree = new Handsfree({
  // The following are the defaults
  weboji: {
    enabled: true,
    throttle: 0,
  }
})
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
