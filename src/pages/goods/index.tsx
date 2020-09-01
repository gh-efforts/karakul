import React from 'react'

import { withLayout } from '../../layout/layout'
import GoodsHeader from '../../layout/goods/header'
import ExpandTable from '../../layout/goods/GoodsTable'

import styles from './index.module.scss'

function Goods(): React.ReactElement {
  return (
    <div className={styles.goods}>
      <GoodsHeader />
      <ExpandTable />
    </div>
  )
}
export default withLayout(Goods)
