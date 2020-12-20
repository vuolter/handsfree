---
prev: /ref/prop/
---

# Prop: `handsfree.config`

Contains a sanitized copy of the object you instantiated Handsfree with:

```js
const config = {}
const handsfree = new Handsfree(config)

// Since you passed an empty object, this will contain all the defaults
console.log(handsfree.config)
```

The sanitization process simply adds default values for any options you specifically did not provide. Passing an empty object will result in `handsfree.config` having all the defaults [listed below](#the-full-list). The recommended way to update this config is with [handsfree.update](/ref/method/update/)

## `.assetsPath`

**Default**: `https://unpkg.com/handsfree@8.0.4/build/lib/assets`

In order to keep page loads snappy the models are loaded only when needed, and because Handsfree.js is designed to power webapps they are hosted on a CDN. However, you can click here to [download a zip file containing the models](https://github.com/MIDIBlocks/handsfree/archive/master.zip) and copy over the `/build/lib/assets/` folder into your projects public folder to host them yourself.

With your models extracted, set the `assetsPath` to your folder:

```js
const handsfree = new Handsfree({
  weboji: true,
  assetsPath: '/my/public/assets/'
})

handsfree.start()
```
If there's an error, a [modelError event](/ref/event/modelError/) will be triggered and along with console message which you can use to zero in on the correct folder.

## `.setup.canvas[modelName]`

**Default**:
```js
{
  // The canvas element to hold the skeletons and keypoints
  // - Will automatically get created and injected into .setup.wrap if null
  $el: null,

  // These are currently automatically set
  // width: 1280,
  // height: 720
}
```

## `.setup.video`

**Default**:
```js
{
  // The video element to hold the webcam stream
  // - Will automatically get created and injected into .setup.wrap if null
  $el: null,

  // These are currently automatically set by the model (see the model config)
  // width: 1280,
  // height: 720
}
```

## `.setup.wrap`

**Default**:
```js
{
  // The element that holds the video and canvas overlay
  // - Will automatically get created and injected into .setup.wrap if null
  $el: null,

  // The element to inject the setup wrapper into
  $parent: document.body
}
```
## `.handpose`

See the [Handpose Model](/ref/model/handpose/#configuration) page

## `.holistic`

See the [Holistic Model](/ref/model/holistic/#configuration) page

## `.weboji`

See the [Weboji Model](/ref/model/weboji/#configuration) page

## The Full List

The following is a copy of the actual default object used by Handsfree.js. This page will be better organized, but for now please refer to the defaults below:

<<< @/src/defaultConfig.js