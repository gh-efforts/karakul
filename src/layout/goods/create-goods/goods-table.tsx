import React, { useMemo } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Table, Input, Form, Button } from 'antd'

import styles from './index.module.scss'
import { Svg } from '../../../components'
import { SAccessory } from '../goods.d'

interface EditableCellProps extends React.EmbedHTMLAttributes<HTMLElement> {
  editing?: boolean
  dataIndex?: string
  title?: string
  inputType?: 'text' | 'type'
  record: SAccessory
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

const isEditing = (record: SAccessory, key: string | undefined) => record?.id === key

export type CellEmit = (type: 'edit' | 'cancel' | 'save' | 'del', data?: string) => void

const generateColumns = (emit?: CellEmit, key?: string | undefined): ColumnProps<SAccessory>[] => {
  return [
    {
      title: '分类',
      dataIndex: 'mName',
      onCell(record: SAccessory) {
        return {
          record,
          title: '分类',
          dataIndex: 'mName',
          editing: isEditing(record, key),
        } as EditableCellProps
      },
    },
    {
      title: '型号',
      dataIndex: 'type',
      onCell(record: SAccessory) {
        return {
          record,
          title: '型号',
          dataIndex: 'type',
          editing: isEditing(record, key),
        } as EditableCellProps
      },
    },
    {
      title: '标示',
      dataIndex: 'label',
      onCell(record: SAccessory) {
        return {
          record,
          title: '标示',
          dataIndex: 'label',
          editing: isEditing(record, key),
        } as EditableCellProps
      },
    },
    {
      title: '配件编号',
      dataIndex: 'id',
      onCell(record: SAccessory) {
        return {
          record,
          dataIndex: 'id',
          title: '配件编号',
          editing: isEditing(record, key),
        } as EditableCellProps
      },
    },
    {
      title: '操作',
      width: 160,
      render(_, record) {
        const editing = isEditing(record, key)

        return editing ? (
          <span>
            <Button
              type='text'
              onClick={() => {
                emit?.('save', record?.id)
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
                emit?.('cancel', record?.id)
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
                emit?.('edit', record?.id)
              }}
            />
            <Svg
              name='btn-del-h'
              onClick={() => {
                emit?.('del', record?.id)
              }}
            />
          </span>
        )
      },
    },
  ]
}

interface CreateGoodsTableProps {
  data?: SAccessory[]
  emit?: CellEmit
  editingKey?: string
}

function CreateGoodsTable({ data, editingKey, emit }: CreateGoodsTableProps) {
  const columns = useMemo(() => {
    return generateColumns(emit, editingKey)
  }, [emit, editingKey])

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
