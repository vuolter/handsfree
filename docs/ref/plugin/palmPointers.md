---
sidebarDepth: 2
---
# Plugin: palmPointers

<Window>
  <div class="row">
    <div class="col-6"><img src="https://media4.giphy.com/media/IHcXdVDrnpVnZqwq4z/giphy.gif"></div>
    <div class="col-6">
      <ul>
        <li>🖐 With your palm(s) pointed at the screen, move your hands to move the pointer</li>
        <li>👌 Pinch your index and thumb to scroll the page</li>
        <li>Try scrolling two scroll areas at once!</li>
      </ul>
      <HandsfreeToggle class="full-width handsfree-hide-when-started-without-hands" text-off="Try Palm Pointers" text-on="Stop Palm Pointers" :opts="demoOpts" />
      <button class="handsfree-show-when-started-without-hands handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
      <button class="handsfree-show-when-started-without-hands handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Try Palm Pointers</button>
    </div>
  </div>
</Window>

> **Models:** [MediaPipe Hands](/ref/model/hands/)
>
> **About:** This plugin displays a pointer on the screen for each visible hand, which can be used as a guide when [pinch clicking](/ref/plugin/pinchClick/) or [pinch scrolling](/ref/plugin/pinchScroll/)
>
> **Activate:** `handsfree.plugin.palmPointers.enable()` or `handsfree.enablePlugins('core')`
>
> **Tags:** `['core']`

## Try scrolling these different areas at the same time
<table class="multi-hand-scrollers">
  <tr>
    <td><div><div></div></div></td>
    <td><div><div></div></div></td>
  </tr>
  <tr>
    <td><div><div></div></div></td>
    <td><div><div></div></div></td>
  </tr>
</table>

## The Pointers

This plugin adds `handsfree.data.hands.pointers` to the [Hands Model](/ref/model/hands/) with an object for each hand:

```js
handsfree.data.hands.pointers = [
  // Left hand 1
  {x, y, isVisible},
  // Right hand 1
  {x, y, isVisible},
  // Left hand 2
  {x, y, isVisible},
  // Right hand 2
  {x, y, isVisible}
]
```

The pointers are automatically shown and hidden as the hands come in and out view. You can access these in several ways:

```js
// From anywhere
handsfree.data.hands.pointers[0]

// From inside a plugin
handsfree.use('logger', data => {
  if (!data.hands) return

  console.log(data.hands.pointers[0])
})

// From an event
document.addEventListener('handsfree-data', event => {
  const data = event.detail
  if (!data.hands) return

  console.log(data.hands.pointers[0])
})
```

## Full plugin code

<<< @/src/plugin/hands/palmPointers.js


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
        handpose: false,

        plugin: {
          palmPointers: {enabled: true},
          pinchScroll: {enabled: true}
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
.multi-hand-scrollers
  td
    padding 0
  
    > div
      max-height 300px
      overflow auto

      > div
        height 1000px
        background url(/favicon.png)
        background-repeat space
        background-size 32px
        opacity 0.25
</style>