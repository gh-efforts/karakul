import React from 'react'
import { Layout } from 'antd'

import KSider from './sider'
import KHeader from './header'
import useAuth from './useAuth'

import styles from './index.module.scss'

const { Header, Sider, Content } = Layout

interface LayoutProps {
  children?: React.ReactNode
}

function KLayout({ children }: LayoutProps): React.ReactElement {
  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
        <KSider />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <KHeader />
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export function withLayout<T>(Component: React.ComponentType<T>, checkAuth = true) {
  return function WithLayout(props: T): React.ReactElement {
    useAuth(checkAuth)

    return (
      <KLayout>
        <Component {...(props || ({} as T))} />
      </KLayout>
    )
  }
}

export default KLayout
