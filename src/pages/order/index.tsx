import React from 'react'
import { withLayout } from '../../layout'
import { Button } from 'antd'
import styles from './index.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import { SubHeader, Svg, KTable, useGlobalModal } from '../../components'

function CreateModalView(): React.ReactElement {
  return <div>模态框</div>
}

function Order(): React.ReactElement {
  const nameRender = (text: string): React.ReactElement => <span>{text}</span>
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: nameRender,
    },
  ]

  const data = [{}]

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
      <KTable columns={columns} data={data} currentPage={1} total={data.length} />
    </div>
  )
}

export default withLayout(Order)
