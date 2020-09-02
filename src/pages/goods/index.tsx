import React from 'react'

import { withLayout } from '../../layout/layout'
import GoodsHeader from '../../layout/goods/header'
import GoodsItem from '../../layout/goods/goods-item'

import styles from './index.module.scss'

function Goods(): React.ReactElement {
  return (
    <div className={styles.goods}>
      <GoodsHeader />
      <div className={styles.table}>
        <GoodsItem />
      </div>
    </div>
  )
}
export default withLayout(Goods)
