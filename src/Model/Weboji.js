import BaseModel from './index'
import { trim } from 'lodash'

export default class WebojiModel extends BaseModel {
  constructor(...args) {
    super(...args)
  }

  init() {
    this.load(
      trim(this.config.modelPath, '/') + '/models/jeelizFaceTransfer.js',
      () => {
        console.log('ready')
      }
    )
  }
}
