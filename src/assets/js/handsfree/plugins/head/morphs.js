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
  instance.head.state.pursed = !morphs[0] && !morphs[1]

  // Eyebrows
  instance.head.state.eyebrowUpLeft =
    morphs[4] > instance.config.head.morphs.threshold.eyebrowUpLeft
  instance.head.state.eyebrowUpRight =
    morphs[5] > instance.config.head.morphs.threshold.eyebrowUpRight
  instance.head.state.eyebrowsUp =
    morphs[4] > instance.config.head.morphs.threshold.eyebrowUpLeft &&
    morphs[5] > instance.config.head.morphs.threshold.eyebrowUpLeft

  instance.head.state.eyebrowDownLeft =
    morphs[2] > instance.config.head.morphs.threshold.eyebrowDownLeft
  instance.head.state.eyebrowDownRight =
    morphs[3] > instance.config.head.morphs.threshold.eyebrowDownRight
  instance.head.state.eyebrowsDown =
    morphs[2] > instance.config.head.morphs.threshold.eyebrowDownLeft &&
    morphs[3] > instance.config.head.morphs.threshold.eyebrowDownLeft

  instance.head.state.eyebrowsHuh =
    (instance.head.state.eyebrowDownLeft &&
      instance.head.state.eyebrowUpRight) ||
    (instance.head.state.eyebrowDownRight && instance.head.state.eyebrowUpLeft)

  // Eyes
  instance.head.state.eyeClosedLeft =
    morphs[8] > instance.config.head.morphs.threshold.eyeClosedLeft
  instance.head.state.eyeClosedRight =
    morphs[9] > instance.config.head.morphs.threshold.eyeClosedRight
  instance.head.state.eyesClosed =
    instance.head.state.eyeClosedLeft && instance.head.state.eyeClosedRight

  // Mouth
})
