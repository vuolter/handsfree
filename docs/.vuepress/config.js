const path = require('path')

module.exports = {
  dest: 'build/docs',

  alias: {
    styles: path.resolve(__dirname, './styles'),
    assets: path.resolve(__dirname, '../../public/assets'),
  },
  
  themeConfig: {
    sidebar: [
      ['/', 'Home'],
      {
        title: '📚 Documentation',
        path: '/docs/',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          ['/docs/face/', '😀 Face Tracking'],
          ['/docs/hand/', '🖖 Hand Tracking'],
          ['/docs/pose/', '🤺 Pose Tracking']    
        ]
      },
      ['/mapper/', '💻 Gesture mapper'],
      ['/webhook/', '🔌 Connect to Webhook'],
      ['/community/', '💜 Get Involved']
    ]
  }
}