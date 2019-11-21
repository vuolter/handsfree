import { TweenMax } from 'gsap/all'
let tween = {
  x: 0,
  y: 0,
  positionList: []
}

window.Handsfree.use('head.pointer', {
  /**
   * Create a pointer for each user
   */
  onUse({ pose }) {
    // @FIXME make this a config
    const NUMUSERS = 1

    if (!pose.head.pointer.$el) {
      for (let i = 0; i < NUMUSERS; i++) {
        const $pointer = document.createElement('div')
        $pointer.classList.add('handsfree-pointer')
        document.body.appendChild($pointer)
        pose.head.pointer.$el = $pointer
      }
    }
  },

  /**
   * Position the pointer
   */
  onFrame({ pose, config }) {
    // Calculate X/Y
    let rx = (pose.head.rotation[0] * 180) / Math.PI
    let ry = (pose.head.rotation[1] * 180) / Math.PI
    // Compensation for edge cases
    rx -= 10
    // rx = rx + 1 - 4 * (Math.abs(ry) / 45)

    // Clip
    const rxMax = 20
    const ryMax = 30
    if (ry < -ryMax) ry = -ryMax
    if (ry > ryMax) ry = ryMax
    if (rx < -rxMax - 10) rx = -rxMax
    if (rx > rxMax - 10) rx = rxMax

    // Remove some jittering by tweening the rotations values using TweenMax.
    // We could do it without TweenMax: 0.15 seconds is 15% of 1 second, so it tween over 4,5 frames (30 fps)
    // but TweenMax is so convenient for that purpose.
    let tweenFace = tween // our helper for this face index

    // Stabilizer
    const stabilizer = [
      { jitter: 0, tween: 0 },
      { jitter: 0.5, tween: 0.25 },
      { jitter: 5, tween: 1.5 },
      { jitter: 10, tween: 3 }
    ]
    // Number of degrees needed to change before forcing a position (vs tweening it eg stabilizing it)
    const jitterFactor = stabilizer[config.stabilizer.factor].jitter
    // How long to tween while stabilizing. Higher = slower, lower = faster
    let tweenDuration = stabilizer[config.stabilizer.factor].tween
    if (Math.abs(tweenFace.rx - rx) > jitterFactor) {
      tweenDuration = 0.0
    }
    if (Math.abs(tweenFace.ry - ry) > jitterFactor) {
      tweenDuration = 0.0
    }

    TweenMax.to(tweenFace, tweenDuration, {
      rx,
      ry,
      overwrite: true,
      ease: 'Linear.easeNone'
    })

    // ryp and rxp are between -1.0 to 1.0 with slower movements on the edges due to Math.sin
    // Center of screen is (screen.width * 0.5), so eg. 0.5 + 1.0 would be too much over the edge
    let ryp = Math.sin((tweenFace.ry / ryMax) * (Math.PI * 0.5))
    let rxp = Math.sin((tweenFace.rx / rxMax) * (Math.PI * 0.5))

    // Let's reduce the values by 40% to go only 10% over the edge...
    // ryp *= 0.60
    // rxp *= 0.60
    rxp *= config.sensitivity.xy
    ryp *= config.sensitivity.xy

    let _x = window.outerWidth * (ryp + 0.5)
    // let _y = window.outerHeight * (rxp + 0.5)
    let _y = window.outerHeight * rxp + window.outerHeight / 4

    // So at this stage it's a bit less jittering, but to improve the overall placement when the face stands
    // still, let's average out the position over 1 second (30 frames). This will lead to a bit of delay when
    // moving the head fast, but it will greatly improve slow movements.
    if (tweenFace.positionList.length < config.stabilizer.buffer) {
      // add helper objects until the array is full
      tweenFace.positionList.push({ x: _x, y: _y })

      // leave the cursor in the center to get rid
      // of the annoying jumping at start up.
      tweenFace.x = window.outerWidth * 0.5
      tweenFace.y = window.outerHeight * 0.5
    } else {
      const position = tweenFace.positionList.shift()
      position.x = _x
      position.y = _y

      tweenFace.positionList.push(position)

      const numPositions = tweenFace.positionList.length
      let avgX = 0
      let avgY = 0

      for (let n = 0; n < numPositions; n++) {
        avgX += tweenFace.positionList[n].x
        avgY += tweenFace.positionList[n].y
      }

      tweenFace.x = avgX / numPositions
      tweenFace.y = avgY / numPositions
    }

    pose.head.pointer.$el.style.left = `${tweenFace.x}px`
    pose.head.pointer.$el.style.top = `${tweenFace.y}px`
    pose.head.pointer.x = tweenFace.x
    pose.head.pointer.y = tweenFace.y
  }
})
