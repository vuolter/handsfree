---
prev: /app/
next: false
---

# Chrome Extension: Handsfree WebXR 

<Window>
  <div class="row">
    <div class="col-6">
      <iframe src="https://player.vimeo.com/video/494884542" width="100%" height="240" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
    </div>
    <div class="col-6">
      <p>A Chrome Extension that emulates WebXR hardware with computer vision, helping you work on your XR experiences handsfree!</p>
      <ul>
        <li><a href="https://github.com/midiblocks/handsfree-webxr">Get the code on GitHub</a></li>
        <li><a href="https://github.com/MIDIBlocks/handsfree-webxr/archive/dev.zip">Download the latest .zip</a></li>
        <li><a href="https://immersive-web.github.io/webxr-samples/tests/pointer-painter.html">Try it on the WebXR sample page</a></li>
      </ul>
    </div>
  </div>
</Window>

> This project is a recent fork of the [Mozilla WebXR Emulator Extension](https://github.com/MozillaReality/WebXR-emulator-extension)

## Installing

> 🚨 **This project is still experimental!**
>
> Handsfree WebXR is currently available as an Unpackaged Chrome Extension, but will be available in the Firefox and Chrome Web Stores soon!

<iframe src="https://player.vimeo.com/video/494884727" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

1. Download and unpack the [latest zip file](https://github.com/MIDIBlocks/handsfree-webxr/archive/dev.zip)
2. Visit `chrome://extensions/` and turn on <kbd>Developer Mode</kbd> in the upper right
3. Click <kbd>Load unpacked</kbd> and select the unzipped folder

![](https://i.imgur.com/jXmhYnb.png)

## Using the WebXR Emulator

### Handsfree mode

After installing the extension you should now see the <kbd>WebXR</kbd> tab in your Dev Tools. In order for this to work, the WebXR tab must be opened as it's what contains the scripts that reads your heads pose.

1. Set this field to the device you'd like to emulate
2. Click the <kbd>Start Handsfree</kbd> to actually start handsfree mode

![](https://i.imgur.com/VsjEhPk.jpg)

Use the sliders to adjust the sensitivity which allows you to "look around" more than you actually do in real life (this is especially helpful for looking behind you). You can also click <kbd>Show/Hide webcam feed</kbd> to show yourself overlaid on top of the webpage. This is helpful in situations where the computer vision model isn't picking you up.

### Click and drag mode

Until controllers are made handsfree as well, you can use the mouse to manually drag the controller around. To do this, first click on the device you'd like to control to reveal its axis handles. Some headsets can't be translated but for those that can multiple clicks switches between rotation and translation. Once the handles are visible, click and drag a handle to move the device in that axis.

![](https://media2.giphy.com/media/7ZGLsF2mXy6l4dDL75/giphy.gif)

## Notes

- I've installed this a few times on different machines, and occasionally the first time you enter Handsfree Mode it won't work. Just reload the page and try again, I'll try figure out why this happens
- Everything happens client side and only in the tab which you activated Handsfree Mode in
- I do not use analytics or trackers in the Chrome Extension, nor do I collect any data
- [Please open any issues](https://github.com/midiblocks/handsfree-webxr/issues) for questions or comments on GitHub, or come [chat and research with me on Discord](https://discord.gg/snbB62DUT9)

## Roadmap
- Attach a controller to the head and use face gestures to trigger buttons
- Add hand tracking support for multiple controllers (see the [Hands Model](/ref/model/hands/))
- Persistence, so that you don't have to restart the webcam each time
- Save settings so that you don't have to adjust sliders each time
- MOAR 🤯

## Getting Updates

Until this extension is available in the Firefox/Chrome Web Stores, the best way to get updates is to [watch for releases on the repository on GitHub](https://github.com/midiblocks/handsfree-webxr). I'll make a release for all the updates worth downloading again, including detailed notes:

<img src="https://i.imgur.com/aXf241T.png" width=300>

You can also:

- [Sign up to my Handsfree.js.org newsletter](http://eepurl.com/hhD7S1)
- [DM me on Twitter @Midiblocks](https://twitter.com/midiblocks)
- [Join the Discord](https://discord.gg/snbB62DUT9) or add me as a friend at <kbd>Oz#4442</kbd>

## See Also

- Understand the code that makes this work in the [Handsfree A-Frame Integration](/integration/aframe/look-around-handsfree/)
- Learn about the [Weboji model](/ref/model/weboji/)
- [Original Mozilla WebXR Emulator Extension](https://github.com/MozillaReality/WebXR-emulator-extension) of which this is a recent fork of