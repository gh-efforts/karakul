/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Table, Input, Form, Button, Select } from 'antd'
import type { FormInstance } from 'antd/lib/form'

import styles from './index.module.scss'
import { Svg, OrderMaterialsSelect } from '../../../components'

import { Material } from '../material.d'
import { ActionTypeOptions } from '../form/edit-from'
import { ActionTypeMap, ActionType } from '../service'

interface EditableCellProps extends React.EmbedHTMLAttributes<HTMLElement> {
  editing?: boolean
  dataIndex?: string
  title?: string
  inputType?: 'text' | 'type' | 'action' | 'number'
  record: Material
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
      cell = <OrderMaterialsSelect name='material' noLabel style={{ margin: 0 }} initialValue={initialValue} />
      break
    case 'action':
      cell = (
        <Form.Item name='action' style={{ margin: 0 }} initialValue={initialValue as ActionType}>
          <Select placeholder='请选择行为'>{ActionTypeOptions}</Select>
        </Form.Item>
      )
      break
    case 'number':
      cell = (
        <Form.Item name={dataIndex} style={{ margin: 0 }} initialValue={initialValue}>
          <Input type='number' placeholder={`请输入${title}`} />
        </Form.Item>
      )
      break
    default:
      cell = (
        <Form.Item name={dataIndex} style={{ margin: 0 }} initialValue={initialValue}>
          <Input placeholder={`请输入${title}`} />
        </Form.Item>
      )
      break
  }
  return <td {...restProps}>{editing ? cell : children}</td>
}

const isEditing = (index: number | undefined | null, key: number | undefined) => index === key

export type CellEmit = (type: 'edit' | 'cancel' | 'save' | 'del', record?: Material, index?: number) => void

const generateColumns = (emit?: CellEmit, key?: number | undefined): ColumnProps<Material>[] => {
  return [
    {
      title: '分类',
      dataIndex: 'material',
      width: 120,
      onCell(record: Material) {
        return {
          record,
          title: '分类',
          dataIndex: 'material',
          editing: false,
          inputType: 'type',
          initialValue: `${record?.material ?? ''}`,
        } as EditableCellProps
      },
    },
    {
      title: '型号',
      dataIndex: 'model',
      width: 120,
      onCell(record: Material) {
        return {
          record,
          title: '型号',
          dataIndex: 'model',
          editing: false,
          initialValue: record?.model,
        } as EditableCellProps
      },
    },
    {
      title: '数量',
      dataIndex: 'amount',
      width: 120,
      onCell(record: Material, index: number | undefined) {
        return {
          record,
          title: '数量',
          dataIndex: 'amount',
          inputType: 'number',
          editing: isEditing(index, key),
          initialValue: record?.amount,
        } as EditableCellProps
      },
    },
    {
      title: '行为',
      dataIndex: 'action',
      width: 120,
      render: text => ActionTypeMap[text as ActionType],
      onCell(record: Material, index: number | undefined) {
        return {
          record,
          title: '行为',
          dataIndex: 'action',
          editing: isEditing(index, key),
          inputType: 'action',
          initialValue: record.action as ActionType,
        } as EditableCellProps
      },
    },
    {
      title: '操作',
      width: 90,
      render(_, record, index) {
        const editing = isEditing(index, key)

        return editing ? (
          <span className={styles['opt-btns']}>
            <Button
              type='text'
              onClick={() => {
                emit?.('save', record, index)
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
                emit?.('cancel', record, index)
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
                emit?.('edit', record, index)
              }}
            />
            <Svg
              name='btn-del-h'
              onClick={() => {
                emit?.('del', record, index)
              }}
            />
          </span>
        )
      },
    },
  ]
}

interface EditMaterialsTableProps {
  data?: Material[]
  emit?: CellEmit
  editingKey?: number
  form?: FormInstance
}

function EditMaterialsTable({ data, editingKey, emit, form }: EditMaterialsTableProps) {
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
        rowKey={(item, idx) => `${item?.id ?? ''}-${idx}`}
      />
    </Form>
  )
}

export default EditMaterialsTable
