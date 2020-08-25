import { Menu } from "antd";
import styles from "./index.module.scss";
import Svg from "../../components/Svg";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
const { SubMenu } = Menu;
const OrderSvg = (color: string) => (
  <Svg
    name="ico-order-s"
    width="24px"
    height="24px"
    color={color}
    offsetY="6"
  />
);

const GoodsSvg = (color: string) => (
  <Svg
    name="ico-goods-n"
    width="24px"
    height="24px"
    color={color}
    offsetY="6"
  />
);

const menuColunms = [
  {
    key: "1",
    name: "订单管理",
    path: "/order",
    icon: (isSelected: boolean) => OrderSvg(isSelected ? "#fff" : "#222"),
  },
  {
    key: "2",
    name: "商品管理",
    icon: (isSelected: boolean) => GoodsSvg(isSelected ? "#00b2b6" : "#222"),
    sub: [
      {
        key: "3",
        name: "商品列表",
        path: "/goods",
      },
      {
        key: "4",
        name: "商品流向",
        path: "/goods",
      },
      {
        key: "5",
        name: "商品分类管理",
        path: "/goods",
      },
    ],
  },
];

interface MenuValues {
  [key: string]: string;
}

let menuValues: MenuValues = {
  "1": "/order",
  "3": "/goods",
  "4": "/goods",
  "5": "/goods",
};

let findKey = (value: string, compare = (a: string, b: string) => a === b) => {
  return Object.keys(menuValues).find((k) => compare(menuValues[k], value));
};

const menuItem = (selectedKeys: string[], onClick: (values: any) => void) => {
  return menuColunms.map((item) => {
    if (item.sub) {
      return (
        <SubMenu
          key={item.key}
          title={item.name}
          icon={item.icon(selectedKeys == [item.key])}
        >
          {item.sub.map((sub) => {
            return (
              <Menu.Item onClick={onClick} key={sub.key}>
                {sub.name}
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item
          onClick={onClick}
          key={item.key}
          icon={item.icon(selectedKeys === [item.key])}
        >
          {item.name}
        </Menu.Item>
      );
    }
  });
};

function KSider(): React.ReactElement {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
    setSelectedKeys([findKey(router.pathname) ?? "1"]);
  }, [router.pathname]);

  const onClick = (values: any) => {
    router.push(menuValues[values.key]);
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
        defaultOpenKeys={["2"]}
      >
        {menuItem(selectedKeys, onClick)}
      </Menu>
    </div>
  );
}

export default KSider;
