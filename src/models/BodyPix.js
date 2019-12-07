const Handsfree = window.Handsfree
import * as bodyPix from '@tensorflow-models/body-pix'

Handsfree.prototype.loadBodyPix = async function() {
  if (!this.config.models.bodypix.sdk) {
    console.log('LOADING BODYPIX...')
    this.config.models.bodypix.sdk = await bodyPix.load()
    console.log('...READY')
    this.emit('dependenciesReady')
  }
}
