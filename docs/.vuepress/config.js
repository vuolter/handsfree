module.exports = {
  dest: 'dist/docs',
  
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