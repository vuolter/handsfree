# Finger Pointer Playground

<table>
  <tr>
    <td class="col-6"><img src="https://media.giphy.com/media/2vcbWI2ZAPeGvJVpII/source.gif"></td>
    <td class="col-6">
      <h2>Try it</h2>
      <ul>
        <li>Point at the screen to move the pointer 👆</li>
        <li>With palm towards screen 🖐, move hand up and down to scroll</li>
      </ul>
      <HandsfreeToggle text-off="Activate Finger Pointer" text-on="Stop Handsfree" @started='activateFingerPointer' />
    </td>
  </tr>
</table>


The finger pointer estimates a ray from your index/pointer finger onto the screen. It positions a pointer there and you can use the calculated values to all sorts of things which we'll explore!

```js
const handsfree = new Handsfree({face: true})
handsfree.start()

// Where on the screen to position the pointer
handsfree.hand.data.pointer.x
handsfree.hand.data.pointer.y
```

## Plugins used
- `fingerPointer` - calculates and positions a pointer on the screen
- `palmScroll` - scrolls the window or active scroll area

## Scroll focus

<table>
  <tr>
    <td>
      <div class="demo-focus-area">
        <div><div></div></div>
      </div>
      <p><button id="demo-toggle-scroll-speed" onclick="demo.toggleScrollSpeed()" class="block">🐢 Activate slow scrolling</button></p>
    </td>
    <td>
      <div class="demo-focus-area">
        <div><div></div></div>
      </div>
      <p><button id="demo-toggle-scroll-zone" onclick="demo.toggleScrollZone()" class="block">↕ Decrease scroll zone</button></p>
    </td>
  </tr>
</table>

## Calibrating

> ⌚ More info coming soon

## Changing scroll speed

> ⌚ More info coming soon

## Changing other properties

> ⌚ More info coming soon

## Extending the Face Pointer

> ⌚ More info coming soon

## Contributing

> ⌚ More info coming soon


<!-- Code -->
<script>
export default {
  methods: {
    activateFingerPointer () {
      console.log('started')
    }
  }
}
</script>