/* eslint-disable */

// less + scss + scss module
//
// https://github.com/vercel/next.js/blob/canary/examples/with-ant-design-less/next.config.js
// https://github.com/sdli/next-antd-aza-less
// https://github.com/webdeb/next-styles

const cssLoaderConfig = require('@zeit/next-css/css-loader-config')

module.exports = (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dev, isServer } = options
      const {
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        sassLoaderOptions,
        lessLoaderOptions = {},
      } = nextConfig

      const issuer = issuer => {
        if (issuer.match(/pages[\\/]_document\.js$/)) {
          throw new Error('You can not import CSS/SASS/SCSS files in pages/_document.js, use pages/_app.js instead.')
        }
        return true
      }

      // less loader
      options.defaultLoaders.less = cssLoaderConfig(config, {
        extensions: ['less'],
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'less-loader',
            options: lessLoaderOptions,
          },
        ],
      })

      config.module.rules.push({
        test: /\.less$/,
        exclude: /node_modules/,
        use: options.defaultLoaders.less,
      })

      // disable antd css module
      config.module.rules.push({
        test: /\.less$/,
        include: /node_modules/,
        use: cssLoaderConfig(config, {
          extensions: ['less'],
          cssModules: false,
          cssLoaderOptions: {},
          dev,
          isServer,
          loaders: [
            {
              loader: 'less-loader',
              options: lessLoaderOptions,
            },
          ],
        }),
      })

      // scss loader
      options.defaultLoaders.sass = cssLoaderConfig(config, {
        extensions: ['scss', 'sass'],
        loaders: [
          {
            loader: 'sass-loader',
            options: sassLoaderOptions,
          },
        ],
        cssModules: false,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
      })

      config.module.rules.push({
        issuer,
        test: /\.s[ac]ss$/,
        exclude: /\.(m|module)\.s[ac]ss$/,
        use: options.defaultLoaders.sass,
      })

      // scss module loader
      options.defaultLoaders.sassModules = cssLoaderConfig(config, {
        extensions: ['scss', 'sass'],
        loaders: [
          {
            loader: 'sass-loader',
            options: sassLoaderOptions,
          },
        ],
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[local]___[hash:base64:5]',
        },
        postcssLoaderOptions,
        dev,
        isServer,
      })

      config.module.rules.push({
        issuer,
        test: /\.(m|module)\.s[ac]ss$/,
        use: options.defaultLoaders.sassModules,
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  }
}
