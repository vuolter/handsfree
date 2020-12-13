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
        collapsable: false,
        sidebarDepth: 0,
        path: '/'
      },
      {
        title: '📚 Reference',
        path: '/ref/',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          {
            title: '⚡ Events',
            path: '/ref/event/',
            collapsable: true,
            sidebarDepth: 0,
            children: [
              ['/ref/event/handsfree-init.md', 'handsfree-init'],
              ['/ref/event/handsfree-data.md', 'handsfree-data'],
              ['/ref/event/handsfree-gotUserMedia.md', 'handsfree-gotUserMedia'],
              ['/ref/event/handsfree-loading.md', 'handsfree-loading'],
              ['/ref/event/handsfree-modelData.md', 'handsfree-modelData'],
              ['/ref/event/handsfree-modelError.md', 'handsfree-modelError'],
              ['/ref/event/handsfree-modelReady.md', 'handsfree-modelReady'],
            ]
          },
          {
            title: '📦 Models',
            path: '/ref/model/',
            collapsable: true,
            sidebarDepth: 2,
            children: [
              ['/ref/model/handpose.md', '🖐 Handpose'],
              ['/ref/model/holistic.md', '🤺 Holistic'],
              ['/ref/model/weboji.md', '😉 Weboji'],
            ]
          },
          {
            title: '💻 Methods',
            path: '/ref/method/',
            collapsable: true,
            sidebarDepth: 0,
            children: [
              ['/ref/method/emit.md', '.emit()'],
              ['/ref/method/getUserMedia.md', '.getUserMedia()'],
              ['/ref/method/normalize.md', '.normalize()'],
              ['/ref/method/on.md', '.on()'],
              ['/ref/method/start.md', '.start()'],
              ['/ref/method/stop.md', '.stop()'],
              ['/ref/method/throttle.md', '.throttle()'],
              ['/ref/method/use.md', '.use()'],
            ]
          },
          {
            title: '🔌 Plugins',
            path: '/ref/plugin/',
            collapsable: true,
            sidebarDepth: 0,
            children: [
              ['/ref/plugin/fingerPointer.md', 'fingerPointer'],
              ['/ref/plugin/handScroll.md', 'handScroll'],
              ['/ref/plugin/palmPointer.md', 'palmPointer'],
              ['/ref/plugin/pinchClick.md', 'pinchClick'],
              ['/ref/plugin/faceClick.md', 'faceClick'],
              ['/ref/plugin/facePointer.md', 'facePointer'],
              ['/ref/plugin/faceScroll.md', 'faceScroll'],
            ]
          },
          {
            title: '🧬 Properties',
            path: '/ref/prop/',
            collapsable: true,
            sidebarDepth: 0,
            children: [
              ['/ref/prop/config.md', '.config'],
              ['/ref/prop/debug.md', '.debug'],
              ['/ref/prop/globalPlugins.md', '.globalPlugins'],
              ['/ref/prop/id.md', '.id'],
              ['/ref/prop/isLooping.md', '.isLooping'],
              ['/ref/prop/model.md', '.model'],
              ['/ref/prop/plugin.md', '.plugin'],
            ]
          }
        ]
      }
    ]
  },

  chainWebpack: config => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
        .loader('pug-plain-loader')
        .end()
  },

  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-deflist'))
    }
  }
}