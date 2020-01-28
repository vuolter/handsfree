export default class GestureRecorder {
  /**
   * (∩｀-´)⊃━☆ﾟ.*・｡ﾟ GestureRecorder
   *
   * @param {Object} config The handsfree instance config
   */
  constructor(config = {}) {
    // Shorthand to this class' config
    this.config = config.gestureRecorder
    // Collections of recordings
    this.recordings = []

    // Overlay
    this.overlay = {
      // The wrapping div
      $wrap: this.config.$wrap,
      // The div recieving collecting/training updates
      $message: this.config.$message
    }

    this.createOverlay()
  }

  /**
   * Creates a gesture recording overlay
   */
  createOverlay() {
    // Setup wrapping element
    if (!this.config.$wrap) {
      this.overlay.$wrap = document.createElement('DIV')
      this.overlay.$wrap.classList.add('handsfree-gesture-recorder-wrap')

      document.body.appendChild(this.overlay.$wrap)
    }

    // Setup message container
    if (!this.config.$message) {
      this.overlay.$message = document.createElement('h1')
      this.overlay.$wrap.appendChild(this.overlay.$message)
    }
  }

  /**
   * Start recording a gesture
   * @param {Object} opts Config options
   * @param {Function} onReady Callback to call once recording, training, and saving is done
   */
  record(opts = {}, onReady = null) {
    console.log(opts, onReady)
    // this.recordings.push(new GestureRecording(opts))
  }
}
