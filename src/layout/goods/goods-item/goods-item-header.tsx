import React from 'react'
import { Button, Tooltip } from 'antd'

import CreateGoodsView from './../create-goods'
import GoodsHistoryView from '../goods-exhouse-history'
import ExWarehouseView from './../ex-warehouse'
import GoodsInhouseView from '../goods-inhouse-view'
import { Svg, useGlobalModal } from '../../../components'

import styles from './index.module.scss'

interface BtnProps {
  id?: string | null | undefined
}

function CreateGoodsBtn({ id }: BtnProps) {
  const { showModal } = useGlobalModal()

  const show = () => {
    if (!id) {
      return
    }

    showModal('创建商品', CreateGoodsView, { id })
  }

  return (
    <Button type='text' className='action-pointer' onClick={show} disabled={!id}>
      创建商品
    </Button>
  )
}

function GoodsExWarehouseBtn({ id }: BtnProps) {
  const { showModal } = useGlobalModal()

  const show = () => {
    if (!id) {
      return
    }
    showModal('提货记录', GoodsHistoryView, { id })
  }
  return (
    <Tooltip title='提货记录'>
      <Svg name='btn-sellhistory-h' onClick={show} disabled={!id} />
    </Tooltip>
  )
}

function GoodsInWarehouseBtn({ id }: BtnProps) {
  const { showModal } = useGlobalModal()

  const show = () => {
    if (!id) {
      return
    }
    showModal('商品库存', GoodsInhouseView, { id })
  }
  return (
    <Tooltip title='商品库存'>
      <Svg name='btn-stock-h' onClick={show} disabled={!id} />
    </Tooltip>
  )
}

function ExWarehouseBtn({ id }: BtnProps) {
  const { showModal } = useGlobalModal()

  const show = () => {
    if (!id) {
      return
    }
    showModal('商品出库', ExWarehouseView, { id })
  }

  return (
    <Tooltip title='商品出库'>
      <Svg name='btn-sell-h' onClick={show} disabled={!id} />
    </Tooltip>
  )
}

interface GoodsItemHeaderProps {
  children?: React.ReactNode
  name?: string | null | undefined
  id?: string | null | undefined
}

function GoodsItemHeader({ children, name, id }: GoodsItemHeaderProps) {
  return (
    <div className={styles.header}>
      <span>{children}</span>
      <span>{name}</span>
      <CreateGoodsBtn id={id} />
      <GoodsInWarehouseBtn id={id} />
      <ExWarehouseBtn id={id} />
      <GoodsExWarehouseBtn id={id} />
    </div>
  )
}

export default GoodsItemHeader
