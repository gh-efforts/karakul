import React from 'react'
import { MinusCircleOutlined, EditOutlined } from '@ant-design/icons'
import { ColumnProps } from 'antd/lib/table'
import { Tooltip, message } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

import { useGlobalModal } from '../../../components'
import UpdateModalView, { UpdateModalViewProps } from '../modal/edit-modal'
import { Dispatch, RootState, CommodityTypeType } from '../../../store/type.d'

interface DeleteButtonProps {
  id: string
}

function EditButton({ id, name }: UpdateModalViewProps): React.ReactElement {
  const { showModal } = useGlobalModal()

  const show = () => {
    showModal('修改分类', UpdateModalView, { id, name }, 400)
  }

  return (
    <Tooltip title='修改分类'>
      <EditOutlined style={{ color: '#FF9C7C' }} onClick={show} />
    </Tooltip>
  )
}

function DeleteButton({ id }: DeleteButtonProps) {
  const dispatch = useDispatch<Dispatch>()
  const { loading } = useSelector<RootState, RootState['goodsType']>(s => s.goodsType)
  const { hideModal } = useGlobalModal()

  const onDelete = async () => {
    const flag = await dispatch.goodsType.delete(id)
    if (flag) {
      message.success('删除成功')
      hideModal()
    } else {
      message.error('删除失败')
    }
  }

  return <MinusCircleOutlined disabled={loading} style={{ color: '#657683' }} onClick={onDelete} />
}

const columns: ColumnProps<CommodityTypeType>[] = [
  {
    title: '商品类型',
    dataIndex: 'name',
    ellipsis: true,
  },

  {
    title: '创建人',
    dataIndex: ['user', 'username'],
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    ellipsis: true,
    render: text => moment(text).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    title: '操作',
    width: 160,
    render(_text: string, record: CommodityTypeType) {
      return (
        <span className='table-operation-group'>
          <EditButton id={record.id} name={record.name ?? ''} />
          <DeleteButton id={record.id} />
        </span>
      )
    },
  },
]

export default columns
