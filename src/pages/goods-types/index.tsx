import React from 'react'

import GoodsTypesHeader from '../../layout/goods-types/header'
import { withLayout } from '../../layout/layout'
import { KTable } from '../../components'
import columns from '../../layout/goods-types/table/columns'

import styles from './index.module.scss'

function GoodsTypes() {
  return (
    <div className={styles.page}>
      <GoodsTypesHeader />
      <KTable data={[]} columns={columns} total={10} currentPage={1} rowKey={item => item} />
    </div>
  )
}

export default withLayout(GoodsTypes)
