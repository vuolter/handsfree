# Chrome Extension: Handsfree WebXR 

<Window>
  <div class="row">
    <div class="col-6">
      <a target="_blank" href="https://www.youtube.com/watch?v=XQcW57jN7b8"><img src="https://media0.giphy.com/media/w3JUFtNyXNafLVrh6F/giphy.gif"></a>
    </div>
    <div class="col-6">
      <p>A Chrome Extension that emulates WebXR hardware with computer vision, helping you work on your XR experiences handsfree!</p>
      <ul>
        <li><a href="https://github.com/midiblocks/handsfree-webxr">Get the code on GitHub</a></li>
        <li><a href="https://github.com/MIDIBlocks/handsfree-webxr/archive/dev.zip">Download the latest .zip</a></li>
      </ul>
    </div>
  </div>
</Window>

## Installing

> 🚨 **This project is still experimental!**
>
> Handsfree WebXR is currently available as an Unpackaged Chrome Extension, but will be available in the Firefox and Chrome Web Stores soon!

1. Download and unpack the [latest zip file](https://github.com/MIDIBlocks/handsfree-webxr/archive/dev.zip)
2. Visit `chrome://extensions/` and turn on <kbd>Developer Mode</kbd> in the upper right
3. Click <kbd>Load unpacked</kbd> and select the unzipped folder

![](https://i.imgur.com/jXmhYnb.png)

## Using the WebXR Emulator

After installing the extension you should now see the <kbd>WebXR</kbd> tab in your Dev Tools. In order for this to work, the WebXR tab must be opened as it's what contains the scripts that reads your heads pose.

1. Set this field to the device you'd like to emulate
2. Click the <kbd>Start Handsfree</kbd> to actually start handsfree mode

![](https://i.imgur.com/tJLVsKn.png)


## Notes

- Everything happens client side and only in the tab which you activated Handsfree Mode in
- I do not use analytics or trackers in the Chrome Extension, nor do I collect any data
- [Please open any issues](https://github.com/midiblocks/handsfree-webxr/issues) for questions or comments on GitHub, or come [chat and research with me on Discord](https://discord.gg/snbB62DUT9)