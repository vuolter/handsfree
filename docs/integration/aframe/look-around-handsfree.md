# A-Frame: "Look around" handsfree

<div class="window mb-md">
  <div class="window-body">
    <div class="row">
      <div class="col-6">
      </div>
      <div class="col-6">
        <h2>Try it!</h2>
        <ul>
          <li>Turn head around to turn the camera</li>
          <li>Move your head to move the camera</li>
        </ul>
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-pose" text-off="Look around Handsfree" text-on="Stop Pose" :opts="demoOpts" />
          <button class="handsfree-show-when-started-without-pose handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-pose handsfree-hide-when-loading" @click="startDemo"><Fa-Video /> Look around Handsfree</button>
        </div>
      </div>
    </div>
  </div>
</div>

<div>
  <iframe id="aframe" src="/integration/aframe/look-around-handsfree/index.html" style="width: 100%; height: 350px"></iframe>
</div>



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
        z: weboji.translation[2] * 10,
        yaw: -weboji.rotation[0] * 180 / Math.PI * 3 + 45,
        pitch: -weboji.rotation[1] * 180 / Math.PI * 3,
        roll: weboji.rotation[2] * 180 / Math.PI * 3
      })
      console.log(weboji, weboji.translation)
      $rig.setAttribute('position', `${tween.x} ${tween.y} ${tween.z}`)
      $rig.setAttribute('rotation', `${tween.yaw} ${tween.pitch} ${tween.roll}`)
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