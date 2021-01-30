import merge from 'lodash/merge'

/**
 * The base gesture class
 * - When you do `handsfree.useGesture()` it actually extends this class
 */
export default class BaseGesture {
  constructor (gesture, handsfree) {
    // Props
    this.gesture = gesture
    this.handsfree = handsfree

    // Copy properties and methods from plugin into class
    Object.keys(gesture).forEach((prop) => {
      this[prop] = gesture[prop]
    })

    // handsfree.config.gesture[name] overwrites gesture.config
    let handsfreeGestureConfig = handsfree.config?.gesture?.[gesture.name]
    if (typeof handsfreeGestureConfig === 'boolean') {
      handsfreeGestureConfig = { enabled: handsfreeGestureConfig }
    }

    // Disable plugins via new Handsfree(config)
    if (typeof handsfreeGestureConfig === 'object') {
      merge(this.config, handsfreeGestureConfig)
      if (typeof handsfreeGestureConfig.enabled === 'boolean') {
        this.enabled = handsfreeGestureConfig.enabled
      }
    }
  }

  getGesture () {}

  /**
   * Toggle gesture
   */
  enable () {
    this.enabled = true
  }
  disable () {
    this.enabled = false
  }
}