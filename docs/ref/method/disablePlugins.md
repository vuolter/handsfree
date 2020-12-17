---
prev: /ref/method/
---
# Method: `handsfree.disablePlugins()`

```js
handsfree.disablePlugins(tags)
```

When you [handsfree.use()](/ref/method/use) a plugin you have the option of setting its tags. When running `handsfree.disablePlugins()` it will search through all plugins and disable the ones that contain any of those tags. If no tags are passed then all plugins are disabled.

This can be used along with [handsfree.enablePlugins()](/ref/method/enablePlugins) to instantly swap out entire user experiences by tag.

## Parameters

tags: string | array
: (optional) A tag or list of tags in all plugins to disable. Pass `null` to disable them all.

## Example

```js
const handsfree = new Handsfree({holistic: true})

// First enable all the browser plugins
handsfree.enablePlugins('browser')

// Now disable the ones for the face
handsfree.disablePlugins('face')
```