import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import GoodsItemHeader from './goods-item-header'
import GoodsItemTable from './goods-item-table'
import ExpandIcon from './expand-icon'
import { Dispatch, RootState } from '../../../store/type.d'

import styles from './index.module.scss'

interface GoodsItemProps {
  id?: string | null | undefined
  name?: string | null | undefined
}

function GoodsItem({ id, name }: GoodsItemProps) {
  const dispatch = useDispatch<Dispatch>()
  const detail = useSelector<RootState, RootState['goods']['details']>(s => s.goods.details)

  const [expanded, setExpanded] = useState(false)

  const data = useMemo(() => {
    return id ? (detail[id] ? detail[id] : []) : []
  }, [id, detail])

  const toggle = () => {
    setExpanded(e => !e)

    if (!expanded && id) {
      dispatch.goods.fetchCommodity(id)
    }
  }

  return (
    <div className={styles.item}>
      <GoodsItemHeader name={name} id={id}>
        <ExpandIcon expanded={expanded} onClick={toggle} />
      </GoodsItemHeader>

      <GoodsItemTable expanded={expanded} data={data} pid={id} />
    </div>
  )
}

export default GoodsItem
