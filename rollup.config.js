import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import cleaner from 'rollup-plugin-cleaner'
import serve from 'rollup-plugin-serve'
import html from '@open-wc/rollup-plugin-html'

export default [
  {
    input: 'src/main.js',

    output: [
      {
        format: 'umd',
        name: 'Handsfree',
        dir: 'dist'
      }
    ],

    plugins: [
      cleaner({targets: ['./dist/']}),
      commonjs({
        include: 'node_modules/**'
      }),
      nodeResolve(),
      html(),
      serve('dist')
    ]
  }
]