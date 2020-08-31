import React from 'react'

import { withLayout } from '../../layout'
import GoodsHeader from './layout/header'
import ExpandTable from './layout/GoodsTable'

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
