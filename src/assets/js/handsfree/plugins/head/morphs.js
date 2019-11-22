/**
 * Handles extra calculations for head morphs
 */
window.Handsfree.use('head.morphs', ({ head, config }) => {
  const morphs = head.morphs
  head.state = head.state || {}

  // Smiles
  head.state.smileRight = morphs[0] > config.head.morphs.threshold.smileRight
  head.state.smileLeft = morphs[1] > config.head.morphs.threshold.smileLeft
  head.state.smile = head.state.smileRight && head.state.smileLeft
  head.state.smirk =
    (head.state.smileRight && !head.state.smileLeft) ||
    (!head.state.smileRight && head.state.smileLeft)
  head.state.pursed = head.morphs[7] > config.head.morphs.threshold.mouthRound

  // Eyebrows
  head.state.browLeftUp = morphs[4] > config.head.morphs.threshold.browLeftUp
  head.state.browRightUp = morphs[5] > config.head.morphs.threshold.browRightUp
  head.state.browsUp =
    morphs[4] > config.head.morphs.threshold.browLeftUp &&
    morphs[5] > config.head.morphs.threshold.browLeftUp

  head.state.browLeftDown =
    morphs[2] > config.head.morphs.threshold.browLeftDown
  head.state.browRightDown =
    morphs[3] > config.head.morphs.threshold.browRightDown
  head.state.browsDown =
    morphs[2] > config.head.morphs.threshold.browLeftDown &&
    morphs[3] > config.head.morphs.threshold.browLeftDown

  head.state.browsUpDown =
    (head.state.browLeftDown && head.state.browRightUp) ||
    (head.state.browRightDown && head.state.browLeftUp)

  // Eyes
  head.state.eyeLeftClosed =
    morphs[8] > config.head.morphs.threshold.eyeLeftClosed
  head.state.eyeRightClosed =
    morphs[9] > config.head.morphs.threshold.eyeRightClosed
  head.state.eyesClosed = head.state.eyeLeftClosed && head.state.eyeRightClosed

  // Mouth
  head.state.mouthClosed = morphs[6] === 0
  head.state.mouthOpen = morphs[6] > config.head.morphs.threshold.mouthOpen
})
