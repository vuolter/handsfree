import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import serve from 'rollup-plugin-serve'
import html from '@open-wc/rollup-plugin-html'
import copy from 'rollup-plugin-copy-watch'
import livereload from 'rollup-plugin-livereload'

export default [
  /**
   * Handsfree.js UMD library
   */
  {
    input: 'src/handsfree/handsfree.js',

    output: {
      name: 'Handsfree',
      format: 'umd',
      dir: 'dist'
    },

    plugins: [
      copy({
        watch: 'static',
        
        targets: [
          {src: 'public/assets', dest: 'dist'},
          {src: 'public/favicon.png', dest: 'dist'},
          {src: 'public/sun.png', dest: 'dist'}
        ]
      }),
      commonjs({
        include: /node_modules/
      }),
      nodeResolve(),
      livereload({ delay: 500, watch: 'dist' })
    ]
  },

  /**
   * /index.html at localhost:8080
   */
  {
    output: {dir: 'dist'},
    
    plugins: [
      copy({
        watch: 'src/demo/**/*',

        targets: [
          {src: 'src/index.html', dest: 'dist'},
          {src: 'src/demo/**/*', dest: 'dist/demo'}
        ]
      }),
      html({
        inject: false,
        files: 'src/index.html'
      }),
      serve({
        contentBase: ['dist'],
        port: 8080
      }),
      livereload({ delay: 500, watch: 'dist' })
    ]
  }
]