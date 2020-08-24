import { Menu } from "antd";
import styles from "./index.module.scss";
import Svg from "../../components/Svg";
import { useState } from "react";
const { SubMenu } = Menu;
function KSider() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const onSelect = (values: any) => {
    console.log(values);
    setSelectedKeys(values.selectedKeys);
  };
  return (
    <div>
      <div className={styles.logo} />
      <Menu
        className={styles.menu}
        mode="inline"
        theme="light"
        defaultSelectedKeys={["1"]}
        selectedKeys={selectedKeys}
        onSelect={onSelect}
      >
        <Menu.Item
          key="1"
          icon={
            selectedKeys.indexOf("1") > -1 ? (
              <Svg name="ico-order-s" width="24px" height="24px" color="#fff" />
            ) : (
              <Svg name="ico-order-s" width="24px" height="24px" color="#222" />
            )
          }
        >
          订单管理
        </Menu.Item>
        <SubMenu
          key="sub2"
          title="商品管理"
          icon={
            selectedKeys.indexOf("1") > -1 ? (
              <Svg
                name="ico-goods-n"
                width="24px"
                height="24px"
                color="#222"
              ></Svg>
            ) : (
              <Svg
                name="ico-goods-n"
                width="24px"
                height="24px"
                color="#00b2b6"
              />
            )
          }
        >
          <Menu.Item key="4">商品列表</Menu.Item>
          <Menu.Item key="5">商品流向</Menu.Item>
          <Menu.Item key="6">商品分类管理</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default KSider;
