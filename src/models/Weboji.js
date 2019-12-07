import { trimStart } from 'lodash'
import { loadAndWait } from '../Helpers'

const Handsfree = window.Handsfree

/**
 * Load the Weboji library
 * @see https://github.com/jeeliz/jeelizWeboji
 */
Handsfree.prototype.loadWebojiDependencies = function() {
  // @FIXME let's use this.models.head.sdk
  if (!this.model.head.sdk) {
    loadAndWait(
      [trimStart(Handsfree.libSrc + 'models/jeelizFaceTransfer.js', '/')],
      () => {
        this.emit('dependenciesReady')
      }
    )
  } else {
    this.emit('dependenciesReady')
  }
}
