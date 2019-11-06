/**
 * Adds a callback (we call it a plugin) to be called after every tracked frame
 * @param {String} name The plugin name
 * @param {Function} callback The callback to run
 */
const Handsfree = window.Handsfree

Handsfree.use = function(name, callback) {
  Handsfree.plugins[name] = callback
}
