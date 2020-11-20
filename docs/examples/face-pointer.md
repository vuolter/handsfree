# Face Pointer

<table>
  <tr>
    <td class="col-6"><img src="https://media.giphy.com/media/Iv2aSMS0QTy2P5JNCX/source.gif"></td>
    <td class="col-6">
      <h2>Try it</h2>
      <ul>
        <li>Move head to move red pointer</li>
        <li>Smile to the left or right to click on things</li>
        <li>Move pointer above/or below page to scroll</li>
      </ul>
      <HandsfreeToggle text-off="Activate Face Pointer" text-on="Stop Handsfree" />
    </td>
  </tr>
</table>


The face pointer detects your heads rotation and position in space and from that (very roughly) determines where your forehead is pointed towards on the screen. It positions a pointer there and you can use the calculated values to all sorts of things which we'll explore!

```js
const handsfree = new Handsfree({face: true})
handsfree.start()

// Where on the screen to position the pointer
handsfree.face.data.pointer.x
handsfree.face.data.pointer.y
```

## Plugins used
- `facePointer` - calculates and positions a pointer on the screen
- `faceScroll` - scrolls the window or active scroll area
- `faceClick` - triggers a click event when a gesture is performed

## Scroll focus

## Calibrating

## Changing click gesture

## Changing scroll speed

## Changing other properties

## Extending the Face Pointer

## Contributing