# 🔌 Plugins and the main loop

When you run [handsfree.start()](/ref/method/start) a loop is started that does 3 things:

1. Synchronously updates all models and stores their data in `handsfree.model[modelName].data`
2. Triggers a `handsfree-data` event on the `document` with an object containing all the data
3. Runs all active plugins stored in `handsfree.plugin[pluginName]`

"Plugins" are the recommended way of working with Handsfree. All enabled plugins run their logic on every frame, can be attached to specific models, toggled on/off by tag, and can even manipulate your `handsfree` instance and other plugins.

## Basic plugins

Basic plugins are created with [handsfree.use(pluginName, callback)](/ref/method/use):

```js
// A plugin that console logs your data on every frame
handsfree.use('consoleLogger', data => {
  console.log(data)
})
```

The above will create a new plugin that can now be accessed with `handsfree.plugin.consoleLogger` and will be run on every frame.

## Toggling plugins on and off

## Complex plugins

## Accessing data outside of a plugin

### Through `handsfree-data`

### Through `handsfree.model[modelName].data`