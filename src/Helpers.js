import { throttle } from 'lodash'

const Handsfree = window.Handsfree

/**
 * Throttles callback to run timeInMilliseconds
 *
 * @param {function} callback The callback to run
 * @param {Integer} time How many milliseconds to throttle (in other words, run this method at most ever x milliseconds)
 * @param {Object} options {leading: true, trailing: true} @see https://lodash.com/docs/4.17.15#throttle
 */
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

/**
 * Throttles a model
 *
 * @param {String} modelName The name of the model to throttle ['head', 'bodypix']
 * @param {Integer} time How many milliseconds to throttle by (in other words, run this model every X milliseconds)
 * @param {Object} options {leading: true, trailing: true} @see https://lodash.com/docs/4.17.15#throttle
 */
Handsfree.prototype.throttleModel = function(modelName, time, opts = {}) {
  this.config.models[modelName].throttle = time

  switch (modelName) {
    case 'head':
      this.inferWeboji = throttle(this._inferWeboji, time, opts)
      this.model.head.sdk.set_animationDelay &&
        this.model.head.sdk.set_animationDelay(time)
      break
    case 'bodypix':
      this.inferBodypix = throttle(this._inferBodypix, time, opts)
      break
  }
}
