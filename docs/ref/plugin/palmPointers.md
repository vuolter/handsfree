---
sidebarDepth: 2
---
# Plugin: palmPointers

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
> **About:** This plugin emits events, adds new properties to the hand data, and sets classes on the body to help you style elements based on which fingers were pinched
>
> **Activate:** This plugin is automatically activated when the [Hands Model](/ref/model/hands/) is enabled
>
> **Tags:** `['core']`

## Properties

## Events

## Classes

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
          // palmPointers: {enabled: true},
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
