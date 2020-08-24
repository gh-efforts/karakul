/* eslint-disable */

// fix antd
// https://github.com/vercel/next.js/issues/8054
// https://github.com/ant-design/ant-design/issues/15696
// https://www.yuque.com/steven-kkr5g/aza/ig3x9w

const fs = require('fs')
const lessToJs = require('less-vars-to-js')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const withCssLoader = require('./cssloder.js')

const modifyVars = lessToJs(fs.readFileSync('./antd.value.less', 'utf8'))

if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {}
}

let BUILD_HASH = 'BUILD_HASH'

if (process.env.NODE_ENV === 'production') {
  BUILD_HASH = require('./version.js')
}

module.exports = withCssLoader({
  publicRuntimeConfig: {
    ENDPOINT: process.env.ENDPOINT,
    ENDPOINT_JOB: process.env.ENDPOINT_JOB,
    BUILD_HASH,
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars,
  },
  webpack: (config, { isServer }) => {
    // add antd less and style
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }

    // replace antd moment with dayjs
    config.plugins.push(new AntdDayjsWebpackPlugin())

    // remove antd cssm Conflicting order error
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /Conflicting order/,
      })
    )

    // add webpack-bundle-analyzer
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer ? '../analyze/server.html' : './analyze/client.html',
        })
      )
    }

    return config
  },
})
