/**
 * The base gesture class
 * - When you do `handsfree.useGesture()` it actually extends this class
 */
export default class Gesture {
  constructor (gesture, handsfree) {
    // Props
    this.gesture = gesture
    this.handsfree = handsfree

    // Copy properties and methods from plugin into class
    Object.keys(gesture).forEach((prop) => {
      this[prop] = gesture[prop]
    })
  }

  /**
   * Toggle gesture
   */
  enable () {
    !this.enabled && this.onEnable && this.onEnable(this.handsfree)
    this.enabled = true
  }
  disable () {
    this.enabled && this.onDisable && this.onDisable(this.handsfree)
    this.enabled = false
  }
}