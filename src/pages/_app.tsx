import React from 'react'
import App, { AppContext, AppInitialProps } from 'next/app'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'
import ZhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import getConfig from 'next/config'
import { Provider } from 'react-redux'

import '../styles/global.scss'
import '../styles/antd.reset.scss'
import { GlobalModalProvider } from '../components'
import { ApolloProvider } from '@apollo/client'
import { client } from '../services'
import { parseCookie, CookieType } from '../helpers/cookie'
import { CookieDataCtx } from '../components/GlobalCookieData'
import LoginPage from './login'
import { initializeStore } from '../store/store'

NProgress.configure({ showSpinner: true })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

interface TAppInitialProps extends AppInitialProps {
  cookie: CookieType
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class MyApp extends App<{ cookie: any }> {
  static getInitialProps = async (appContext: AppContext): Promise<TAppInitialProps> => {
    const request = appContext.ctx.req

    // Call the page's `getInitialProps` and fill `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
      cookie: parseCookie(request?.headers.cookie),
    }
  }

  render(): React.ReactElement {
    const { Component: TargetPage, pageProps, cookie } = this.props

    const {
      publicRuntimeConfig: { ENDPOINT: backendUrl },
    } = getConfig()

    const Authorization = cookie?.Authorization

    const pathname = Router.router?.pathname

    const authPath = ['/login', '/connect/feishu/redirect']

    const store = initializeStore(pageProps.initialState)

    let Page: typeof TargetPage | typeof LoginPage = TargetPage

    if (!authPath.includes(pathname ?? '') && !Authorization) {
      Page = LoginPage
    }

    return (
      <>
        <Head>
          <title>字节方舟生产流程管理后台</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <ConfigProvider locale={ZhCN}>
              <GlobalModalProvider>
                <CookieDataCtx.Provider value={cookie}>
                  <Page {...pageProps} backendUrl={backendUrl} />
                </CookieDataCtx.Provider>
              </GlobalModalProvider>
            </ConfigProvider>
          </ApolloProvider>
        </Provider>
      </>
    )
  }
}

export default MyApp
