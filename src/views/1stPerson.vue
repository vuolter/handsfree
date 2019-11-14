<template lang="pug">
  div
    #blocker
      #instructions
        p(style="font-size:36px") Click to play
        p <b>Move:</b> Lean left, right, forward, and back
        p <b>Jump:</b> Raise both eyebrows
        p <b>Look:</b> Move head around
    #world
</template>

<script>
export default {
  data: () => ({
    move: {
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false
    },

    velocity: {
      y: 0
    }
  }),

  mounted() {
    this.$store.dispatch('loadScripts', [
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/109/three.min.js'
    ])
    this.initializeGame()
    this.setupHandsfree()
    window.Handsfree.disable('vertScroll')
  },

  beforeDestroy() {
    window.Handsfree.enable('vertScroll')
    window.Handsfree.disable('threeCamera')
  },

  methods: {
    /**
     * Sets up handsfree
     */
    setupHandsfree() {
      window.Handsfree.use('threeCamera', (pointer, instance) => {
        // The normalized amount from center to lean before moving in that directon
        let strafeBuffer = 0.15
        let leanBuffer = {
          out: 0.1,
          in: 0.01
        }

        // Strafe
        if (instance.head.translation[0] > 0.5 + strafeBuffer)
          this.move.right = true
        else this.move.right = false

        if (instance.head.translation[0] < 0.5 - strafeBuffer)
          this.move.left = true
        else this.move.left = false

        // Lean
        if (instance.head.translation[2] > 0.25 + leanBuffer.out)
          this.move.forward = true
        else this.move.forward = false

        if (instance.head.translation[2] < 0.25 - leanBuffer.in)
          this.move.backward = true
        else this.move.backward = false

        // Jump
        if (instance.head.state.browsUp) {
          if (this.move.jump) this.velocity.y += 350
          this.move.jump = false
        }

        console.log(instance.head.translation)
      })
    },

    /**
     * Load pointer lock controls
     */
    initializeGame() {
      setTimeout(() => {
        if (!window.THREE) {
          this.initializeGame()
        } else {
          const PointerLockControls = require('@/assets/js/lib/PointerLockControls')
            .PointerLockControls
          const THREE = window.THREE
          const $world = document.querySelector('#world')

          var camera, scene, renderer, controls
          var objects = []
          var raycaster
          var prevTime = performance.now()
          var velocity = new THREE.Vector3()
          var direction = new THREE.Vector3()
          var vertex = new THREE.Vector3()
          var color = new THREE.Color()
          let i
          let l

          const init = function() {
            camera = new THREE.PerspectiveCamera(
              75,
              window.innerWidth / window.innerHeight,
              1,
              1000
            )
            camera.position.y = 10
            scene = new THREE.Scene()
            scene.background = new THREE.Color(0xffffff)
            scene.fog = new THREE.Fog(0xffffff, 0, 750)
            var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75)
            light.position.set(0.5, 1, 0.75)
            scene.add(light)
            controls = new PointerLockControls(camera, document.body)
            var blocker = document.getElementById('blocker')
            var instructions = document.getElementById('instructions')
            instructions.addEventListener(
              'click',
              function() {
                controls.lock()
              },
              false
            )
            controls.addEventListener('lock', function() {
              instructions.style.display = 'none'
              blocker.style.display = 'none'
            })
            controls.addEventListener('unlock', function() {
              blocker.style.display = 'block'
              instructions.style.display = ''
            })
            scene.add(controls.getObject())

            raycaster = new THREE.Raycaster(
              new THREE.Vector3(),
              new THREE.Vector3(0, -1, 0),
              0,
              10
            )
            // floor
            var floorGeometry = new THREE.PlaneBufferGeometry(
              2000,
              2000,
              100,
              100
            )
            floorGeometry.rotateX(-Math.PI / 2)
            // vertex displacement
            var position = floorGeometry.attributes.position
            for (i = 0, l = position.count; i < l; i++) {
              vertex.fromBufferAttribute(position, i)
              vertex.x += Math.random() * 20 - 10
              vertex.y += Math.random() * 2
              vertex.z += Math.random() * 20 - 10
              position.setXYZ(i, vertex.x, vertex.y, vertex.z)
            }
            floorGeometry = floorGeometry.toNonIndexed() // ensure each face has unique vertices
            position = floorGeometry.attributes.position
            var colors = []
            for (i = 0, l = position.count; i < l; i++) {
              color.setHSL(
                Math.random() * 0.3 + 0.5,
                0.75,
                Math.random() * 0.25 + 0.75
              )
              colors.push(color.r, color.g, color.b)
            }
            floorGeometry.setAttribute(
              'color',
              new THREE.Float32BufferAttribute(colors, 3)
            )
            var floorMaterial = new THREE.MeshBasicMaterial({
              vertexColors: THREE.VertexColors
            })
            var floor = new THREE.Mesh(floorGeometry, floorMaterial)
            scene.add(floor)
            // objects
            var boxGeometry = new THREE.BoxBufferGeometry(20, 20, 20)
            boxGeometry = boxGeometry.toNonIndexed() // ensure each face has unique vertices
            position = boxGeometry.attributes.position
            colors = []
            for (i = 0, l = position.count; i < l; i++) {
              color.setHSL(
                Math.random() * 0.3 + 0.5,
                0.75,
                Math.random() * 0.25 + 0.75
              )
              colors.push(color.r, color.g, color.b)
            }
            boxGeometry.setAttribute(
              'color',
              new THREE.Float32BufferAttribute(colors, 3)
            )
            for (i = 0; i < 500; i++) {
              var boxMaterial = new THREE.MeshPhongMaterial({
                specular: 0xffffff,
                flatShading: true,
                vertexColors: THREE.VertexColors
              })
              boxMaterial.color.setHSL(
                Math.random() * 0.2 + 0.5,
                0.75,
                Math.random() * 0.25 + 0.75
              )
              var box = new THREE.Mesh(boxGeometry, boxMaterial)
              box.position.x = Math.floor(Math.random() * 20 - 10) * 20
              box.position.y = Math.floor(Math.random() * 20) * 20 + 10
              box.position.z = Math.floor(Math.random() * 20 - 10) * 20
              scene.add(box)
              objects.push(box)
            }
            //
            renderer = new THREE.WebGLRenderer({ antialias: true })
            renderer.setPixelRatio(window.devicePixelRatio)
            renderer.setSize(window.innerWidth, window.innerHeight)
            $world.appendChild(renderer.domElement)
            //
            window.addEventListener('resize', onWindowResize, false)
          }
          const onWindowResize = function() {
            camera.aspect = $world.clientWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize($world.clientWidth, window.innerHeight)
          }
          const animate = () => {
            requestAnimationFrame(animate)
            if (controls.isLocked === true) {
              raycaster.ray.origin.copy(controls.getObject().position)
              raycaster.ray.origin.y -= 10
              var intersections = raycaster.intersectObjects(objects)
              var onObject = intersections.length > 0
              var time = performance.now()
              var delta = (time - prevTime) / 1000
              velocity.x -= velocity.x * 10.0 * delta
              velocity.z -= velocity.z * 10.0 * delta
              this.velocity.y -= 9.8 * 100.0 * delta // 100.0 = mass
              direction.z =
                Number(this.move.forward) - Number(this.move.backward)
              direction.x = Number(this.move.right) - Number(this.move.left)
              direction.normalize() // this ensures consistent movements in all directions
              if (this.move.forward || this.move.backward)
                velocity.z -= direction.z * 400.0 * delta
              if (this.move.left || this.move.right)
                velocity.x -= direction.x * 400.0 * delta
              if (onObject === true) {
                this.velocity.y = Math.max(0, this.velocity.y)
                this.move.jump = true
              }
              controls.moveRight(-velocity.x * delta)
              controls.moveForward(-velocity.z * delta)
              controls.getObject().position.y += this.velocity.y * delta // new behavior
              if (controls.getObject().position.y < 10) {
                this.velocity.y = 0
                controls.getObject().position.y = 10
                this.move.jump = true
              }
              prevTime = time
            }
            renderer.render(scene, camera)
          }

          init()
          animate()
        }
      }, 100)
    }
  }
}
</script>

<style>
#blocker {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
#instructions {
  width: 100%;
  height: 100%;
  color: #ffffff;
  text-align: center;
  font-family: Arial;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
  padding-top: 100px;
}
</style>