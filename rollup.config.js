import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import cleaner from 'rollup-plugin-cleaner'
import serve from 'rollup-plugin-serve'
import html from '@open-wc/rollup-plugin-html'
import copy from 'rollup-plugin-copy'

export default [
  /**
   * Handsfree.js UMD library
   */
  {
    input: 'src/handsfree.js',

    output: {
      name: 'Handsfree',
      format: 'umd',
      dir: 'dist'
    },

    plugins: [
      cleaner({targets: ['./dist/']}),
      copy({
        targets: [
          {src: 'public/assets', dest: 'dist'},
          {src: 'public/favicon.png', dest: 'dist'}
        ]
      }),
      commonjs({
        include: 'node_modules/**'
      }),
      nodeResolve()
    ]
  },

  /**
   * The sandbox site at localhost:8080
   */
  {
    output: {
      name: 'index.html',
      dir: 'dist'
    },
    
    plugins: [
      html({
        name: 'index.html',
        inject: false,
        files: 'demo/index.html'
      }),
      serve({
        contentBase: ['dist'],
        port: 8080
      })
    ]
  }
]