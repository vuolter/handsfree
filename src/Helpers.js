import { throttle } from 'lodash'

const Handsfree = window.Handsfree

Handsfree.throttle = throttle

/**
 * Loads a set of scripts and runs a callback when they're all ready
 * @param {Array} scripts A list of scripts to load
 * @param {Function} cb The callback to run
 */
Handsfree.prototype.loadAndWait = function(scripts, cb) {
  let scriptsLoaded = 0
  this._scriptsLoading += scripts.length
  document.body.classList.add('handsfree-loading')

  scripts.forEach((script) => {
    const $script = document.createElement('script')
    $script.async = true

    // Increment the counter and call callback
    $script.onload = () => {
      this._scriptsLoading -= 1

      // Call callback after this set of scripts is loaded
      if (++scriptsLoaded === scripts.length && cb) {
        cb()
      }

      // Remove loading class
      if (!this._scriptsLoading) {
        document.body.classList.remove('handsfree-loading')
      }
    }

    $script.src = script
    document.getElementsByTagName('head')[0].appendChild($script)
  })
}
