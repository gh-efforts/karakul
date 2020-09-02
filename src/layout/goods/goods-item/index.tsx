import React, { useState } from 'react'

import GoodsItemHeader from './goods-item-header'
import GoodsItemTable from './goods-item-table'
import ExpandIcon from './expand-icon'

import styles from './index.module.scss'

function GoodsItem() {
  const [expanded, setExpanded] = useState(false)

  const toggle = () => {
    setExpanded(e => !e)
  }

  return (
    <div className={styles.item}>
      <GoodsItemHeader>
        <ExpandIcon expanded={expanded} onClick={toggle} />
      </GoodsItemHeader>
      <GoodsItemTable expanded={expanded} />
    </div>
  )
}

export default GoodsItem
