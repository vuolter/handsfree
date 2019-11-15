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

window.Handsfree.use('click', ({ pose, config }) => {
  thresholdMet = false

  Object.keys(config.plugin.click.morphs).forEach((key) => {
    const morph = config.plugin.click.morphs[key]
    if (pose.head.morphs[key] >= morph) thresholdMet = true
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
    pose.head.pointer.state = 'mouseDown'
  else if (mouseDowned > maxMouseDownedFrames)
    pose.head.pointer.state = 'mouseDrag'
  else if (mouseUp) pose.head.pointer.state = 'mouseUp'
  else ''

  // Actually click something (or focus it)
  if (pose.head.pointer.state === 'mouseDown') {
    const $el = document.elementFromPoint(
      pose.head.pointer.x,
      pose.head.pointer.y
    )
    if ($el) {
      $el.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          clientX: pose.head.pointer.x,
          clientY: pose.head.pointer.y
        })
      )

      // Focus
      if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes($el.nodeName))
        $el.focus()
    }
  }
})
