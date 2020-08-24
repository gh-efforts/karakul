import React from "react";
import { Layout } from "antd";

import styles from "./index.module.scss";

const { Header, Sider, Content } = Layout;

interface LayoutProps {
  children?: any;
}

function KLayout({ children }: LayoutProps): React.ReactElement {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>Header</Header>
      <Layout>
        <Sider className={styles.sider}>Sider</Sider>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export function withLayout<T>(Component: React.ComponentType<T>) {
  return function WithLayout(props: T) {
    return (
      <KLayout>
        <Component {...(props || ({} as T))} />
      </KLayout>
    );
  };
}

export default KLayout;
