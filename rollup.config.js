import buble from 'rollup-plugin-buble'
import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'
import cleanup from 'rollup-plugin-cleanup'
import pack from './package.json'

const external = [...Object.keys(pack.peerDependencies), 'react-dom/server']

const plugins = [
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: ['@babel/env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-syntax-jsx',
    ],
  }),
  cleanup(),
  buble({objectAssign: 'Object.assign'}),
  uglify({
    sourcemap: false,
    mangle: true,
    compress: {negate_iife: false, expression: true},
  }),
]

export default [{
  input: 'src/index.js',
  plugins,
  external,
  output: {
    file: 'index.js',
    format: 'cjs',
    exports: 'named',
    globals: {react: 'React'},
    strict: false,
    treeshake: {
      pureExternalModules: true,
    }
  }
}, {
  input: 'src/server.js',
  plugins,
  external,
  output: {
    file: 'server.js',
    format: 'cjs',
    exports: 'named',
    globals: {react: 'React'},
    strict: false,
    treeshake: {
      pureExternalModules: true,
    }
  }
}]