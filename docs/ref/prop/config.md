# Prop: `handsfree.config`

Contains a sanitized copy of the object you instantiated Handsfree with:

```js
const config = {}
const handsfree = new Handsfree(config)

// Since you passed an empty object, this will contain all the defaults
console.log(handsfree.config)
```

The sanitization process simply adds default values for any options you specifically did not provide. Passing `null` an empty object will result in `handsfree.config` having all the defaults.