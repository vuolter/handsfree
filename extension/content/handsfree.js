/**
 * Setup Handsfree
 */
handsfree = new Handsfree({
  isClient: true,
  hands: true
})
handsfree.enablePlugins('browser')

/**
 * Handle messages from background script
 */
chrome.runtime.onMessage.addListener(function (message) {
  switch (message.action) {
    case 'handsfree-data':
      handsfree.runPlugins(message.data)
      return

    /**
     * Syncs the background script's Handsfree with this one
     */
    case 'handsfree-getConfig':
      chrome.runtime.sendMessage({
        action: 'handsfree-updateBackgroundConfig',
        config: handsfree.config
      })
      return
  }
})
