import { Menu } from "antd";
import styles from "./index.module.scss";
import Svg from "../../components/Svg";
import React, { useState } from "react";
const { SubMenu } = Menu;
function KSider() {
  const [orderItemSelected, setOrderItemSelected] = useState(false);
  const [goodsItemSelected, setGoodsItemSelected] = useState(false);
  const onSelect = (values: any) => {
    if (values.selectedKeys.indexOf("1") > -1) {
      setOrderItemSelected(true);
      setGoodsItemSelected(false);
    } else if (
      values.selectedKeys.indexOf("4") > -1 ||
      values.selectedKeys.indexOf("5") > -1 ||
      values.selectedKeys.indexOf("6") > -1
    ) {
      setOrderItemSelected(false);
      setGoodsItemSelected(true);
      console.log(goodsItemSelected);
    } else {
      setOrderItemSelected(false);
      setGoodsItemSelected(false);
    }
  };

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
  return (
    <div>
      <div className={styles.logo} />
      <Menu
        className={styles.menu}
        mode="inline"
        theme="light"
        defaultSelectedKeys={["1"]}
        onSelect={onSelect}
      >
        <Menu.Item key="1" icon={OrderSvg(orderItemSelected ? "#fff" : "#222")}>
          订单管理
        </Menu.Item>
        <SubMenu
          key="sub2"
          title="商品管理"
          icon={GoodsSvg(goodsItemSelected ? "#00b2b6" : "#222")}
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
