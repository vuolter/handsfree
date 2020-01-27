/**
 * Hides the pointer after numFramesToGhost frames
 */
window.Handsfree.use('weboji.ghostedPointer', {
  // Disable by default
  enabled: false,
  // Number of frames held still
  framesStill: 0,

  config: {
    // Number of frames held to ghost a pointer
    numFramesToGhost: 90,
    // Number of pixels required to update number frames held
    distToReset: 6
  },

  last: {
    x: 0,
    y: 0
  },

  onDisable({ weboji }) {
    weboji.pointer.$el.classList.remove('handsfree-pointer-hidden')
  },

  /**
   * Handles ghosting
   */
  onFrame({ weboji }) {
    const dist = Math.sqrt(
      Math.pow(this.last.x - weboji.pointer.x, 2) +
        Math.pow(this.last.y - weboji.pointer.y, 2)
    )

    if (dist < this.config.distToReset) {
      this.framesStill += 1
    } else {
      this.framesStill = 0
    }

    if (this.framesStill > this.config.numFramesToGhost) {
      weboji.pointer.$el.classList.add('handsfree-pointer-hidden')
    } else {
      weboji.pointer.$el.classList.remove('handsfree-pointer-hidden')
    }

    this.last.x = weboji.pointer.x
    this.last.y = weboji.pointer.y
  }
})
