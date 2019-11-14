const PointerLockControls = require('@/assets/js/lib/PointerLockControls')
  .PointerLockControls
const THREE = window.THREE
const $world = document.querySelector('#world')

let camera, scene, renderer, controls
let objects = []
let raycaster
let prevTime = performance.now()
let velocity = new THREE.Vector3()
let direction = new THREE.Vector3()
let vertex = new THREE.Vector3()
let color = new THREE.Color()
let i
let l
let keepRunning = true

/**
 * Initialize the world
 * @param instance The Handsfree instance to work with
 */
const initWorld = function(instance) {
  let light

  // Create and position the camera
  camera = new THREE.PerspectiveCamera(
    75,
    $world.clientWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.y = 10

  // Setup the scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)
  scene.fog = new THREE.Fog(0xffffff, 0, 750)
  light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75)
  light.position.set(0.5, 1, 0.75)

  // Create the controls and add them to the scene
  scene.add(light)
  controls = new PointerLockControls(camera, document.body)
  scene.add(controls.getObject())

  // Create the raycaster
  raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    10
  )

  // Create the floor
  let floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100)
  floorGeometry.rotateX(-Math.PI / 2)

  // vertex displacement
  let position = floorGeometry.attributes.position
  for (i = 0, l = position.count; i < l; i++) {
    vertex.fromBufferAttribute(position, i)
    vertex.x += Math.random() * 20 - 10
    vertex.y += Math.random() * 2
    vertex.z += Math.random() * 20 - 10
    position.setXYZ(i, vertex.x, vertex.y, vertex.z)
  }

  // Tesselate the floor
  floorGeometry = floorGeometry.toNonIndexed()
  position = floorGeometry.attributes.position

  // Create purpleish colors and add them to floor
  let colors = []
  for (i = 0, l = position.count; i < l; i++) {
    color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75)
    colors.push(color.r, color.g, color.b)
  }
  floorGeometry.setAttribute(
    'color',
    new THREE.Float32BufferAttribute(colors, 3)
  )
  let floorMaterial = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors
  })
  let floor = new THREE.Mesh(floorGeometry, floorMaterial)
  scene.add(floor)

  // Create cubes
  let boxGeometry = new THREE.BoxBufferGeometry(20, 20, 20)
  boxGeometry = boxGeometry.toNonIndexed() // ensure each face has unique vertices
  position = boxGeometry.attributes.position
  colors = []
  for (i = 0, l = position.count; i < l; i++) {
    color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75)
    colors.push(color.r, color.g, color.b)
  }
  boxGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  for (i = 0; i < 500; i++) {
    let boxMaterial = new THREE.MeshPhongMaterial({
      specular: 0xffffff,
      flatShading: true,
      vertexColors: THREE.VertexColors
    })
    boxMaterial.color.setHSL(
      Math.random() * 0.2 + 0.5,
      0.75,
      Math.random() * 0.25 + 0.75
    )
    let box = new THREE.Mesh(boxGeometry, boxMaterial)
    box.position.x = Math.floor(Math.random() * 20 - 10) * 20
    box.position.y = Math.floor(Math.random() * 20) * 20 + 10
    box.position.z = Math.floor(Math.random() * 20 - 10) * 20
    scene.add(box)
    objects.push(box)
  }

  // Generate the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize($world.clientWidth, window.innerHeight)
  $world.appendChild(renderer.domElement)

  // Make sure the world always fills the screen
  window.addEventListener('resize', onWindowResize, false)

  // Start the animation loop
  animate(instance)
}

/**
 * Resize the world
 */
const onWindowResize = function() {
  camera.aspect = $world.clientWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize($world.clientWidth, window.innerHeight)
}

/**
 * The main animation loop
 * @param {*} instance The handsfree instance
 */
const animate = (instance) => {
  keepRunning && requestAnimationFrame(animate.bind(instance, instance))

  raycaster.ray.origin.copy(controls.getObject().position)
  raycaster.ray.origin.y -= 10
  let intersections = raycaster.intersectObjects(objects)
  let onObject = intersections.length > 0
  let time = performance.now()
  let delta = (time - prevTime) / 1000
  velocity.x -= velocity.x * 10.0 * delta
  velocity.z -= velocity.z * 10.0 * delta

  instance.velocity.y -= 9.8 * 100.0 * delta // 100.0 = mass
  direction.z = Number(instance.move.forward) - Number(instance.move.backward)
  direction.x = Number(instance.move.right) - Number(instance.move.left)
  direction.normalize() // this ensures consistent movements in all directions
  if (instance.move.forward || instance.move.backward)
    velocity.z -= direction.z * 400.0 * delta
  if (instance.move.left || instance.move.right)
    velocity.x -= direction.x * 400.0 * delta
  if (onObject === true) {
    instance.velocity.y = Math.max(0, instance.velocity.y)
    instance.move.jump = true
  }
  controls.moveRight(-velocity.x * delta)
  controls.moveForward(-velocity.z * delta)
  controls.getObject().position.y += instance.velocity.y * delta // new behavior
  if (controls.getObject().position.y < 10) {
    instance.velocity.y = 0
    controls.getObject().position.y = 10
    instance.move.jump = true
  }

  controls.getObject().rotation.y = instance.rotation.y

  prevTime = time
  renderer.render(scene, camera)
}

/**
 * End the loop
 */
const endWorld = function() {
  keepRunning = false
}

export { initWorld, endWorld }
