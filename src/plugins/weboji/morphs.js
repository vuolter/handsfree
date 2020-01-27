/**
 * Handles extra calculations for weboji morphs
 */
window.Handsfree.use('weboji.morphs', ({ weboji, config }) => {
  const morphs = weboji.morphs
  weboji.state = weboji.state || {}

  // Smiles
  weboji.state.smileRight =
    morphs[0] > config.weboji.morphs.threshold.smileRight
  weboji.state.smileLeft = morphs[1] > config.weboji.morphs.threshold.smileLeft
  weboji.state.smile = weboji.state.smileRight && weboji.state.smileLeft
  weboji.state.smirk =
    (weboji.state.smileRight && !weboji.state.smileLeft) ||
    (!weboji.state.smileRight && weboji.state.smileLeft)
  weboji.state.pursed =
    weboji.morphs[7] > config.weboji.morphs.threshold.mouthRound

  // Eyebrows
  weboji.state.browLeftUp =
    morphs[4] > config.weboji.morphs.threshold.browLeftUp
  weboji.state.browRightUp =
    morphs[5] > config.weboji.morphs.threshold.browRightUp
  weboji.state.browsUp =
    morphs[4] > config.weboji.morphs.threshold.browLeftUp &&
    morphs[5] > config.weboji.morphs.threshold.browLeftUp

  weboji.state.browLeftDown =
    morphs[2] > config.weboji.morphs.threshold.browLeftDown
  weboji.state.browRightDown =
    morphs[3] > config.weboji.morphs.threshold.browRightDown
  weboji.state.browsDown =
    morphs[2] > config.weboji.morphs.threshold.browLeftDown &&
    morphs[3] > config.weboji.morphs.threshold.browLeftDown

  weboji.state.browsUpDown =
    (weboji.state.browLeftDown && weboji.state.browRightUp) ||
    (weboji.state.browRightDown && weboji.state.browLeftUp)

  // Eyes
  weboji.state.eyeLeftClosed =
    morphs[8] > config.weboji.morphs.threshold.eyeLeftClosed
  weboji.state.eyeRightClosed =
    morphs[9] > config.weboji.morphs.threshold.eyeRightClosed
  weboji.state.eyesClosed =
    weboji.state.eyeLeftClosed && weboji.state.eyeRightClosed

  // Mouth
  weboji.state.mouthClosed = morphs[6] === 0
  weboji.state.mouthOpen = morphs[6] > config.weboji.morphs.threshold.mouthOpen
})
