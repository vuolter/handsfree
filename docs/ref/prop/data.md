# Prop: `handsfree.data`

This property contains all the data for all the active models and is updated on every frame. Please see the individual [model pages](/ref/model/) to see what data is available for each.

Usually you'll only want to access this property directly when you need it outside of a plugin, like as a result of a user event such as a click or other browser event.

## Example

```js
const handsfree = new Handsfree({weboji: true, handpose: true, holistic: true})

document.addEventListener('someEvent', event => {
  console.log(handsfree.data.weboji, handsfree.data.handpose, handsfree.data.holistic)
})
```

## See Also:

- [Available data on the Weboji model](/ref/model/weboji/#data)
- [Available data on the Handpose model](/ref/model/handpose/#data)
- [Available data on the Holistic model](/ref/model/holistic/#data)