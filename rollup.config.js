import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import html from '@open-wc/rollup-plugin-html'
import copy from 'rollup-plugin-copy-watch'

export default [
  /**
   * Handsfree.js UMD library
   */
  {
    input: 'src/handsfree/handsfree.js',

    output: {
      name: 'Handsfree',
      format: 'umd',
      dir: 'build/lib'
    },

    plugins: [
      copy({
        targets: [
          {src: 'public/assets', dest: 'build/lib'},
          {src: 'public/favicon.png', dest: 'build/lib'},
          {src: 'public/sun.png', dest: 'build/lib'}
        ]
      }),
      commonjs({
        include: /node_modules/
      }),
      nodeResolve()
    ]
  },

  /**
   * /index.html at localhost:8080
   */
  {
    output: {dir: 'build/lib'},
    
    plugins: [
      copy({
        targets: [
          {src: 'src/index.html', dest: 'build/lib'},
          {src: 'src/demo/**/*', dest: 'build/lib/demo'}
        ]
      }),
      html({
        inject: false,
        files: 'src/index.html'
      })
    ]
  }
]