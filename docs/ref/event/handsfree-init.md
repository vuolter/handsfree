# Event: `handsfree-init`

This event is triggered on the `document` after Handsfree is instantiated with `new Handsfree()`. It receives the `handsfree` instance, configured and ready to go.

## Example

```js
// Listen for the event
document.addEventListener('handsfree-init', ev => {
  // ev.detail === handsfree
  console.log('Handsfree.js has been initialized', ev.detail)
})

// Instantiate
const handsfree = new Handsfree()
```