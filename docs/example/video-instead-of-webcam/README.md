# Using a `<video>` source instead of the webcam

<div class="row align-top">
  <div class="col-6">
    <video id="demo-video" crossOrigin="anonymous" style="width: 100% !important; height: auto !important" controls muted autoplay loop>
      <source src="https://media.giphy.com/media/fuqOHTeelZdChAkx2s/giphy.mp4"></source>
    </video>
  </div>
  <div class="col-6">
    <Window title="Demo">
        <div>
          <HandsfreeToggle class="full-width handsfree-hide-when-started-without-hands" text-off="Run models on video" text-on="Stop running models on video" :opts="demoOpts" :hide-icon="true" />
          <button class="handsfree-show-when-started-without-hands handsfree-show-when-loading" disabled><Fa-Spinner spin /> Loading...</button>
          <button class="handsfree-show-when-started-without-hands handsfree-hide-when-loading" @click="startDemo">Run models on video</button>
        </div>
      </Window>
  </div>
</div>

Depending on your application you may sometimes want to run the models on a pre-recorded video or livestream. To do that, set the `setup.video.$el` config to the `<video>` element containing your video source:

```js
// During instantiation
handsfree = new Handsfree({
  hands: true,
  setup: {
    video: {
      // This element must contain a [src=""] attribute or <source /> with one
      $el: document.querySelector('#my-video')
    }
  }
})

handsfree.start()
```

You can also switch to a video element if you were previously using the webcam with:

```js
// After instantiation
handsfree.update({
  setup: {
    video: {
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

      weboji: false,
      hands: true,
      pose: false,
      handpose: false,
      facemesh: false,

      setup: {video: {$el: null}}
    }
  }),

  /**
   * Set the video source
   */
  mounted () {
    this.demoOpts.setup.video.$el = document.querySelector('#demo-video')
  },

  methods: {
    startDemo () {
      window.handsfree.disablePlugins()
      window.handsfree.update(this.demoOpts)
    }
  }
}
</script>