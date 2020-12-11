# Method: `handsfree.start()`

```js
handsfree.start(callback)
```

Loads tracker dependencies, starts the webcam, and starts the main loop. Calls an optional `callback` just before the first frame.

## Parameters

callback: function
: (optional) A function to call after dependencies are loaded but just before the first frame