import React, { useState } from 'react'

import GoodsItemHeader from './goods-item-header'
import GoodsItemTable, { RefreshCtx } from './goods-item-table'
import ExpandIcon from './expand-icon'
import { useOrderCommoditiesLazyQuery } from '../../../services'
import { OrderCommodity } from '../goods.d'

import styles from './index.module.scss'

interface GoodsItemProps {
  id?: string | null | undefined
  name?: string | null | undefined
}

function GoodsItem({ id, name }: GoodsItemProps) {
  const [expanded, setExpanded] = useState(false)

  const [fetch, { data, loading, refetch }] = useOrderCommoditiesLazyQuery({ fetchPolicy: 'network-only' })

  const toggle = () => {
    setExpanded(e => !e)

    if (!expanded && id) {
      fetch({
        variables: {
          id,
        },
      })
    }
  }

  return (
    <div className={styles.item}>
      <GoodsItemHeader name={name} id={id}>
        <ExpandIcon expanded={expanded} onClick={toggle} disabled={loading} />
      </GoodsItemHeader>
      <RefreshCtx.Provider value={{ refresh: refetch }}>
        <GoodsItemTable expanded={expanded} data={(data?.order?.commodities ?? []) as OrderCommodity[]} />
      </RefreshCtx.Provider>
    </div>
  )
}

export default GoodsItem
