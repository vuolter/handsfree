import BaseModel from './index.js'

/**
 * @see https://github.com/tensorflow/tfjs-models/tree/master/handpose
 */
export default class Handpose extends BaseModel {
  constructor(...args) {
    super(...args)

    this.data = {}

    // Various THREE variables
    this.three = {
      scene: null,
      camera: null,
      renderer: null,
      meshes: []
    }

    // landmark indices that represent the palm
    // 8 = Index finger tip
    // 12 = Middle finger tip
    this.palmPoints = [0, 1, 2, 5, 9, 13, 17]

    this.fingerLookupIndices = {
      thumb: [0, 1, 2, 3, 4],
      indexFinger: [0, 5, 6, 7, 8],
      middleFinger: [0, 9, 10, 11, 12],
      ringFinger: [0, 13, 14, 15, 16],
      pinky: [0, 17, 18, 19, 20]
    }
  }

  /**
   * Called when depenencies are loaded
   * - Sets up camera
   * - Sets up Three.js
   * 
   * @todo is async necessary?
   */
   onDepsLoaded () {
    this.handsfree.getUserMedia(async () => {
      await tf.setBackend('webgl');
      this.api = await handpose.load()

      this.setup3D()

      this.isReady = true
      this.emit('modelLoaded')
      document.body.classList.add('handsfree-model-handpose')
    })
  }

  /**
   * Sets up the 3D environment
   */
  setup3D () {
    // Setup Three
    this.three = {
      scene: new window.THREE.Scene(),
      camera: new window.THREE.PerspectiveCamera(90, window.outerWidth / window.outerHeight, 0.1, 1000),
      renderer: new THREE.WebGLRenderer(),
      meshes: []
    }
    this.three.renderer.setSize(window.outerWidth, window.outerHeight)
    this.three.renderer.domElement.classList.add('handsfree-handpose-canvas')
    this.handsfree.feedback.$wrap.appendChild(this.three.renderer.domElement)
    this.three.camera.position.z = -this.handsfree.feedback.$video.videoWidth / 2
    this.three.camera.lookAt(new window.THREE.Vector3(0, 0, 0))

    // Camera plane
    this.three.screen = new window.THREE.Mesh(
      // new window.THREE.PlaneGeometry(window.outerWidth, window.outerHeight),
      new window.THREE.BoxGeometry(window.outerWidth, window.outerHeight, 1),
      new window.THREE.MeshNormalMaterial()
    )
    this.three.screen.position.z = 300
    this.three.scene.add(this.three.screen)

    // Camera raycaster
    this.three.raycaster = new window.THREE.Raycaster()
    this.three.arrow = new window.THREE.ArrowHelper(this.three.raycaster.ray.direction, this.three.raycaster.ray.origin, 300, 0xff0000)
    this.three.scene.add(this.three.arrow)

    // Create model representations (one for each keypoint)
    for (let i = 0; i < 21; i++){
      const {isPalm} = this.getLandmarkProperty(i)
    
      const obj = new window.THREE.Object3D() // a parent object to facilitate rotation/scaling
    
      // we make each bone a cylindrical shape, but you can use your own models here too
      const geometry = new window.THREE.CylinderGeometry(isPalm ? 5 : 10, 5, 1)
    
      let material = new window.THREE.MeshNormalMaterial()
    
      const mesh = new window.THREE.Mesh(geometry, material)
      mesh.rotation.x = Math.PI / 2
    
      obj.add(mesh)
      this.three.scene.add(obj)
      this.three.meshes.push(obj)
    }

    // Create center of palm
    const obj = new window.THREE.Object3D()
    const geometry = new window.THREE.CylinderGeometry(5, 5, 1)
    let material = new window.THREE.MeshNormalMaterial()
  
    const mesh = new window.THREE.Mesh(geometry, material)
    mesh.rotation.x = Math.PI / 2
  
    this.three.centerPalmObj = obj
    obj.add(mesh)
    this.three.scene.add(obj)
    this.three.meshes.push(obj)    
  }

  // compute some metadata given a landmark index
  // - is the landmark a palm keypoint or a finger keypoint?
  // - what's the next landmark to connect to if we're drawing a bone?
  getLandmarkProperty (i) {
    const palms = [0, 1, 2, 5, 9, 13, 17] //landmark indices that represent the palm

    const idx = palms.indexOf(i)
    const isPalm = idx != -1
    let next // who to connect with?

    if (!isPalm) { // connect with previous finger landmark if it's a finger landmark
      next = i - 1
    }else{ // connect with next palm landmark if it's a palm landmark
      next = palms[(idx + 1) % palms.length]
    }

    return {isPalm, next}
  }

  /**
   * update threejs object position and orientation from the detected hand pose
   * threejs has a "scene" model, so we don't have to specify what to draw each frame,
   * instead we put objects at right positions and threejs renders them all
   * @param {*} hand 
   */
  updateMeshes (hand) {
    for (let i = 0; i < this.three.meshes.length - 1 /* palmbase */; i++) {
      const {next} = this.getLandmarkProperty(i)
  
      const p0 = this.webcam2space(...hand.landmarks[i])  // one end of the bone
      const p1 = this.webcam2space(...hand.landmarks[next])  // the other end of the bone
  
      // compute the center of the bone (midpoint)
      const mid = p0.clone().lerp(p1, 0.5)
      this.three.meshes[i].position.set(mid.x, mid.y, mid.z)
  
      // compute the length of the bone
      this.three.meshes[i].scale.z = p0.distanceTo(p1)

      // compute orientation of the bone
      this.three.meshes[i].lookAt(p1)

      if (i === 8) {
        this.three.arrow.position.set(mid.x, mid.y, mid.z)
        const direction = new window.THREE.Vector3().subVectors(p0, mid)
        this.three.arrow.setDirection(direction.normalize())
        this.three.arrow.setLength(800)
        this.three.arrow.direction = direction
      }
    }

    this.updateCenterPalmMesh(hand)
  }

  /**
   * Update the palm
   */
  updateCenterPalmMesh (hand) {
    let points = []
    let mid = {
      x: 0,
      y: 0,
      z: 0
    }

    // Get position for the palm
    this.palmPoints.forEach((i, n) => {
      points.push(this.webcam2space(...hand.landmarks[i]))
      mid.x += points[n].x
      mid.y += points[n].y
      mid.z += points[n].z
    })

    mid.x = mid.x / this.palmPoints.length
    mid.y = mid.y / this.palmPoints.length
    mid.z = mid.z / this.palmPoints.length
    
    this.three.centerPalmObj.position.set(mid.x, mid.y, mid.z)
    this.three.centerPalmObj.scale.z = 10
    this.three.centerPalmObj.rotation.x = this.three.meshes[12].rotation.x - Math.PI / 2
    this.three.centerPalmObj.rotation.y = -this.three.meshes[12].rotation.y
    this.three.centerPalmObj.rotation.z = this.three.meshes[12].rotation.z
  }
  
  // transform webcam coordinates to threejs 3d coordinates
  webcam2space (x, y, z) {
    return new window.THREE.Vector3(
      (x-this.handsfree.feedback.$video.videoWidth / 2),
      -(y-this.handsfree.feedback.$video.videoHeight / 2), // in threejs, +y is up
      -z
    )
  }

  /**
   * Runs inference and sets up other data
   */
  async getData () {
    if (!this.handsfree.feedback.$video) return

    const predictions = await this.api.estimateHands(this.handsfree.feedback.$video)

    this.data = {
      ...predictions[0],
      meshes: this.three.meshes
    }

    if (predictions[0]) {
      this.handsfree.handpose.updateMeshes(this.data)
    }
    
    this.handsfree.handpose.three.renderer.render(this.handsfree.handpose.three.scene, this.handsfree.handpose.three.camera)
    return this.data
  }
}
