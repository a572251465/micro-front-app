import * as path from 'path'
import del from 'rollup-plugin-del'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export const resolvePath = (url) => path.resolve(__dirname, url)

export default {
  input: resolvePath('./src/index.js'),
  output: [
    {
      file: resolvePath('./lib/index.umd.js'),
      format: 'umd',
      name: 'microFrontApp'
    },
    {
      file: resolvePath('./lib/index.esm.js'),
      format: 'esm'
    }
  ],
  plugins: [del(), nodeResolve()]
}
