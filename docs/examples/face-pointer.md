# Face Pointer Playground

<table>
  <tr>
    <td class="col-6"><img src="https://media.giphy.com/media/Iv2aSMS0QTy2P5JNCX/source.gif"></td>
    <td class="col-6">
      <h2>Try it</h2>
      <ul>
        <li>Move head to move red pointer</li>
        <li>Smile to the left or right to click on things</li>
        <li>Move pointer above/or below page to scroll</li>
      </ul>
      <HandsfreeToggle text-off="Activate Face Pointer" text-on="Stop Handsfree" />
    </td>
  </tr>
</table>

The face pointer detects your heads rotation and position in space and from that (very roughly) determines where your forehead is pointed towards on the screen. It positions a pointer there and you can use the calculated values to all sorts of things which we'll explore!

```js
const handsfree = new Handsfree({face: true})
handsfree.start()

// Where on the screen to position the pointer
handsfree.face.data.pointer.x
handsfree.face.data.pointer.y
```

## Plugins used
- `facePointer` - calculates and positions a pointer on the screen
- `faceScroll` - scrolls the window or active scroll area
- `faceClick` - triggers a click event when a gesture is performed

## Scroll focus

The `scrollFocus` grants the Face Pointer the ability to scroll different areas by:

1. Hover the pointer over an area with a scrollbar
2. When the area is focused (it'll receive a red border) move the pointer into the scroll area (red boxes) to scroll in that direction
3. Clicking into a scroll area also focuses it

<table>
  <tr>
    <td>
      <div class="demo-focus-area">
        <div><div></div></div>
      </div>
      <p><button id="demo-toggle-scroll-speed" onclick="demo.toggleScrollSpeed()" class="block">🐢 Activate slow scrolling</button></p>
    </td>
    <td>
      <div class="demo-focus-area">
        <div><div></div></div>
      </div>
      <p><button id="demo-toggle-scroll-zone" onclick="demo.toggleScrollZone()" class="block">↕ Decrease scroll zone</button></p>
    </td>
  </tr>
</table>

You can update the scrolling speed at run time:

```js
// Default is .15
// - ex) set to .01 to slow it down
handsfree.plugin.faceScroll.config.vertScroll.scrollSpeed = .01
```

You can also set the scroll zone (how many pixels from the edge of the scroll area to begin scrolling in that direction):

```js
// Default is 100
// - ex) set to 0px to require pointer to go above the top/bottom of the area
handsfree.plugin.faceScroll.config.scrollZone = 0
```

You can set both of these during instantiation:

```js
handsfree = new Handsfree({
  face: true,
  plugin: {
    faceScroll: {
      vertScroll: {
        scrollSpeed: .01,
        scrollZone: 0
      }
    }
  }
})
```

## Calibrating

The Face Pointer comes with a Calibrator, which you can trigger by running:

```js
if (handsfree.isLooping) {
  handsfree.weboji.calibrate()
} else {
  handsfree.start(() => {
    handsfree.weboji.calibrate()
  })
}
```

<button onclick="demo.calibrate()"><Fa-Crosshairs /> Start Calibration</button>

## Changing click gesture

## Changing scroll speed

## Changing other properties

## Extending the Face Pointer

## Contributing

<!-- Code -->
<script>
  window.demo = {
    /**
     * Adjust scroll speed for demo
     */
    toggleScrollSpeed () {
      if (handsfree.plugin.faceScroll.config.vertScroll.scrollSpeed === .01) {
        handsfree.plugin.faceScroll.config.vertScroll.scrollSpeed = .15
        document.querySelector('#demo-toggle-scroll-speed').innerHTML = '🐢 Active slow scrolling'
      } else {
        handsfree.plugin.faceScroll.config.vertScroll.scrollSpeed = .01
        document.querySelector('#demo-toggle-scroll-speed').innerHTML = '🐰 Activate fast scrolling'
      }
    },

    /**
     * Adjust scroll zone for demo
     */
    toggleScrollZone () {
      if (handsfree.plugin.faceScroll.config.vertScroll.scrollZone === 100) {
        handsfree.plugin.faceScroll.config.vertScroll.scrollZone = 0
        document.querySelector('#demo-toggle-scroll-zone').innerHTML = '↕ Increase scroll zone'
        document.body.classList.add('demo-negative-scroll-zone')
      } else {
        handsfree.plugin.faceScroll.config.vertScroll.scrollZone = 100
        document.querySelector('#demo-toggle-scroll-zone').innerHTML = '↕ Decrease scroll zone'
        document.body.classList.remove('demo-negative-scroll-zone')
      }
    },

    /**
     * Calibrate the face pointer
     * - Starts handsfree if it isn't already
     */
    calibrate () {
      console.log('calibrate')
      
      if (handsfree.isLooping) {
        handsfree.weboji.calibrate()
      } else {
        handsfree.start(() => {
          handsfree.weboji.calibrate()
        })
      }
    }
  }
</script>