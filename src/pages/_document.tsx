import React from 'react'
import getConfig from 'next/config'
import Document, { Html, Head, Main, NextScript } from 'next/document'

const {
  publicRuntimeConfig: { BUILD_HASH },
} = getConfig()

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name='theme-color' content='#000000' />
          <meta name='description' content='字节方舟生产流程管理后台' />
          <meta name='version-control' content={BUILD_HASH} />
          <link rel='icon' href='/favicon.ico' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/logo192.png' />
          <link rel='stylesheet' href='/css/nprogress.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
