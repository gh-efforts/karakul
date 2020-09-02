import React from 'react'
import { Button } from 'antd'

import CreateGoodsView from './../create-goods'
import GoodsHistoryView from './../goods-history'
import ExWarehouseView from './../ex-warehouse'
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

function ExWarehouseBtn({ id }: BtnProps) {
  const { showModal } = useGlobalModal()

  const show = () => {
    if (!id) {
      return
    }

    showModal('商品出库', ExWarehouseView, { id })
  }

  return <Svg name='btn-sell-h' onClick={show} />
}

function GoodsHistoryBtn({ id }: BtnProps) {
  const { showModal } = useGlobalModal()

  const show = () => {
    if (!id) {
      return
    }

    showModal('商品历史', GoodsHistoryView, { id })
  }

  return <Svg name='btn-history-h' onClick={show} />
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
      <ExWarehouseBtn />
      <GoodsHistoryBtn />
    </div>
  )
}

export default GoodsItemHeader
