# Method: `handsfree.update()`

```js
handsfree.update(config, callback)
```

This method can be used to update Handsfree in real time, even as it's actively running. The passed [config](/ref/prop/config/) will override the existing one, and the `callback` will get called after all new models are loaded (or immediately if all models are already loaded).

In addition to reconfiguring models, you can also reconfigure plugins or enable/disable them.

## Parameters

config: object
: (required) The new configs to use, properties will overwrite existing ones

callback: function
: (optional) A function to run after the updates have been applied

## Example

```js
const handsfree = new Handsfree({weboji: true})
handsfree.start()

// Turn off weboji and turn on mediapipe holistic
handsfree.update({weboji: false, holistic: true})
```

## See Also

- [Guide: 🎭 Updating and switching models](/guide/updating-configs/)