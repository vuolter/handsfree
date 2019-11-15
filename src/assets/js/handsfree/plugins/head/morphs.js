/**
 * Handles extra calculations for head morphs
 */
window.Handsfree.use('headMorphs', ({ pose, config }) => {
  const morphs = pose.head.morphs
  pose.head.state = pose.head.state || {}

  // Smiles
  pose.head.state.smileRight =
    morphs[0] > config.head.morphs.threshold.smileRight
  pose.head.state.smileLeft = morphs[1] > config.head.morphs.threshold.smileLeft
  pose.head.state.smile =
    pose.head.state.smileRight && pose.head.state.smileLeft
  pose.head.state.smirk =
    (pose.head.state.smileRight && !pose.head.state.smileLeft) ||
    (!pose.head.state.smileRight && pose.head.state.smileLeft)
  pose.head.state.pursed =
    pose.head.morphs[7] > config.head.morphs.threshold.mouthRound

  // Eyebrows
  pose.head.state.browLeftUp =
    morphs[4] > config.head.morphs.threshold.browLeftUp
  pose.head.state.browRightUp =
    morphs[5] > config.head.morphs.threshold.browRightUp
  pose.head.state.browsUp =
    morphs[4] > config.head.morphs.threshold.browLeftUp &&
    morphs[5] > config.head.morphs.threshold.browLeftUp

  pose.head.state.browLeftDown =
    morphs[2] > config.head.morphs.threshold.browLeftDown
  pose.head.state.browRightDown =
    morphs[3] > config.head.morphs.threshold.browRightDown
  pose.head.state.browsDown =
    morphs[2] > config.head.morphs.threshold.browLeftDown &&
    morphs[3] > config.head.morphs.threshold.browLeftDown

  pose.head.state.browsUpDown =
    (pose.head.state.browLeftDown && pose.head.state.browRightUp) ||
    (pose.head.state.browRightDown && pose.head.state.browLeftUp)

  // Eyes
  pose.head.state.eyeLeftClosed =
    morphs[8] > config.head.morphs.threshold.eyeLeftClosed
  pose.head.state.eyeRightClosed =
    morphs[9] > config.head.morphs.threshold.eyeRightClosed
  pose.head.state.eyesClosed =
    pose.head.state.eyeLeftClosed && pose.head.state.eyeRightClosed

  // Mouth
  pose.head.state.mouthClosed = morphs[6] === 0
  pose.head.state.mouthOpen = morphs[6] > config.head.morphs.threshold.mouthOpen
})
