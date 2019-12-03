import { set, get } from 'lodash'

/**
 * Adds a callback (we call it a plugin) to be called after every tracked frame
 * @param {String} name The plugin name
 * @param {Function} callback The callback to run
 */
const Handsfree = window.Handsfree

Handsfree.use = function(name, opts = {}) {
  // Make sure we have an options object
  if (typeof opts === 'function') {
    opts = {
      onFrame: opts
    }
  }

  set(
    Handsfree.plugins,
    name,
    Object.assign(
      {
        // Whether the plugin is enabled by default
        enabled: true,
        // (instance) => Called on every frame
        onFrame: null,
        // (instace) => Called when the plugin is first used
        onUse: null,
        // (instance) => Called when the plugin is enabled
        onEnable: null,
        // (instance) => Called when the plugin is disabled
        onDisable: null
      },
      opts
    )
  )

  // Run onUse callbacks
  if (Handsfree.instances.length) {
    const plugin = get(Handsfree.plugins, name)

    Object.keys(Handsfree.instances).forEach((instance) => {
      !plugin.wasOnUseCalled && plugin.onUse && plugin.onUse(instance)
    })

    plugin.wasOnUseCalled = true
  }
}

/**
 * Enable plugins
 * - Calls onEnable for each instance
 */
Handsfree.enable = function(name) {
  const plugin = get(Handsfree.plugins, name)
  plugin.enabled = true

  Handsfree.instances.forEach((instance) => {
    plugin.onEnable && plugin.onEnable(instance)
  })
}

/**
 * Recurses through the plugins object, calling their onUse
 */
Handsfree.prototype.runOnUse = function(payload) {
  // Plugins have .enabled, so lets run them
  if (payload.hasOwnProperty('enabled')) {
    !payload.wasOnUseCalled && payload.onUse && payload.onUse(this)
    payload.wasOnUseCalled = true

    // Otherwise loop through each property
  } else {
    Object.keys(payload).forEach((key) => {
      this.runOnUse(payload[key])
    })
  }
}

/**
 * Recurses through the plugins object, calling their onFrame
 */
Handsfree.prototype.runOnFrame = function(payload) {
  // Plugins have .enabled, so lets run them
  if (payload.hasOwnProperty('enabled')) {
    payload.enabled && payload.onFrame && payload.onFrame(this)

    // Otherwise loop through each property
  } else {
    Object.keys(payload).forEach((key) => {
      this.runOnFrame(payload[key])
    })
  }
}

/**
 * Disable plugins
 * - Calls onDisable for each instance
 */
Handsfree.disable = function(name) {
  const plugin = get(Handsfree.plugins, name)
  plugin.enabled = false

  Handsfree.instances.forEach((instance) => {
    plugin.onDisable && plugin.onDisable(instance)
  })
}

require('./plugins/head/vertScroll')
require('./plugins/head/click')
require('./plugins/head/morphs')
require('./plugins/head/pointer')
