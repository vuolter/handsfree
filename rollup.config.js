import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
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
  }
]