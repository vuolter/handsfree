---
sidebarDepth: 2
---
# Plugin: pinchClick

<Window>
  <div class="row">
    <div class="col-6"><img src="https://media4.giphy.com/media/tQ1vFtoMWWpgdCoJJj/giphy.gif"></div>
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
> **Activate:** `handsfree.plugin.pinchers.enable()`
>
> **Tags:** This plugin works with all tags
>
> **About:** This plugin emits a `handsfree-pinch-start-H-F`, `handsfree-pinch-held-H-F`, and `handsfree-pinch-released-H-F` event on the document for every pinched finger and adds `.handsfree-finger-pinched-H-F` to the body

<table class="finger-pincher-table">
  <thead>
    <tr>
      <th>Hand</th>
      <th>Index</th>
      <th>Middle</th>
      <th>Ring</th>
      <th>Pinky</th>
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