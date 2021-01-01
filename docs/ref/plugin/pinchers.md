---
sidebarDepth: 2
---
# Plugin: pinchers

<Window>
  <div class="row">
    <div class="col-6"><img src="https://media4.giphy.com/media/IHcXdVDrnpVnZqwq4z/giphy.gif"></div>
    <div class="col-6">
      <ul>
        <li>👌 Pinch your thumb with any finger to set that fingers "click" state</li>
        <li>Unpinched fingers are black, pinched fingers are red</li>
      </ul>
      <HandsfreeToggle class="full-width handsfree-hide-when-started-without-hands" text-off="Pinch fingers to click" text-on="Stop Hands" :opts="demoOpts" />
      <button class="handsfree-show-when-started-without-hands handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
      <button class="handsfree-show-when-started-without-hands handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Pinch fingers to click</button>
    </div>
  </div>
</Window>


> **Models:** [MediaPipe Hands](/ref/model/hands/)
>
> **About:** This plugin emits a events a `handsfree-pincher` event and sets classes on the body to help you style elements based on which fingers were pinched
>
> **Activate:** This plugin is automatically activated when the [Hands Model](/ref/model/hands/) is enabled.
>
> **Tags:** `['core']`

<table class="finger-pincher-table">
  <thead>
    <tr>
      <th>Hand</th>
      <th>Index [0]</th>
      <th>Middle [1]</th>
      <th>Ring [2]</th>
      <th>Pinky [3]</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Left</th>
      <td>
        <div class="finger-pincher handsfree-hide-when-finger-pinched-0-0"></div>
        <div class="finger-pincher handsfree-show-when-finger-pinched-0-0"></div>
      </td>
      <td>
        <div class="finger-pincher handsfree-hide-when-finger-pinched-0-1"></div>
        <div class="finger-pincher handsfree-show-when-finger-pinched-0-1"></div>
      </td>
      <td>
        <div class="finger-pincher handsfree-hide-when-finger-pinched-0-2"></div>
        <div class="finger-pincher handsfree-show-when-finger-pinched-0-2"></div>
      </td>
      <td>
        <div class="finger-pincher handsfree-hide-when-finger-pinched-0-3"></div>
        <div class="finger-pincher handsfree-show-when-finger-pinched-0-3"></div>
      </td>
    </tr>
    <tr>
      <th>Right</th>
      <td>
        <div class="finger-pincher handsfree-hide-when-finger-pinched-1-0"></div>
        <div class="finger-pincher handsfree-show-when-finger-pinched-1-0"></div>
      </td>
      <td>
        <div class="finger-pincher handsfree-hide-when-finger-pinched-1-1"></div>
        <div class="finger-pincher handsfree-show-when-finger-pinched-1-1"></div>
      </td>
      <td>
        <div class="finger-pincher handsfree-hide-when-finger-pinched-1-2"></div>
        <div class="finger-pincher handsfree-show-when-finger-pinched-1-2"></div>
      </td>
      <td>
        <div class="finger-pincher handsfree-hide-when-finger-pinched-1-3"></div>
        <div class="finger-pincher handsfree-show-when-finger-pinched-1-3"></div>
      </td>
    </tr>
  </tbody>
</table>

## Properties

This plugin adds `handsfree.data.hands.pinchState` to the [Hands Model](/ref/model/hands/). It is a 2D array with the following:

```js
handsfree.data.hands.pinchState = [
  // Left hand
  // index, middle, ring, pinky
  ['', '', '', ''],
  // Left hand
  // index, middle, ring, pinky
  ['', '', '', '']
]
```

Each index can be of one of the following states:

| State | Note |
|-------|------|
| `start` | When the pinch first starts |
| `held` | Every frame the pinch is held |
| `released` | When the pinch is released |

```js
const handsfree = new Handsfree({hands: true})
handsfree.use('logger', ({hands}) => {
  console.log(hands.pinchState)
})
```

## Events

Currently this plugin emits an event for every individual finger, which you can listen to:

```js
// Listen to any event from left hand (0), index finger (0)
document.addEventListener('handsfree-finger-pinched-0-0')
// Listen to any event right hand (1), pinky finger (3)
handsfree.on('finger-pinched-1-0')
```

## Classes

This plugin comes with many helper classes to help you style your app based on the pinching fingers, they look like this:

```css
/* Left hand (0), index finger (0) */
.handsfree-show-when-finger-pinched-0-0
.handsfree-hide-when-finger-pinched-0-0

/* Right hand (1), pinky finger (3) */
.handsfree-show-when-finger-pinched-1-3
.handsfree-hide-when-finger-pinched-1-3
```

Simply apply these classes to the elements you'd like to show/hide. If you'd like some more styling then you can take advantage of the body classes that get added:

```css
/* Left (0) middle finger (1) */
body.handsfree-finger-pinched-0-1

/* Right (1) ring finger (2) */
body.handsfree-finger-pinched-1-2
```

## Full plugin code

<<< @/src/plugin/hands/pinchers.js


<!-- Code -->
<script>
export default {
  data () {
    return {
      demoOpts: {
        weboji: false,
        hands: true,
        facemesh: false,
        pose: false,
        holistic: false,

        plugin: {
          pinchers: {enabled: true}
        }
      }
    }
  },

  methods: {
    /**
     * Start the page with our preset options
     */
    startDemo () {
      this.$root.handsfree.update(this.demoOpts)
    }
  }
}
</script>

<style lang="stylus">
.finger-pincher
  display inline-block
  width 32px
  height 32px
  border-radius 32px
  background #000
  margin auto

  &:last-child
    background #f00
</style>