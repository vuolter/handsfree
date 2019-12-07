import { loadAndWait } from '../Helpers'

const Handsfree = window.Handsfree

/**
 * Begins loading BodyPix
 */
Handsfree.prototype.loadBodyPixDependencies = async function() {
  if (!this.model.bodypix.sdk) {
    loadAndWait(
      [
        Handsfree.libSrc + 'models/tfjs@1.2.js',
        Handsfree.libSrc + 'models/body-pix@2.0.js'
      ],
      () => {
        console.log('bodypix ready')
        this.emit('dependenciesReady')
      }
    )
  }
}
