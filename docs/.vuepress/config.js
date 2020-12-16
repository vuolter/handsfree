// @see https://vuepress.vuejs.org/guide/basic-config.html

const path = require('path')

module.exports = {
  dest: 'build/docs',

  // Meta
  title: 'Handsfree.js',
  description: 'Add face, hand, and pose tracking to your projects, create handsfree user experiences, and tap into our growing library of plugins and integrations ✨👌',
  head: [
    ['link', {rel: 'icon', href: '/favicon.png'}],

    ['meta', {property: 'og:type', content: 'website'}],
    ['meta', {property: 'og:url', content: 'https://handsfree.js.org/'}],
    ['meta', {property: 'og:image', content: ''}],

    ['meta', {property: 'twitter:card', content: 'summary_large_image'}],
    ['meta', {property: 'twitter:url', content: 'https://handsfree.js.org/'}],
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
  
  globalUIComponents: [
    'Handsfree',
    // 'Clippy'
  ],
  
  themeConfig: {
    logo: '/branding/handsfree.png',
    lastUpdated: 'Last Updated',

    repo: 'midiblocks/handsfree',
    docsDir: 'docs',
    editLinks: true,
    
    sidebarDepth: 1,
    sidebar: [
      {
        title: '🏠 Home',
        collapsable: true,
        path: '/'
      },
      {
        title: '📋 Guides',
        collapsable: true,
        path: '/guide/',
        children: [
          ['/guide/the-loop.md', '🔌 Plugins and the main loop'],
          ['/guide/updating-configs.md', '🎭 Updating and switching models'],
          // ['/guide/desktop.md', '💻 Interacting with the desktop'],
          // ['/guide/changing-video-source.md', "🎦 Tracking pre-recorded videos and images"],
          // ['/guide/new-models.md', '📦 Adding new models']
        ]
      },
      {
        title: '📚 Reference',
        path: '/ref/',
        collapsable: true,
        children: [
          {
            title: '📦 Models',
            path: '/ref/model/',
            collapsable: true,
            children: [
              ['/ref/model/handpose.md', '🖐 Handpose'],
              ['/ref/model/holistic.md', '🤺 Holistic'],
              ['/ref/model/weboji.md', '😉 Weboji'],
            ]
          },
          {
            title: '⚡ Events',
            path: '/ref/event/',
            collapsable: true,
            children: [
              ['/ref/event/handsfree-data.md', 'handsfree-data'],
              ['/ref/event/handsfree-gotUserMedia.md', 'handsfree-gotUserMedia'],
              ['/ref/event/handsfree-init.md', 'handsfree-init'],
              ['/ref/event/handsfree-loading.md', 'handsfree-loading'],
              ['/ref/event/handsfree-modelError.md', 'handsfree-modelError'],
              ['/ref/event/handsfree-modelReady.md', 'handsfree-modelReady'],
            ]
          },
          {
            title: '💻 Methods',
            path: '/ref/method/',
            collapsable: true,
            children: [
              ['/ref/method/disablePlugins.md', '.disablePlugins()'],
              ['/ref/method/emit.md', '.emit()'],
              ['/ref/method/enablePlugins.md', '.enablePlugins()'],
              ['/ref/method/getUserMedia.md', '.getUserMedia()'],
              ['/ref/method/normalize.md', '.normalize()'],
              ['/ref/method/on.md', '.on()'],
              ['/ref/method/start.md', '.start()'],
              ['/ref/method/stop.md', '.stop()'],
              ['/ref/method/throttle.md', '.throttle()'],
              ['/ref/method/update.md', '.update()'],
              ['/ref/method/use.md', '.use()'],
            ]
          },
          {
            title: '🔌 Plugins',
            path: '/ref/plugin/',
            collapsable: true,
            children: [
              // ['/ref/plugin/fingerPointer.md', 'fingerPointer'],
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
            children: [
              ['/ref/prop/config.md', '.config'],
              ['/ref/prop/debug.md', '.debug'],
              ['/ref/prop/globalPlugins.md', '.globalPlugins'],
              ['/ref/prop/id.md', '.id'],
              ['/ref/prop/isLooping.md', '.isLooping'],
              ['/ref/prop/model.md', '.model'],
              ['/ref/prop/plugin.md', '.plugin'],
              ['/ref/prop/taggedPlugins.md', '.taggedPlugins'],
            ]
          },
          {
            title: '🧰 Utilities',
            path: '/ref/util/',
            collapsable: true,
            children: [
              ['/ref/util/classes.md', '🎨 Classes']
            ]
          }
        ]
      },
      {
        title: '🤝 Community',
        collapsable: true,
        path: '/community/',
        children: [
          ['https://github.com/midiblocks/handsfree', 'GitHub'],
          ['https://github.com/sponsors/midiblocks', '💜 Become a sponsor'],
          ['https://groups.google.com/g/handsfreejs', 'Google Groups'],
          ['https://discord.gg/TDJEaTp7', 'Discord'],
          ['https://twitter.com/midiblocks', 'Twitter'],
          ['http://eepurl.com/hhD7S1', '📧 Newsletter']
        ]
      },
      {
        title: 'About',
        collapsable: true,
        path: '/about/'
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