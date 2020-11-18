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
      dir: 'dist/lib'
    },

    plugins: [
      copy({
        targets: [
          {src: 'public/assets', dest: 'dist/lib'},
          {src: 'public/favicon.png', dest: 'dist/lib'},
          {src: 'public/sun.png', dest: 'dist/lib'}
        ]
      }),
      commonjs({
        include: /node_modules/
      }),
      nodeResolve(),
      // livereload({ delay: 500, watch: 'dist' })
    ]
  },

  /**
   * /index.html at localhost:8080
   */
  {
    output: {dir: 'dist/lib'},
    
    plugins: [
      copy({
        targets: [
          {src: 'src/index.html', dest: 'dist/lib'},
          {src: 'src/demo/**/*', dest: 'dist/lib/demo'}
        ]
      }),
      html({
        inject: false,
        files: 'src/index.html'
      })
    ]
  }
]