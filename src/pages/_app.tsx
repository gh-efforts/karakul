import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import ZhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'

import { GlobalModalProvider } from '../components'
import { initializeStore } from '../store/store'

import '../styles/global.scss'
import '../styles/antd.reset.scss'

class MyApp extends App {
  render(): React.ReactElement {
    const { Component, pageProps } = this.props

    // const authPath = ['/login', '/connect/feishu/redirect']

    const store = initializeStore(pageProps.initialState)

    return (
      <>
        <Head>
          <title>字节方舟生产流程管理后台</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <Provider store={store}>
          <ConfigProvider locale={ZhCN}>
            <GlobalModalProvider>
              <Component {...pageProps} />
            </GlobalModalProvider>
          </ConfigProvider>
        </Provider>
      </>
    )
  }
}

export default MyApp
