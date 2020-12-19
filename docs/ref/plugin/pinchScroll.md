---
next: /ref/prop/
sidebarDepth: 2
---
# Plugin: pinchScroll

<div class="window">
  <div class="window-body">
    <div class="row">
      <div class="col-6"><img src="https://media4.giphy.com/media/tQ1vFtoMWWpgdCoJJj/giphy.gif"></div>
      <div class="col-6">
        <ul>
          <li>👌 Pinch your thumb and index to grab the page</li>
          <li>↕ While pinched, move hand up and down to scroll page</li>
        </ul>
        <HandsfreeToggle class="full-width handsfree-hide-when-started-without-hands" text-off="Scroll page with hands" text-on="Stop Hands" :opts="demoOpts" />
        <button class="handsfree-show-when-started-without-hands handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
        <button class="handsfree-show-when-started-without-hands handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Scroll page with hands</button>
      </div>
    </div>
  </div>
</div>

> **Models:** [MediaPipe Hands](/ref/model/hands/)
>
> **Activate:** `handsfree.plugin.pinchScroll.enable()`
>
> **Tags:** `['browser']`
>
> **About:** This plugin helps you scroll pages by pinching together your thumb and pointer finger.

## Config

### During instantiation

```js
const handsfree = new Handsfree({
  hands: true,

  plugin: {
    pinchScroll: {
      enabled: true,
      
      // Number of frames over the same element before activating that element
      framesToFocus: 10,

      // Number of pixels the middle and thumb tips must be near each other to drag
      threshold: 50,

      // Number of frames where a hold is not registered before releasing a drag
      numThresholdErrorFrames: 5,

      // Speed multiplier
      speed: 2
    }
  }
})
```

### After instantiation

```js
const handsfree = new Handsfree({hands: true})
handsfree.start()

// Scroll a little slower
handsfree.plugin.pinchScroll.enable()
handsfree.plugin.pinchScroll.config.speed = 1
```

## Full plugin code

<<< @/src/plugin/hands/pinchScroll.js


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
        holistic: false
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