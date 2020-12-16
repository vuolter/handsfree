---
prev: /ref/event/
---
# Event: `handsfree-data`

This event is triggered on the `document` on each frame after [handsfree.start()](/ref/method/start). It receives an object containing data for each active model. This is a great

## Receives

event
: An object containing {[weboji](/ref/model/weboji), [holistic](/ref/model/holistic), [handpose](/ref/model/handpose)} with data for each. Because this is an event the data is stored in `event.detail`

## Example

```js
// Listen for the event
document.addEventListener('handsfree-modelData', event => {
  const data = event.detail
  console.log(data.weboji, data.handpose)
})

// Instantiate
const handsfree = new Handsfree({weboji: true, handpose: true})

// Start collecting data
handsfree.start()
```