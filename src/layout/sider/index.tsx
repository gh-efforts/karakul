import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import styles from './index.module.scss'
import { Svg } from '../../components'
import { useRouter } from 'next/router'
const { SubMenu } = Menu
interface MenuInfo {
  key: React.Key
  keyPath: React.Key[]
  item: React.ReactInstance
  domEvent: React.MouseEvent<HTMLElement>
}

interface MenuValues {
  [key: string]: string
}

const OrderSvg = (color: string) => <Svg name='ico-order-s' width='24px' height='24px' color={color} offsetY='6' />

const GoodsSvg = (color: string) => <Svg name='ico-goods-n' width='24px' height='24px' color={color} offsetY='6' />

const menuColunms = [
  {
    key: '1',
    name: '订单管理',
    path: '/order',
    icon: (isSelected: boolean) => OrderSvg(isSelected ? '#fff' : '#222'),
  },
  {
    key: '2',
    name: '商品管理',
    icon: (isSelected: boolean) => GoodsSvg(isSelected ? '#00b2b6' : '#222'),
    sub: [
      {
        key: '3',
        name: '商品',
        path: '/goods',
      },
      {
        key: '4',
        name: '仓库',
        path: '/goods-warehouse',
      },
      {
        key: '5',
        name: '商品类型管理',
        path: '/goods-types',
      },
    ],
  },
]

const menuValues: MenuValues = {
  '1': '/order',
  '3': '/goods',
  '4': '/goods-warehouse',
  '5': '/goods-types',
}

const findKey = (value: string, compare = (a: string, b: string) => a === b) => {
  return Object.keys(menuValues).find(k => compare(menuValues[k], value))
}

const menuItem = (selectedKeys: string[], onClick: (values: MenuInfo) => void) => {
  return menuColunms.map(item => {
    if (item.sub) {
      const selectedItem = item.sub.find(sub => {
        return selectedKeys.indexOf(sub.key) > -1
      })
      return (
        <SubMenu key={item.key} title={item.name} icon={item.icon(selectedKeys.indexOf(selectedItem?.key ?? '') > -1)}>
          {item.sub.map(sub => {
            return (
              <Menu.Item onClick={onClick} key={sub.key}>
                {sub.name}
              </Menu.Item>
            )
          })}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item onClick={onClick} key={item.key} icon={item.icon(selectedKeys.indexOf(item.key) > -1)}>
          {item.name}
        </Menu.Item>
      )
    }
  })
}

function KSider(): React.ReactElement {
  const router = useRouter()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  useEffect(() => {
    setSelectedKeys([findKey(router.pathname) ?? '1'])
  }, [router.pathname])

  const onClick = (values: MenuInfo) => {
    router.push(menuValues[values.key])
  }

  return (
    <div className={styles.box}>
      <div className={styles.logo}>
        <img src={`/images/logo.svg`} alt='logo' />
      </div>
      <Menu
        className={styles.menu}
        mode='inline'
        theme='light'
        defaultSelectedKeys={['1']}
        selectedKeys={selectedKeys}
        defaultOpenKeys={['2']}
      >
        {menuItem(selectedKeys, onClick)}
      </Menu>
    </div>
  )
}

export default KSider
