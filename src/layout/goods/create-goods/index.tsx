/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react'
import { PlusSquareOutlined } from '@ant-design/icons'
import { Form } from 'antd'

import { ModalButtonGroup } from '../../../components'
import CreateGoodsTable, { CellEmit } from './goods-table'
import { SAccessory } from '../goods.d'
import GoodsForm from './goods-form'

import styles from './index.module.scss'

interface CreateGoodsViewProps {
  id?: string
  children?: React.ReactNode
}

function CreateGoodsView({ id }: CreateGoodsViewProps) {
  const [data, setData] = useState<SAccessory[]>([])
  const [form] = Form.useForm()
  const [tableForm] = Form.useForm()

  const [editingKey, setEditingKey] = useState<string | undefined>('')

  const onAdd = () => {
    const id = new Date().getTime().toString()

    setData(d => {
      return [...d, { id }] as SAccessory[]
    })
    setEditingKey(id)
  }

  const edit = useCallback(
    (id?: string) => {
      tableForm.setFieldsValue({ name: '', age: '', address: '' } as SAccessory)
      setEditingKey(id)
    },
    [tableForm]
  )

  const cancel = useCallback(key => {
    setEditingKey('')
    setData(d => d.filter(i => i?.id !== key))
  }, [])

  const save = useCallback(
    key => {
      const values = tableForm.getFieldsValue()

      setData(d =>
        d.map(i => {
          if (i?.id === key) {
            return i
          }
          return { ...values } as SAccessory
        })
      )

      tableForm.resetFields()
    },
    [tableForm]
  )

  const del = useCallback(key => {
    setData(d => d.filter(i => i?.id !== key))
  }, [])

  const emit = useCallback<CellEmit>(
    (type, id) => {
      switch (type) {
        case 'edit':
          edit(id)
          break
        case 'cancel':
          cancel(id)
          break
        case 'del':
          del(id)
          break
        case 'save':
          save(id)
          break
        default:
          break
      }
    },
    [cancel, del, edit, save]
  )

  return (
    <div>
      <div className={styles.title}>
        <span>订单编号{id}</span>
        <span className={styles['title-right']} onClick={onAdd}>
          <PlusSquareOutlined />
          添加
        </span>
        <span className={styles['title-right']}>
          <PlusSquareOutlined />
          导入
        </span>
      </div>
      <div className={styles.content}>
        <GoodsForm form={form} />
        <div className={styles.horizontal} />
        <CreateGoodsTable data={data} editingKey={editingKey} emit={emit} />
        <ModalButtonGroup OKText='保存' className={styles.btns} position='left' />
      </div>
    </div>
  )
}

export default CreateGoodsView
