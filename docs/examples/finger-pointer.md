# Finger Pointer

<table>
  <tr>
    <td class="col-6"><img src="https://media.giphy.com/media/2vcbWI2ZAPeGvJVpII/source.gif"></td>
    <td class="col-6">
      <h2>Try it</h2>
      <ul>
        <li>Point at the screen with a pointer finger 👆</li>
        <li>Point palm towards screen 🖐 and move hand up and down to scroll (while keeping palm towards screen)</li>
      </ul>
      <HandsfreeToggle text-off="Activate Finger Pointer" text-on="Stop Handsfree" />
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
- `facePointer` - calculates and positions a pointer on the screen
- `faceScroll` - scrolls the window or active scroll area
- `faceClick` - triggers a click event when a gesture is performed

## Scroll focus

## Calibrating

## Changing scroll speed

## Changing other properties

## Extending the Face Pointer

## Contributing