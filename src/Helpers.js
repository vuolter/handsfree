/**
 * Loads a set of scripts and runs a callback when they're all ready
 * @param {Array} scripts A list of scripts to load
 * @param {Function} cb The callback to run
 */
export function loadAndWait(scripts, cb) {
  let scriptsLoaded = 0
  document.body.classList.add('handsfree-loading')

  scripts.forEach((script) => {
    const $script = document.createElement('script')
    $script.async = true

    // Increment the counter and call callback
    $script.onload = () => {
      if (++scriptsLoaded === scripts.length && cb) {
        document.body.classList.remove('handsfree-loading')
        cb()
      }
      document.getElementsByTagName('head')[0].appendChild($script)
    }

    $script.src = script
    document.body.appendChild($script)
  })
}
