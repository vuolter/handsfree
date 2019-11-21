window.Handsfree.use('head.pointer2', {
  // Pointer elements (1 for each user)
  $pointers: [],

  /**
   * Add a pointer to the dom
   */
  onUse() {
    // @FIXME make this a config
    const NUMUSERS = 1

    if (!this.$pointers.length) {
      for (let i = 0; i < NUMUSERS; i++) {
        const $pointer = document.createElement('div')
        $pointer.classList.add('handsfree-pointer')
        document.body.appendChild($pointer)
        this.$pointers.push($pointer)
      }
    }
  },

  onFrame() {
    console.log(this.$pointers)
  }
})
