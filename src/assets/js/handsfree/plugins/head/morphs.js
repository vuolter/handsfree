/**
 * Handles extra calculations for head morphs
 */
window.Handsfree.use('headMorphs', (pointer, instance) => {
  const morphs = instance.head.morphs
  instance.head.state = instance.head.state || {}

  // Smiles
  instance.head.state.smileRight =
    morphs[0] > instance.config.head.morphs.threshold.smileRight
  instance.head.state.smileLeft =
    morphs[1] > instance.config.head.morphs.threshold.smileLeft
  instance.head.state.smile =
    instance.head.state.smileRight && instance.head.state.smileLeft
  instance.head.state.smirk =
    (instance.head.state.smileRight && !instance.head.state.smileLeft) ||
    (!instance.head.state.smileRight && instance.head.state.smileLeft)
  instance.head.state.pursed =
    instance.head.morphs[7] > instance.config.head.morphs.threshold.mouthRound

  // Eyebrows
  instance.head.state.browLeftUp =
    morphs[4] > instance.config.head.morphs.threshold.browLeftUp
  instance.head.state.browRightUp =
    morphs[5] > instance.config.head.morphs.threshold.browRightUp
  instance.head.state.browsUp =
    morphs[4] > instance.config.head.morphs.threshold.browLeftUp &&
    morphs[5] > instance.config.head.morphs.threshold.browLeftUp

  instance.head.state.browLeftDown =
    morphs[2] > instance.config.head.morphs.threshold.browLeftDown
  instance.head.state.browRightDown =
    morphs[3] > instance.config.head.morphs.threshold.browRightDown
  instance.head.state.browsDown =
    morphs[2] > instance.config.head.morphs.threshold.browLeftDown &&
    morphs[3] > instance.config.head.morphs.threshold.browLeftDown

  instance.head.state.browsHuh =
    (instance.head.state.browLeftDown && instance.head.state.browRightUp) ||
    (instance.head.state.browRightDown && instance.head.state.browLeftUp)

  // Eyes
  instance.head.state.eyeLeftClosed =
    morphs[8] > instance.config.head.morphs.threshold.eyeLeftClosed
  instance.head.state.eyeRightClosed =
    morphs[9] > instance.config.head.morphs.threshold.eyeRightClosed
  instance.head.state.eyesClosed =
    instance.head.state.eyeLeftClosed && instance.head.state.eyeRightClosed

  // Mouth
  instance.head.state.mouthClosed = morphs[6] === 0
  instance.head.state.mouthOpen =
    morphs[6] > instance.config.head.morphs.threshold.mouthOpen
})
