/**
 * Click on things
 */
// Number of frames mouse has been downed
let mouseDowned = 0
// Max number of frames to keep down
let maxMouseDownedFrames = 5
let mouseUp = false
let thresholdMet = false
// For some reason the linter isn't caching this
// eslint-disable-next-line no-unused-vars
let mouseDrag = false

window.Handsfree.use('click', (pointer, handsfree) => {
  thresholdMet = false

  Object.keys(handsfree.config.plugin.click.morphs).forEach((key) => {
    const morph = handsfree.config.plugin.click.morphs[key]
    if (handsfree.head.morphs[key] >= morph) thresholdMet = true
  })

  if (thresholdMet) {
    mouseDowned++
    document.body.classList.add('handsfree-clicked')
  } else {
    mouseUp = mouseDowned
    mouseDowned = 0
    mouseDrag = false
    document.body.classList.remove('handsfree-clicked')
  }

  // Set the state
  if (mouseDowned > 0 && mouseDowned < maxMouseDownedFrames)
    handsfree.pointer.state = 'mouseDown'
  else if (mouseDowned > maxMouseDownedFrames)
    handsfree.pointer.state = 'mouseDrag'
  else if (mouseUp) handsfree.pointer.state = 'mouseUp'
  else ''

  // Actually click something (or focus it)
  if (handsfree.pointer.state === 'mouseDown') {
    const $el = document.elementFromPoint(pointer.x, pointer.y)
    if ($el) {
      $el.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          clientX: pointer.x,
          clientY: pointer.y
        })
      )

      // Focus
      if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes($el.nodeName))
        $el.focus()
    }
  }
})
