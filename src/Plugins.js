import { set, get, merge } from 'lodash'

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

  // Assign defaults
  set(
    Handsfree.plugins,
    name,
    Object.assign(
      {
        // Stores the plugins name for internal use
        name,
        // Whether the plugin is enabled by default
        enabled: true,
        // A set of default config values the user can override during instanciation
        config: {},
        // (instance) => Called on every frame
        onFrame: null,
        // (instance) => Called when the plugin is first used
        onUse: null,
        // (instance) => Called when the plugin is enabled
        onEnable: null,
        // (instance) => Called when the plugin is disabled
        onDisable: null
      },
      opts
    )
  )
  const plugin = get(Handsfree.plugins, name)

  // Run onUse callbacks and apply config overrides
  if (Handsfree.instances.length) {
    Object.keys(Handsfree.instances).forEach((instanceId) => {
      const instance = Handsfree.instances[instanceId]
      !plugin.wasOnUseCalled && plugin.onUse && plugin.onUse(instance)

      // Assign config
      const handsfreePluginConfig = get(instance.config.plugin, name)
      if (typeof handsfreePluginConfig === 'object') {
        merge(plugin.config, handsfreePluginConfig)
      }
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

    // Assign config
    const handsfreePluginConfig = get(this.config.plugin, payload.name)
    if (typeof handsfreePluginConfig === 'object') {
      merge(payload.config, handsfreePluginConfig)
    }

    // Otherwise loop through each property
  } else {
    Object.keys(payload).forEach((key) => {
      this.runOnUse(payload[key])
    })
  }
}

/**
 * Recurses through the plugins object, calling their onFrame
 *
 * @param {Object} payload A plugins object
 */
Handsfree.prototype.runOnFrame = function(payload) {
  if (!payload) payload = Handsfree.plugins

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
 *
 * @param {String} name The name of the plugin to disable
 */
Handsfree.disable = function(name) {
  const plugin = get(Handsfree.plugins, name)
  plugin.enabled = false

  Handsfree.instances.forEach((instance) => {
    plugin.onDisable && plugin.onDisable(instance)
  })
}

/**
 * Disables all the plugins
 * - Calls onDisable for each instance
 *
 * @param {Object} payload A plugins object
 */
Handsfree.disableAll = function(payload) {
  if (!payload) payload = Handsfree.plugins

  // Plugins have .enabled, so lets run them
  if (payload.hasOwnProperty('enabled')) {
    Handsfree.disable(payload.name)

    // Otherwise loop through each property
  } else {
    Object.keys(payload).forEach((key) => {
      this.disableAll(payload[key])
    })
  }
}

/**
 * Enables all plugins
 *
 * @param {Object} payload A plugins object
 */
Handsfree.enableAll = function(payload) {
  if (!payload) payload = Handsfree.plugins

  // Plugins have .enabled, so lets run them
  if (payload.hasOwnProperty('enabled')) {
    Handsfree.enable(payload.name)

    // Otherwise loop through each property
  } else {
    Object.keys(payload).forEach((key) => {
      this.enableAll(payload[key])
    })
  }
}

require('./plugins/weboji/vertScroll')
require('./plugins/weboji/click')
require('./plugins/weboji/morphs')
require('./plugins/weboji/pointer')
require('./plugins/weboji/ghostedPointer')
