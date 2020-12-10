// @see https://vuepress.vuejs.org/guide/basic-config.html

const path = require('path')

module.exports = {
  dest: 'build/docs',

  // Meta
  title: 'Handsfree.js',
  description: 'Handsfree.js is a library that helps you add face tracking, hand tracking, and pose estimation to your JavaScript projects in a snap.',
  head: [
    ['link', {rel: 'icon', href: '/favicon.png'}],

    ['meta', {property: 'og:type', content: 'website'}],
    ['meta', {property: 'og:url', content: 'https://handsfree.js.org/'}],
    ['meta', {property: 'og:title', content: 'Handsfree.js'}],
    ['meta', {property: 'og:description', content: 'Build handsfree User Experiences and add face, hand, and pose tracking to your projects in a snap!'}],
    ['meta', {property: 'og:image', content: ''}],

    ['meta', {property: 'twitter:card', content: 'summary_large_image'}],
    ['meta', {property: 'twitter:url', content: 'https://handsfree.js.org/'}],
    ['meta', {property: 'twitter:title', content: 'Handsfree.js'}],
    ['meta', {property: 'twitter:description', content: 'Build handsfree User Experiences and add face, hand, and pose tracking to your projects in a snap!'}],
    ['meta', {property: 'twitter:image', content: 'https://i.imgur.com/WbfpozB.jpg'}]
  ],

  alias: {
    styles: path.resolve(__dirname, './styles'),
    public: path.resolve(__dirname, './public')
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@handsfree': path.resolve(__dirname, '../../src'),
        '@components': path.resolve(__dirname, './components')
      }
    }
  },

  thirdPartyComponents: {
    // @see https://github.com/HiYue/vuepress-component-font-awesome#generate-specified-icons-only
    fontAwesomeIcons: {
      regular: ['video'],
      solid: ['spinner', 'video', 'video-slash', 'crosshairs']
    }
  },
  
  globalUIComponents: ['Handsfree'],
  
  themeConfig: {
    logo: '/branding/handsfree.png',
    displayAllHeaders: true,
    lastUpdated: 'Last Updated',

    repo: 'midiblocks/handsfree',
    docsDir: 'docs',
    editLinks: true,
    
    sidebar: [
      {
        title: '🏠 Home',
        collapsable: true,
        sidebarDepth: 1,
        path: '/'
      },
      {
        title: '📚 Documentation',
        collapsable: true,
        sidebarDepth: 1,
        path: '/docs/',
        children: [
          ['/docs/', 'Getting Started'],
          ['/docs/face/', '😀 Face Tracking'],
          ['/docs/hand/', '🖖 Hand Tracking'],
          ['/docs/pose/', '🤺 Pose Tracking']    
        ]
      },
      {
        title: '🎮 Playgrounds',
        collapsable: true,
        sidebarDepth: 1,
        path: '/playgrounds/',
        children: [
          ['/playgrounds/face', '😀 Face Pointer Playground'],
          ['/playgrounds/hand', '🖐 Hand Gesture Playground']
        ]
      },
      ['https://midiblocks.com', '💻 Gesture mapper']
    ]
  },

  chainWebpack: config => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
        .loader('pug-plain-loader')
        .end()
  }
}