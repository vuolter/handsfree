# 🔌 Plugins and the main loop

When you run [handsfree.start()](/ref/method/start) a loop is started that does 3 things:

1. Synchronously updates all models and stores their data in `handsfree.model[modelName].data`
2. Triggers a `handsfree-data` event on the `document` with an object containing all the data
3. Runs all active plugins stored in `handsfree.plugin[pluginName]`

## Basic plugins

## Toggling plugins on and off

## Complex plugins

## Accessing data outside of a plugin

### Through `handsfree-data`

### Through `handsfree.model[modelName].data`