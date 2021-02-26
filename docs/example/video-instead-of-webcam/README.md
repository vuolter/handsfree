# Using a `<video>` source instead of the webcam

<div class="row align-top">
  <div class="col-6">
    <video style="width: 100%" controls muted autoplay loop>
      <source src="/video/hand-shape-demo-video.mp4"></source>
    </video>
  </div>
  <div class="col-6">
    <Window title="Demo">
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-weboji" text-off="Run models on video" text-on="Stop Pose" :opts="demoOpts" :hide-icon="true" />
          <button class="handsfree-show-when-started-without-weboji handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-weboji handsfree-hide-when-loading" @click="startDemo">Run models on video</button>
        </div>
      </Window>
  </div>
</div>


Depending on your application you may sometimes want to run the models on a pre-recorded video or livestream. To do that, set the `setup.video.$el` config to the `<video>` element containing:

```js
handsfree = new Handsfree({
  hands: true,
  setup: {
    video: {
      // This element must exist on the page with a [src=""] attribute or <source></source> object pointing to a video
      $el: document.querySelector('#my-video')
    }
  }
})
```



<script>
export default {
  data: () => ({
    demoOpts: {
      autostart: true,

      weboji: true,
      hands: false,
      pose: false,
      handpose: false,
      facemesh: false
    }
  }),

  methods: {
    startDemo () {
      window.handsfree.disablePlugins()
      window.handsfree.update(this.demoOpts)
    }
  }
}
</script>