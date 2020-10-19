import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/main.js',

  output: [
    // handsfree.js
    {
      file: 'dist/handsfree.js',
      format: 'umd',
      name: 'Handsfree'
    }
  ],

  plugins: [nodeResolve(), commonjs()]
}