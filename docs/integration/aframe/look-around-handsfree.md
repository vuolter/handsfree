# A-Frame: "Look around" handsfree

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6">
        <img src="https://media3.giphy.com/media/YOPrRX6vTy6tb3frgt/giphy.gif">
      </div>
      <div class="col-6">
        <h2>Try it!</h2>
        <ul>
          <li>Turn head around to turn the camera</li>
          <li>Move your head to move the camera</li>
        </ul>
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-weboji" text-off="Look around Handsfree" text-on="Stop Pose" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-weboji handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-weboji handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Look around Handsfree</button>
        </div>
      </div>
    </div>
  </div>
</div>

<div>
  <iframe id="aframe" src="/integration/aframe/look-around-handsfree/index.html" style="width: 100%; height: 500px"></iframe>
</div>

## How it works

### Basic approach

First we start by instantiating Handsfree. We'll use the [Weboji model](/ref/model/weboji/) which gives us head pose and translation:

```js
handsfree = new Handsfree({weboji: true})
```

Next we create a plugin to match the A-Frame camera's pose with your head's:

```js
$rig = document.querySelector('#camera-rig')

// Create the plugin
handsfree.use('lookHandsfree', ({weboji}) => {
  // [yaw, pitch, roll]
  const rot = weboji.degree

  // Let's shift the yaw slightly
  // - this assumes webcam is slightly below eye level, like on a laptop
  rot[0] += 15
  
  // Calculate position
  // - Positions are normalized between [0, 1]
  // - 0 is all the way to the left of the canvas, 1 all the way to the right
  // - Change the multiplier to change the range you want to move by
  const pos = {
    // Subtract .5 to "center" the x value
    x: (weboji.translation[0] - .5) * 10,
    // Subtract .5 to "center" the y value
    y: (weboji.translation[1] - .5) * 5,
    // Let's position the camera 5 units back from the center of the room
    z: 5 - weboji.translation[2] * 30
  }
  
  // Now let's just tell A-Frame to update our camera rig
  $rig.setAttribute('rotation', `${rot[0]} ${rot[1]} ${rot[2]}`)
  $rig.setAttribute('position', `${pos} ${pos} ${pos}`)
})

// Start tracking
handsfree.start()
```

### Let's add tweening

Although the above will definitely work, you'll notice that it jerks around quite a bit:

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6">
        <h2>Jerky</h2>
        <img src="https://media1.giphy.com/media/N2KK8hpwsepdXy7lUA/giphy.gif">
      </div>
      <div class="col-6">
        <h2>Smooth</h2>
        <img src="https://media3.giphy.com/media/YOPrRX6vTy6tb3frgt/giphy.gif">
      </div>
    </div>
  </div>
</div>

This is due to slight errors between frames and the fact that it isn't running at a full 30 or 60FPS. To fix this, we use Tweening:

## Boilerplate

The following is the boilerplate located [in the repo at /boilerplate/aframe/look-around-handsfree/index.html](https://github.com/MIDIBlocks/handsfree/tree/master/boilerplate/aframe/look-around-handsfree/index.html). You can also play with this demo on CodePen, or locally without a server.

<<< @/boilerplate/aframe/look-around-handsfree/index.html



<script>
import {TweenMax} from 'gsap'
  
let iframe
let $rig
let tween = {
  x: 0,
  y: 0,
  z: 0,
  yaw: 0,
  pitch: 0,
  roll: 0
}
  
export default {
  data: () => ({
    demoOpts: {
      weboji: true,
      hands: false,
      pose: false,
      holistic: false,
      facemesh: false
    }
  }),
  
  mounted () {
    document.addEventListener('handsfree-data', this.onData)
    window.addEventListener('message', this.onMessage)
  },

  destroyed () {
    document.removeEventListener('handsfree-data', this.onData)
    window.removeEventListener('onMessage', this.onMessage)
  },

  methods: {
    /**
     * Called on handsfree-data
     */
    onData ({detail}) {
      const weboji = detail.weboji
      if (!weboji || !$rig) return

      TweenMax.to(tween, 1, {
        x: (weboji.translation[0] - .5) * 10,
        y: (weboji.translation[1] - .5) * 5,
        z: 5 - weboji.translation[2] * 30,
        yaw: -weboji.degree[0] + 15,
        pitch: -weboji.degree[1],
        roll: weboji.degree[2]
      })

      // $rig.setAttribute('position', `${tween.x} ${tween.y} ${tween.z}`)
      // $rig.setAttribute('rotation', `${tween.yaw} ${tween.pitch} ${tween.roll}`)
      const rot = weboji.rotation
      const pos = weboji.translation
      
      $rig.setAttribute('position', `${(weboji.translation[0] - .5) * 10} ${(weboji.translation[1] - .5) * 5} ${5 - weboji.translation[2] * 30}`)
      $rig.setAttribute('rotation', `${-weboji.rotation[0] * 180 / Math.PI * 1 + 15} ${-weboji.rotation[1] * 180 / Math.PI * 1} ${weboji.rotation[2] * 180 / Math.PI * 1}`)
    },

    /**
     * Listen to ready state
     */
    onMessage (ev) {
      if (ev.data === 'aframeReady') {
        window.iframe = iframe = document.querySelector('#aframe').contentDocument
        window.$rig = $rig = iframe.querySelector('#rig')
      }
    },

    startDemo () {
      this.$handsfree.disablePlugins()
      this.$handsfree.update(this.demoOpts)
    }
  }
}
</script>