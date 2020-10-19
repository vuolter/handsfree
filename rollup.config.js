import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import cleaner from 'rollup-plugin-cleaner'
import serve from 'rollup-plugin-serve'
import html from '@open-wc/rollup-plugin-html'

export default [
  // Module
  {
    input: 'src/main.js',

    output: {
      name: 'Handsfree',
      format: 'umd',
      dir: 'dist'
    },

    plugins: [
      cleaner({targets: ['./dist/']}),
      commonjs({
        include: 'node_modules/**'
      }),
      nodeResolve()
    ]
  },

  // Demo HTML
  {
    output: {
      name: 'index.html',
      dir: 'dist'
    },
    
    plugins: [
      html({
        name: 'index.html',
        inject: false,
        files: 'src/index.html'
      }),
      serve({
        contentBase: ['dist'],
        port: 8080
      })
    ]
  }
]