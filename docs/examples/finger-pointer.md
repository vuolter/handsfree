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
- `fingerPointer` - calculates and positions a pointer on the screen
- `palmScroll` - scrolls the window or active scroll area

## Scroll focus

<table>
  <tr>
    <td style="height: 300px">
      <div style="height: 1000px"></div>
    </td>
    <td style="height: 300px">
      <div style="height: 1000px"></div>
    </td>
  </tr>
</table>

## Calibrating

## Changing scroll speed

## Changing other properties

## Extending the Face Pointer

## Contributing