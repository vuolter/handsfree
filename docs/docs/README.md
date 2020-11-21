# Getting Started

## Instantiating

Once you've [included Handsfree.js](/#quickstart) into your project you'll have a global `Handsfree` class in the `window`'s scope. You'll want to create one instance for every webcam you intend to use, along with some configs.

```js
// Instantiate with the weboji face tracker with defaults
let handsfree = new Handsfree({weboji: true})

// ...or...

// Instantiate and configure the face tracker
// - The following are all defaults (feel free to skip some)
handsfree = new Handsfree({
  // Where the files are
  assetsPath: document.currentScript.getAttribute('src') + '/assets/',

  /**
   * Used to show the webcam feed along with basic debug info
   * @param {Boolean|Object} feedback if boolean,
   *  then this is converted to the default below
   */
  feedback: {
    enabled: false,
    
    // Where to inject the feedback canvas
    $target: document.body
  },

  /**
   * Face tracker
   */
  weboji: {
    // All models are disabled by default!
    enabled: false,
    
    // How many milliseconds to wait between detections
    // - Use to help improve UI performance on slower devices
    throttle: 0,
    
    // Represents the calibrator settings
    // - Minimal CSS styles are provided
    calibrator: {
      // The target element to act as the calibrator wrapping div
      // - automatically created if null
      target: null,
      
      // The message to display over the marker, can be HTML
      instructions: 'Point head towards center of circle below',

      // The target element to act as the calibrator target (should be inside target)
      // - optional if .target === null, otherwise required
      marker: null
    },

    // The confidence (between 0 and 1) required for various face morphs before
    // they are considered activated
    morphs: {
      threshold: {
        smileRight: 0.7,
        smileLeft: 0.7,
        browLeftDown: 0.8,
        browRightDown: 0.8,
        browLeftUp: 0.8,
        browRightUp: 0.8,
        eyeLeftClosed: 0.4,
        eyeRightClosed: 0.4,
        mouthOpen: 0.3,
        mouthRound: 0.8,
        upperLip: 0.5
      }
    }
  }
})
```

Once you've instantiated `Handsfree` you can start and stop it with:

```js
handsfree = new Handsfree({weboji: true})
handsfree.start()

// Currently this just reloads the page
handsfree.stop()
```

## Adding Functionality

By default, the `weboji` face tracker comes bundled with a set of plugins. Plugins add functionality that can be toggled on/off, which is useful when working on complex applications that require different gestures for different views. Plugins can also be overwritten.

Plugins are added with the `handsfree.use('myPlugin', opts)`:

```js
handsfree = new Handsfree({weboji: true})

handsfree.use('myPlugin', {
  // All plugins are true by default
  enabled: true,

  // A set of config values that can be overwritten
  config: {},

  // Called on every single webcam frame
  onFrame (data) {},

  // Called immediate after this plugin is added
  onUse (handsfree) {},

  // Called when the plugin is enabled from a disabled state
  // eg, after calling: handsfree.plugin.myPlugin.enable()
  onEnable (handsfree) {},

  // Called when the plugin is disabled from an enabled state
  // eg, after calling: handsfree.plugin.myPlugin.disable()
  onDisable (handsfree) {}
})
```

You can also pass a function as the second argument, which is assigned to the `.onFrame` callback:

```js
// This...
handsfree.use('myPlugin', data => {
  console.log(data.weboji.data.morphs)
})

// ...is similar to this
handsfree.use('myPlugin', {
  onFrame: data => {
    console.log(data.weboji.data.morphs)
  }
})
```

The `onFrame` method, which is called on every webcam frame, receives a `data` object containing data for each active model...`data.weboji` for Face Tracking and `data.posenet` for Pose Estimation. If you're only using one model, then it's usually easier to destructure:

```js
// This
handsfree.use('myPlugin', {weboji} => {
  console.log(weboji.data)
})

// Instead of this
handsfree.use('myPlugin', data => {
  console.log(data.weboji.data)
})
```

See `/src/demo` and `/src/handsfree/plugins` for examples (simpler ones will be made soon)!

## Toggling functionality on/off

You can use the `.disable` and `.enable` methods of a plugin to toggle them on/off. If a plugin has a `.onDisable` or `.onEnable` then the corresponding method will be called.

```js
handsfree.use('myPlugin', {
  onEnable () {console.log('enabled 😀')},
  onDisable () {console.log('disabled 😞')}
})

handsfree.plugin.myPlugin.enable()
// console: enabled 😀

handsfree.plugin.myPlugin.disable()
// console: disabled 😞
```
## Removing Functionality

You can disable all the pre-packaged plugins with `handsfree.disablePlugins()` or by passing a list of plugin names to disable with `handsfree.disablePlugins(['pluginName'])` or just a string with `handsfree.disablePlugins('pluginName')`.

You can also just delete the plugin with `delete handsfree.plugin['pluginName']`