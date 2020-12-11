<h1 class="mb-0"><a href="https://github.com/midiblocks/handsfree"><img src="/branding/handsfree.png"></a></h1>
<h3 style="padding-top: 2em">Build handsfree User Experiences and add face, hand, and pose tracking to your projects in a snap 👌✨</h3>
<p class="verticle-middle-children space-children">
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/stars/midiblocks/handsfree?style=social"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/tag/handsfreejs/handsfree.svg"></a>
  <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/repo-size/handsfreejs/handsfree.svg"></a>
</p>

---

```js
const handsfree = new Handsfree()
handsfree.start()
```

<div class="window">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://media.giphy.com/media/Iv2aSMS0QTy2P5JNCX/source.gif"></div>
      <div class="col-6">
        <h2>Try it!</h2>
        <ul>
          <li>Move head to move red pointer</li>
          <li>Smile to the left or right to click on things</li>
          <li>Move pointer above/or below page to scroll</li>
        </ul>
        <HandsfreeToggle class="block-children" text-off="Activate Face Pointer" text-on="Stop Handsfree" />
      </div>
    </div>
  </div>
</div>

<blockquote>
  <div class="verticle-middle-children space-children text-center">
    <strong>Powered by</strong>
    <a href="https://google.github.io/mediapipe/solutions/holistic"><img src='/branding/tensorflow.png' height=30></a>
  </div>
  <hr style="margin: 20px auto">
  <ul style="list-style: none; width: 400px; margin: auto; max-width: 100%">
    <li><strong>👩‍💻 GitHub:</strong> <a href="https://github.com/midiblocks/handsfree">https://github.com/midiblocks/handsfree</a></li>
    <li><strong>💬 Discord:</strong> <a href="https://discord.gg/TWemTd85">https://discord.gg/TWemTd85</a></li>
    <li><strong>📧 Newsletter:</strong> <a href="http://eepurl.com/hhD7S1">http://eepurl.com/hhD7S1</a></li>
  </ul>
  <hr style="margin: 20px auto">
  <div class="text-center">
    <strong>Special thanks to:</strong> <a href="https://studioforcreativeinquiry.org/">The STUDIO for Creative Inquiry</a>, <a href="https://glitch.com">Glitch.com</a>, <a href="https://research.google/teams/brain/pair/">Google PAIR</a>, and you!
  </div>
</blockquote>

## Installing

### Through CDN
```html
<head>
  <!-- Include Handsfree.js -->
  <link rel="stylesheet" href="https://unpkg.com/handsfree@7.2.15/build/lib/assets/handsfree.css" />
  <script src="https://unpkg.com/handsfree@7.2.15/build/lib/handsfree.js"></script>
</head>

<body>
  <!-- Instantiate and start it -->
  <script>
    const handsfree = new Handsfree()
    handsfree.start()
  </script>
</body>
```