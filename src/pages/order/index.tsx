import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { withLayout } from '../../layout'
import { SubHeader, Svg, KTable, useGlobalModal, ModalButtonGroup } from '../../components'

import columns, { TOrder } from './columns'

import styles from './index.module.scss'

function CreateModalView(): React.ReactElement {
  return (
    <div>
      模态框
      <ModalButtonGroup />
    </div>
  )
}

function Order(): React.ReactElement {
  const data: TOrder[] = [
    {
      id: 'id',
      created_at: 'created_at',
      updated_at: 'updated_at',
      detail: 'detail',
      amount: 10,
      delivery_time: 'delivery_time',
      created_by: {
        username: 'created_by',
      },
      updated_by: {
        username: 'updated_by',
      },
    },
  ]

  const { showModal, hideModal } = useGlobalModal()
  const showCreateModal = () => {
    showModal('新建动作', CreateModalView, {
      onSuccess: () => {
        hideModal()
      },
    })
  }

  return (
    <div className={styles.order}>
      <SubHeader title='订单'>
        <Button type='primary' icon={<PlusOutlined />} size='large' onClick={showCreateModal}>
          创建订单
        </Button>
        <Button icon={<Svg name='ico-search-h' offsetX='-2' offsetY='2' />} size='large' />
      </SubHeader>
      <KTable<TOrder> columns={columns} data={data} currentPage={1} total={data.length} rowKey='id' />
    </div>
  )
}

export default withLayout(Order)
