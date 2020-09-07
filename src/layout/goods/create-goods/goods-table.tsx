/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Table, Input, Form, Button, Tooltip } from 'antd'
import type { FormInstance } from 'antd/lib/form'

import styles from './index.module.scss'
import { Svg, MaterialsSelect } from '../../../components'
import { SAccessory } from '../goods.d'

interface EditableCellProps extends React.EmbedHTMLAttributes<HTMLElement> {
  editing?: boolean
  dataIndex?: string
  title?: string
  inputType?: 'text' | 'type'
  record: SAccessory
  index?: number
  children?: React.ReactNode
  initialValue?: any
}

function EditableCell({
  editing,
  children,
  inputType,
  dataIndex,
  title,
  initialValue,
  ...restProps
}: EditableCellProps) {
  let cell: React.ReactNode
  switch (inputType) {
    case 'type':
      cell = <MaterialsSelect name='material' noLabel style={{ margin: 0 }} initialValue={initialValue} />
      break

    default:
      cell = (
        <Form.Item name={dataIndex} style={{ margin: 0 }} initialValue={initialValue}>
          <Input placeholder={`请输入${title}`} />
        </Form.Item>
      )
      break
  }

  const child =
    title === '操作' ? (
      children
    ) : (
      <Tooltip title={children}>
        <span>{children}</span>
      </Tooltip>
    )

  return <td {...restProps}>{editing ? cell : child}</td>
}

const isEditing = (record: SAccessory, key: string | undefined) => record?.id === key

export type CellEmit = (type: 'edit' | 'cancel' | 'save' | 'del', id?: string) => void

const generateColumns = (emit?: CellEmit, key?: string | undefined): ColumnProps<SAccessory>[] => {
  return [
    {
      title: '分类',
      dataIndex: ['material', 'name'],
      width: 120,
      ellipsis: true,
      onCell(record: SAccessory) {
        return {
          record,
          title: '分类',
          dataIndex: 'material',
          editing: isEditing(record, key),
          inputType: 'type',
          initialValue: `${record?.material?.id?.trim() ?? ''}__${record?.material?.name?.trim() ?? ''}`,
        } as EditableCellProps
      },
    },
    {
      title: '型号',
      dataIndex: 'model',
      width: 120,
      ellipsis: true,
      onCell(record: SAccessory) {
        return {
          record,
          title: '型号',
          dataIndex: 'model',
          editing: isEditing(record, key),
          initialValue: record?.model,
        } as EditableCellProps
      },
    },
    {
      title: '标示',
      dataIndex: 'label',
      width: 120,
      ellipsis: true,
      onCell(record: SAccessory) {
        return {
          record,
          title: '标示',
          dataIndex: 'label',
          editing: isEditing(record, key),
          initialValue: record?.label,
        } as EditableCellProps
      },
    },
    {
      title: '配件编号',
      dataIndex: 'sn',
      width: 120,
      ellipsis: true,
      onCell(record: SAccessory) {
        return {
          record,
          dataIndex: 'sn',
          title: '配件编号',
          editing: isEditing(record, key),
          initialValue: record?.sn,
        } as EditableCellProps
      },
    },
    {
      title: '操作',
      width: 90,
      onCell() {
        return {
          title: '操作',
        }
      },
      render(_, record) {
        const editing = isEditing(record, key)

        return editing ? (
          <span className={styles['opt-btns']}>
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
  form?: FormInstance
}

function CreateGoodsTable({ data, editingKey, emit, form }: CreateGoodsTableProps) {
  const columns = useMemo(() => {
    return generateColumns(emit, editingKey)
  }, [emit, editingKey])

  return (
    <Form form={form} component={false}>
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
        rowKey={k => `${k?.id}-${k?.sn}`}
      />
    </Form>
  )
}

export default CreateGoodsTable
