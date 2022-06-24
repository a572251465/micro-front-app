import serve from 'rollup-plugin-serve'
import baseConfig from './rollup.base.config'

export default {
  ...baseConfig,
  plugins: [
    serve({
      openPage: './index.html',
      contentBase: '',
      port: 3000
    })
  ]
}
