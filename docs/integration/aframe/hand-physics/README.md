# A-Frame: Hand physics

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6">
        <img src="https://media3.giphy.com/media/YOPrRX6vTy6tb3frgt/giphy.gif">
      </div>
      <div class="col-6">
        <h2>Try it!</h2>
        <ul>
          <li>Move hand around to interact with environment</li>
          <li>Move your head to move the camera</li>
          <li><a href="https://codepen.io/MIDIBlocks/pen/wvzqbXr">Try it on CodePen</a></li>
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

<Window title="Look around the A-Frame Handsfree" style="height: 500px" :maximize='true'>
  <iframe id="aframe" src="/integration/aframe/look-around-handsfree/index.html" style="width: 100%; height: 100%"></iframe>
</Window>

## The basic approach

## Adding Tweening


## Boilerplate

The following is the boilerplate located [in the repo at /boilerplate/aframe/hand-physics/index.html](https://github.com/MIDIBlocks/handsfree/tree/master/boilerplate/aframe/hand-physics/index.html). You can also [play with this demo on CodePen](https://codepen.io/MIDIBlocks/pen/wvzqbXr), or by copy/pasting the following into a local `.html` file without a server.

<<< @/boilerplate/aframe/look-around-handsfree/index.html



<script>
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
      handpose: false,
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
      if (!weboji.isDetected) return

      // Calculate rotation
      const rot = weboji.degree
      rot[0] -= 15
      
      // Calculate position
      const pos = {
        x: (weboji.translation[0] - .5) * 10,
        y: (weboji.translation[1] - .5) * 5,
        z: 5 - weboji.translation[2] * 30
      }

      // Tween this values
      window.handsfree.TweenMax.to(tween, 1, {
        yaw: -rot[0] * 1.5,
        pitch: -rot[1] * 1.5,
        roll: rot[2] * 1.5,
        x: pos.x,
        y: pos.y,
        z: pos.z
      })
      
      // Use the tweened values instead of the actual current values from webcam
      $rig.setAttribute('rotation', `${tween.yaw} ${tween.pitch} ${tween.roll}`)
      $rig.setAttribute('position', `${tween.x} ${tween.y} ${tween.z}`)
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
      window.handsfree.disablePlugins()
      window.handsfree.update(this.demoOpts)
    }
  }
}
</script>