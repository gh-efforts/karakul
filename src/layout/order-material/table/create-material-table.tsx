/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Table, Input, Form, Button } from 'antd'
import type { FormInstance } from 'antd/lib/form'

import styles from './index.module.scss'
import { Svg, MaterialsSelect } from '../../../components'

import { Material } from '../material.d'

interface EditableCellProps extends React.EmbedHTMLAttributes<HTMLElement> {
  editing?: boolean
  dataIndex?: string
  title?: string
  inputType?: 'text' | 'type' | 'number'
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
      cell = <MaterialsSelect name='material' noLabel style={{ margin: 0 }} initialValue={initialValue} />
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

const isEditing = (record: Material, key: string | undefined) => record?.id === key

export type CellEmit = (
  type: 'edit' | 'cancel' | 'save' | 'del',
  id?: string | undefined | null,
  record?: Material
) => void

const generateColumns = (emit?: CellEmit, key?: string | undefined): ColumnProps<Material>[] => {
  return [
    {
      title: '分类',
      dataIndex: ['material', 'name'],
      width: 120,
      onCell(record: Material) {
        return {
          record,
          title: '分类',
          dataIndex: 'material',
          editing: isEditing(record, key),
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
          editing: isEditing(record, key),
          initialValue: record?.model,
        } as EditableCellProps
      },
    },
    {
      title: '数量',
      dataIndex: 'amount',
      width: 120,
      onCell(record: Material) {
        return {
          record,
          title: '数量',
          dataIndex: 'amount',
          inputType: 'number',
          editing: isEditing(record, key),
          initialValue: record?.amount,
        } as EditableCellProps
      },
    },

    {
      title: '操作',
      width: 90,
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
                emit?.('edit', '', record)
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

interface CreateMaterialsTableProps {
  data?: Material[]
  emit?: CellEmit
  editingKey?: string
  form?: FormInstance
}

function CreateMaterialsTable({ data, editingKey, emit, form }: CreateMaterialsTableProps) {
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
        rowKey='id'
      />
    </Form>
  )
}

export default CreateMaterialsTable
