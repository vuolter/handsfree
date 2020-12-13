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
// Enable Mediapipe's "Holistic" model (550+ keypoints for face, hands, pose)
const handsfree = new Handsfree({holistic: true})
// Enable plugins tagged with "browsing"
handsfree.enablePlugins('browsing')
// Start tracking
handsfree.start()
```

<div class="window">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://media.giphy.com/media/Iv2aSMS0QTy2P5JNCX/source.gif"></div>
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
    <p><a href="https://github.com/sponsors/midiblocks">Become a sponsor 💚</a></p>
  </div>
  <!-- <ul style="list-style: none; width: 450px; margin: auto; max-width: 100%; padding-left: 0">
    <li><strong>👩‍💻 GitHub:</strong> <a href="https://github.com/midiblocks/handsfree">https://github.com/midiblocks/handsfree</a></li>
    <li><strong>💬 Google Group:</strong> <a href="https://groups.google.com/g/handsfreejs">https://groups.google.com/g/handsfreejs</a></li>
    <li><strong>📧 Newsletter:</strong> <a href="http://eepurl.com/hhD7S1">http://eepurl.com/hhD7S1</a></li>
  </ul> -->
  <hr style="margin: 20px auto">
  <div class="text-center">
    <strong>Special thanks to:</strong> <a href="https://studioforcreativeinquiry.org/">The STUDIO for Creative Inquiry</a>, <a href="https://glitch.com">Glitch.com</a>, <a href="https://research.google/teams/brain/pair/">Google PAIR</a>, and you!
  </div>
</blockquote>

## Installing from CDN

```html
<head>
  <!-- Include Handsfree.js -->
  <link rel="stylesheet" href="https://unpkg.com/handsfree@7.2.15/build/lib/assets/handsfree.css" />
  <script src="https://unpkg.com/handsfree@7.2.15/build/lib/handsfree.js"></script>
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

# WINDOWS ONLY
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
  assetsPath: '/public',
})
handsfree.enablePlugins('browsing')
handsfree.start()
```