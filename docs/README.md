Handsfree.js
============

* * *

#### This library helps you add face tracking, hand tracking, and/or pose estimation to your JavaScript projects in a snap. It also:

*   Manages dependencies to minimize impact on initial page load times
*   Creates a single, pluggable "game loop" that is passed face morphs, keypoints, confidences and more
*   Provides bindings to the models original API along with a custom API largely focused around handsfree user interfaces

<blockquote>
  <p class="verticle-middle-children space-children">
    <strong>Powered by:</strong>
    <a href="https://github.com/jeeliz/jeelizWeboji"><img width=100 src="https://jeeliz.com/wp-content/uploads/2018/01/LOGO_JEELIZ_BLUE.png"></a>
    <a href="https://github.com/tensorflow/tfjs-models/"><img src='https://i.imgur.com/KqlnNuA.png' height=30></a> <a href="https://ml5js.org/"><img src="https://i.imgur.com/rgguSyv.png" height=30></a>
  </p>
  <p class="verticle-middle-children space-children">
    <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/stars/midiblocks/handsfree?style=social"></a>
    <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg"></a>
    <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/release-pre/handsfreejs/handsfree.svg"></a>
    <a href="https://github.com/midiblocks/handsfree"><img src="https://img.shields.io/github/repo-size/handsfreejs/handsfree.svg"></a>
  </p>
</blockquote>

* * *

Getting Started
---------------

### Try it

![](https://media.giphy.com/media/Iv2aSMS0QTy2P5JNCX/source.gif)

Press the start button below to enable a "Face Pointer". Move the pointer with your head, and scroll the page by moving the pointer above and below the window. Click on things with a smirk (smile to either side)

<p>
  <button class="large handsfree-show-when-stopped handsfree-hide-when-loading" onclick="handsfree.start()">Start Webcam</button>
  <button class="large handsfree-show-when-loading" disabled>Loading...</button>
  <button class="large handsfree-show-when-started" onclick="handsfree.stop()">Stop Webcam</button>
</p>