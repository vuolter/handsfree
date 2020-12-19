# Method: `handsfree.on()`

```js
handsfree.on(eventName, callback)
```

Listens to an event on the document with `handsfree-${eventName}`. This is basically a helper to:

```js
document.addEventListener(`handsfree-${eventName}`, (event) => {
  callback(event.detail)
})
```

Because this is listening to events, the data will be in the `event.detail` property.

## Parameters

eventName: string
: (required) The event name to listen to, without the `handsfree-` prefix

callback: function
: (required) The callback to call. Receives an `event` object

## Example

```js
const handsfree = new Handsfree({holistic: true})

// Work with data without creating a plugin
handsfree.on('data', event => {
  const data = event.detail
  console.log(data.holistic.faceLandmarks)
})

handsfree.start()
```