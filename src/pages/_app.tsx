import React from "react";
import App, { AppContext } from "next/app";
import Head from "next/head";
import NProgress from "nprogress";
import Router from "next/router";
import ZhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";
import getConfig from "next/config";

import "../styles/global.scss";
import "../styles/antd.reset.scss";

NProgress.configure({ showSpinner: true });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const {
  publicRuntimeConfig: { BUILD_HASH },
} = getConfig();

class MyApp extends App<{ cookie: any }> {
  static getInitialProps = async (appContext: AppContext) => {
    const request = appContext.ctx.req;

    // Call the page's `getInitialProps` and fill `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
    };
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="description" content="字节方舟生产流程管理后台" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <title>字节方舟生产流程管理后台</title>
          <link rel="stylesheet" href="/css/nprogress.css" />
          <meta name="version-control" content={BUILD_HASH} />
        </Head>

        <ConfigProvider locale={ZhCN}>
          <Component {...pageProps} />
        </ConfigProvider>
      </>
    );
  }
}

export default MyApp;
