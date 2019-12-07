import { trimStart } from 'lodash'

const Handsfree = window.Handsfree

/**
 * Load the Weboji library
 * @see https://github.com/jeeliz/jeelizWeboji
 */
Handsfree.prototype.loadWebojiDependencies = function() {
  if (!this.model.head.sdk) {
    this.loadAndWait(
      [trimStart(Handsfree.libSrc + 'models/jeelizFaceTransfer.js', '/')],
      () => {
        this.bindWeboji()
      }
    )
  } else {
    this.bindWeboji()
  }
}

/**
 * Bind the SDK classes to handsfree properties
 */
Handsfree.prototype.bindWeboji = function() {
  this.model.head.sdk = window.JEEFACETRANSFERAPI
  this.trackerHelper = window.JEELIZ_RESIZER
  this.config.autostart && this.start()
}
