---
prev: /community/
next: false
---
# About Handsfree.js.org

## Master Plan

1. Create a library that makes face, hand, eye, and pose tracking and voice and mind control easy to use 
2. Use the library to build a repository of custom handsfree plugins, components, and gestures
3. Grow a community of handsfree users and developers around the library and repository
4. Bridge the assistive and creative tech communities and solve accessibility

## History of Handsfree.js

> Handsfree.js was started in 2018 to help a friend reconnect with his remote family after he suffered a severe stroke. The following represents the evolution of Handsfree.js since then and is [mostly copy+pasted from Twitter](https://twitter.com/MIDIBlocks/status/1338244981295747072)

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://media4.giphy.com/media/8OcbxAFoEIyI2PtjA8/giphy.gif"></div>
      <div class="col-6">
        <p>The first thing I tried was inspired by the first <a href="https://teachablemachine.withgoogle.com/">Teachable Machine</a> in order to map head poses to the arrow keys</p>
        <p>This worked well but you could only step towards one direction at a time and it also required a lot of (re)training</p>
      </div>
    </div>
  </div>
</div>

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://media1.giphy.com/media/sCsrofiPuBhavjelCo/giphy.gif"></div>
      <div class="col-6">
        <p>The next thing I tried was building a Chrome Extension that used eye tracking (through <a href="https://webgazer.cs.brown.edu/">WebGazer.js</a>) in combination with head tilts for clicking (through <a href="https://github.com/auduno/clmtrackr">clmtrackr</a>)</p>
        <p>It wasn't super stable so I wrote some code that guessed which element you were trying to lock onto with your eyes</p>
      </div>
    </div>
  </div>
</div>

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://i.imgur.com/Hbb47Hh.jpg"></div>
      <div class="col-6">
        <p>Eventually I had a chance to hang out with 3 engineers from Google and I even gave 2 of them a tour of the shelter which was...very chaotic 😅</p>
        <p>With the new computer they got me I began exploring ways to use just head tracking but I couldn't figure out the math so I asked Twitter</p>
      </div>
    </div>
  </div>
</div>

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://media0.giphy.com/media/poX4WIdtkUVXRIU4df/giphy.gif"></div>
      <div class="col-6">
        <p>I was flooded with DMs and with their help I was able to create my first Face Pointer (by this time I think I was using a model called <a href="https://github.com/Tastenkunst/brfv4_javascript_examples">BRFv4</a> to help get head pose)</p>
        <p>This worked so well that I privately packaged it up as a Chrome Extension for my friend & released it on GitHub</p>
      </div>
    </div>
  </div>
</div>

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://media1.giphy.com/media/KW2zd3poZndob6UYwA/giphy.gif"></div>
      <div class="col-6">
        <p>I was very fortunate to have a computer now but wanted Face Pointers to work on basically any device so I turned to <a href="https://github.com/tensorflow/tfjs-models/tree/master/posenet">PoseNet</a> which works amazingly fast!</p>
        <p>Unfortunately, you only have 5 2D keypoints to work with so I spent a few months working it out. These were the results</p>
      </div>
    </div>
  </div>
</div>

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://media3.giphy.com/media/BHdfIcCsGCNlIAnKD7/giphy.gif"></div>
      <div class="col-6">
        <p>But it wasn't until my first residency at the STUDIO for Creative Inquiry that it occurred to me that Face Pointers could be used to affect the physical world too!</p>
        <p>After some convincing 😅 I was able to experiment with Handsfree.js to control an industrial robot</p>
      </div>
    </div>
  </div>
</div>

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://media3.giphy.com/media/FxLUuTSxXjJPx8K9L4/giphy.gif"></div>
      <div class="col-6">
        <p>And I still can't believe it but I was invited back for an even longer virtual residency in Jan!</p>
        <p>This time the plan is to push Handsfree.js even further into a complete framework for both creating and interacting with things (digital, physical, musical, etc) handsfree</p>
      </div>
    </div>
  </div>
</div>

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://media1.giphy.com/media/mssf4vZa4gO5rZyItA/giphy.gif"></div>
      <div class="col-6">
        <p>By next summer I hope to have:</p>
        <ul>
          <li>A gesture mapper; like Teachable Machine but for multi-frame gestures</li>
          <li>Face, eye, hand, pose tracking plus voice & mind control</li>
          <li>A plugin repository to quickly share gestures, UIs, and more</li>
          <li>Vue and React components</li>
        </ul>
      </div>
    </div>
  </div>
</div>

## Special Thanks

This project couldn't have been possible without:

- Invitations to residencies at [The STUDIO for Creative Inquiry]() (Spring 2019, 2021)
- Grant from [Glitch.com](https://glitch.com) (Winter 2019)
- Grant from the School of AI Grant (Fall 2018)
- Grant from [Google PAIR](https://pair.withgoogle.com/) (Spring 2018)

## Support Handsfree.js.org

Please consider supporting this project 💜 There are several ways to help:

- [Sponsor the project on GitHub](https://github.com/sponsors/midiblocks)
- [Make a Pull Request](https://github.com/midiblocks)