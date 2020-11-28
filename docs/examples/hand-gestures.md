# Hand Gesture Playground

<table>
  <tr>
    <td class="col-6">
    <a href="https://vimeo.com/484932006"><img src="https://media4.giphy.com/media/FxLUuTSxXjJPx8K9L4/giphy.gif"></a>
    <br><a href="https://vimeo.com/484932006">Watch video</a></td>
    <td class="col-6">
      <h2>Try it</h2>
      <ul>
        <li>🖐 With palm facing towards camera, move hand around to move pointer</li>
        <li>👌 Pinch your index and thumb to click or drag the page</li>
        <li>✊ Close hand and move hand to scroll page up and down</li>
      </ul>
      <HandsfreeToggle class="handsfree-hide-when-started-without-handpose" text-off="Activate Hand Gestures" text-on="Stop Handsfree" :opts="demoOpts" @started="onStarted" />
      <button class="large handsfree-show-when-started-without-handpose handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
      <button class="large handsfree-show-when-started-without-handpose handsfree-hide-when-loading" @click="startDemo">👆 Activate Hand Gestures</button>
    </td>
  </tr>
</table>

```js
const handsfree = new Handsfree({hand: true})
handsfree.start()

// Where on the screen to position the pointer
handsfree.hand.data.pointer.x
handsfree.hand.data.pointer.y
```

## Plugins used
- `handPointer` - calculates and positions a pointer on the screen
- `pinchClick` - click on things with a pinch gesture
- `handScroll` - scrolls a scroll area

## Clicky things
Try clicking on these different elements with a pinch gesture:

<table>
  <thead>
    <tr>
      <th>Radios</th>
      <th>Checkboxes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <input type="radio" name="radios" class="large">
        <input type="radio" name="radios" class="large">
        <input type="radio" name="radios" class="large">
        <input type="radio" name="radios" class="large">
      </td>
      <td>
        <input type="checkbox" class="large">
        <input type="checkbox" class="large">
        <input type="checkbox" class="large">
        <input type="checkbox" class="large">
      </td>
    </tr>
  </tbody>
</table>

## Scroll focus
With your pointer over the scroll areas, close your hand ✊ to try scrolling these individual scroll areas:

<table>
  <tr>
    <td>
      <div class="demo-focus-area no-guides">
        <div><div></div></div>
      </div>
    </td>
    <td>
      <div class="demo-focus-area no-guides">
        <div><div></div></div>
      </div>
    </td>
  </tr>
</table>

## Calibrating

> ⌚ More info coming soon

## Finger Laser Pointers

![](https://media.giphy.com/media/2vcbWI2ZAPeGvJVpII/source.gif)

coming soon

## Changing scroll speed

> ⌚ More info coming soon

## Changing other properties

> ⌚ More info coming soon

## Extending the Hand Pointer

> ⌚ More info coming soon

## Contributing

> ⌚ More info coming soon


<!-- Code -->
<script>
export default {
  data () {
    return {
      demoOpts: {
        weboji: false,
        handpose: true
      }
    }
  },

  methods: {
    /**
     * Start the page with our preset options
     */
    startDemo () {
      this.$root.handsfree.start(this.demoOpts, this.onStarted)
    },
    
    /**
     * Toggle plugins
     */
    onStarted () {
      console.log('🖐 Hand Tracking started')
    }
  }
}
</script>