# Event: `handsfree-gotUserMedia`

This event is triggered on the `document` when the webcam's media stream is received. Currently this is only used for the [handpose model](/ref/model/handpose) but will be applied to other models as well to unify the APIs.

The stream is also available in [handsfree.debug.stream](/ref/prop/debug)

## Receives

event
: An object the webcam stream. Because this is an event the data is stored in `event.detail`

## Example

```js
// Listen for the event
document.addEventListener('handsfree-gotUserMedia', event => {
  console.log(event.detail)
})

// Instantiate
const handsfree = new Handsfree({handpose: true})

// Start handpose so that it gets the media stream
handsfree.start()
```