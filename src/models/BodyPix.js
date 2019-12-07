const Handsfree = window.Handsfree

/**
 * Begins loading BodyPix
 */
Handsfree.prototype.loadBodypixDependencies = async function() {
  if (!this.model.bodypix.sdk) {
    this.loadAndWait([
      Handsfree.libSrc + 'models/tfjs@1.2.js',
      Handsfree.libSrc + 'models/body-pix@2.0.js'
    ])
  }
}

/**
 * Maybe starts bodypix, looping until dependencies are loaded
 */
Handsfree.prototype.maybeStartBodypix = function() {
  console.log('MAYBE START BODYPIX')
}
