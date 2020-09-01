import React, { useState, useMemo, useCallback } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Table, Input, Form, Button } from 'antd'

import styles from './index.module.scss'
import { Svg } from '../../../components'

interface GoodsItem {
  id?: string
  type?: string
  madel?: string
  label?: string
}

interface EditableCellProps extends React.EmbedHTMLAttributes<HTMLElement> {
  editing?: boolean
  dataIndex?: string
  title?: string
  inputType?: 'text' | 'type'
  record: GoodsItem
  index?: number
  children?: React.ReactNode
}

function EditableCell({ editing, children, dataIndex, ...restProps }: EditableCellProps) {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const isEditing = (key: string | undefined, record: GoodsItem) => record?.id === key
type CellEmit = (type: 'edit' | 'cancel' | 'save' | 'del', data?: string) => void

const generateColumns = (key: string | undefined, emit: CellEmit): ColumnProps<GoodsItem>[] => {
  return [
    {
      title: '配件编号',
      dataIndex: 'id',
      onCell(record: GoodsItem) {
        return {
          record,
          dataIndex: 'id',
          title: '配件编号',
          editing: isEditing(key, record),
        } as EditableCellProps
      },
    },
    {
      title: '分类',
      dataIndex: 'type',
      onCell(record: GoodsItem) {
        return {
          record,
          title: '型号',
          dataIndex: 'madel',
          editing: isEditing(key, record),
        } as EditableCellProps
      },
    },
    {
      title: '型号',
      dataIndex: 'madel',
      onCell(record: GoodsItem) {
        return {
          record,
          title: '型号',
          dataIndex: 'madel',
          editing: isEditing(key, record),
        } as EditableCellProps
      },
    },
    {
      title: '标示',
      dataIndex: 'label',
      onCell(record: GoodsItem) {
        return {
          record,
          title: '标示',
          dataIndex: 'label',
          editing: isEditing(key, record),
        } as EditableCellProps
      },
    },
    {
      title: '操作',
      width: 160,
      render(_, record) {
        const editing = isEditing(key, record)

        return editing ? (
          <span>
            <Button
              type='text'
              onClick={() => {
                emit('save', record?.id)
              }}
              style={{
                color: '#00B2B6',
              }}
            >
              保存
            </Button>
            <Button
              type='text'
              onClick={() => {
                emit('cancel')
              }}
            >
              取消
            </Button>
          </span>
        ) : (
          <span className={styles['opt-btns']}>
            <Svg
              name='btn-edit-h'
              onClick={() => {
                emit('edit', record?.id)
              }}
            />
            <Svg
              name='btn-del-h'
              onClick={() => {
                emit('del', record?.id)
              }}
            />
          </span>
        )
      },
    },
  ]
}

const data: GoodsItem[] = [
  {
    id: 'id',
    type: 'type',
    madel: 'madel',
    label: 'label',
  },
]

function CreateGoodsTable() {
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState<string | undefined>('')

  const edit = useCallback(
    (id?: string) => {
      form.setFieldsValue({ name: '', age: '', address: '' })
      setEditingKey(id)
    },
    [form]
  )

  const cancel = useCallback(() => {
    setEditingKey('')
  }, [])

  const emit = useCallback<CellEmit>(
    (type, id) => {
      switch (type) {
        case 'edit':
          edit(id)
          break
        case 'cancel':
          cancel()
          break
        case 'del':
          cancel()
          break
        case 'save':
          cancel()
          break
        default:
          break
      }
    },
    [cancel, edit]
  )

  const columns = useMemo(() => {
    return generateColumns(editingKey, emit)
  }, [editingKey, emit])

  return (
    <Table
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      dataSource={data}
      columns={columns}
      pagination={false}
      className={styles.table}
      rowKey='id'
    />
  )
}

export default CreateGoodsTable
