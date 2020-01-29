import { merge, get } from 'lodash'

export default class Plugin {
  constructor(plugin, handsfree) {
    // Props
    this.plugin = plugin
    this.handsfree = handsfree

    // Copy properties and methods from plugin into class
    Object.keys(plugin).forEach((prop) => {
      this[prop] = plugin[prop]
    })

    // handsfree.config.plugin[name] overwrites plugin.config
    const handsfreePluginConfig = get(handsfree.config.plugin, name)
    if (typeof handsfreePluginConfig === 'object') {
      merge(this.config, handsfreePluginConfig)
    }

    plugin.onUse && plugin.onUse(handsfree)
  }

  /**
   * Toggle plugins
   */
  enable() {
    !this.enabled &&
      this.plugin.onEnable &&
      this.plugin.onEnable(this.handsfree)
    this.enabled = true
  }
  disable() {
    this.enabled &&
      this.plugin.onDisable &&
      this.plugin.onDisable(this.handsfree)
    this.enabled = false
  }
}
