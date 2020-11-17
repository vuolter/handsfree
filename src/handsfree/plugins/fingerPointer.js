import { TweenMax } from 'gsap/all'

export default {
  // The pointer element
  $pointer: null,

  // Pointers position
  pointer: { x: 0, y: 0 },

  // Used to smoothen out the pointer
  tween: {
    x: 0,
    y: 0,
    positionList: []
  },

  config: {
    offset: {
      x: 0,
      y: 0,
      // A little nudge for when camera is above screen
      pitch: -15,
      yaw: -12,
      roll: 0
    },

    speed: {
      x: 1,
      y: 1
    }
  },

  /**
   * Create a pointer for each user
   */
  onUse() {
    if (!this.$pointer) {
      const $pointer = document.createElement('div')
      $pointer.classList.add('handsfree-pointer')
      document.body.appendChild($pointer)
      this.$pointer = $pointer
    }

    this.pointer = { x: 0, y: 0 }
  },

  onEnable() {
    this.onUse()
  },

  onFrame({ handpose }) {
    if (!handpose || !handpose.annotations) return

    this.handsfree.handpose.updateMeshes(handpose)
    this.handsfree.handpose.three.renderer.render(this.handsfree.handpose.three.scene, this.handsfree.handpose.three.camera)

    this.handsfree.handpose.three.raycaster.set(this.handsfree.handpose.three.arrow.position, this.handsfree.handpose.three.arrow.direction.normalize())
    const hits = this.handsfree.handpose.three.raycaster.intersectObject(this.handsfree.handpose.three.screen, true)

    if (hits && hits.length) {
      TweenMax.to(this.tween, 1, {
        x: hits[0].point.x,
        y: hits[0].point.y,
        overwrite: true,
        ease: 'linear.easeNone',
        immediate: true
      })

      console.log(hits[0].point.x, hits[0].point.y)
    }

    this.$pointer.style.left = `${this.tween.x}px`
    this.$pointer.style.top = `${this.tween.y}px`
    
    handpose.pointer = {
      x: this.tween.x,
      y: this.tween.y
    }

    // Get X/Y as if pointing perfectly in the center
    // let x = this.handsfree.normalize(handpose.annotations.indexFinger[0][0], window.outerWidth) * window.outerWidth
    // let y = window.outerHeight - (this.handsfree.normalize(handpose.annotations.indexFinger[0][1], window.outerHeight)) * window.outerHeight
    // let z = 1 - handpose.annotations.indexFinger[0][2]

    // Add pitch/yaw
    // x += z * Math.tan(handpose.meshes[8].rotation.y + (this.config.offset.yaw * Math.PI) / 180)
    //   * this.config.speed.x
    // x += Math.tan(handpose.meshes[8].rotation.y + (this.config.offset.yaw * Math.PI) / 180)
    //   * this.config.speed.x

    // this.handsfree.handpose.three.raycaster.set(handpose.meshes[8].position, handpose.meshes[8].rotation)
    // const target = this.handsfree.handpose.three.raycaster.intersectObject(this.handsfree.handpose.three.scene.children)
    // console.log('🎯 HIT', target)
      
    // y += z * Math.tan(handpose.meshes[8].rotation.x + (this.config.offset.pitch * Math.PI) / 180)
    //   * this.config.speed.y - window.outerHeight

    // Add offsets
    // x += this.config.offset.x
    // // y += this.config.offset.y

    // // // @todo Make the sensitivity variable
    // TweenMax.to(this.tween, 1, {
    //   x,
    //   // y,
    //   overwrite: true,
    //   ease: 'linear.easeNone',
    //   immediate: true
    // })
  },

  /**
   * Toggle pointer
   */
  onDisable() {
    this.$pointer.classList.add('handsfree-hidden')
  },
  onEnable() {
    this.$pointer.classList.remove('handsfree-hidden')
  }
}
