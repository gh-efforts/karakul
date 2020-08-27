import React from "react";
import { Layout } from "antd";
import styles from "./index.module.scss";
import KSider from "./sider";
import KHeader from "./header";

const { Header, Sider, Content } = Layout;

interface LayoutProps {
  children?: any;
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
