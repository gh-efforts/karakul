/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react'
import { PlusSquareOutlined } from '@ant-design/icons'
import { Form } from 'antd'

import { ModalButtonGroup, getRealValue, message, useGlobalModal } from '../../../components'
import UpdateGoodsTable, { CellEmit } from './goods-table'
import { SAccessory, OrderCommodity } from '../goods.d'
import { useUpdateCommodityApi } from '../service'
import { getLocalStore } from '../../../helpers/cookie'
import { Enum_Commodity_State } from '../../../services'

import styles from './index.module.scss'
import GoodsForm from './goods-form'
import { parseCsvDataToSAccessory } from '../csv-parser'

interface UpdateGoodsViewProps {
  record?: OrderCommodity
  children?: React.ReactNode
  refresh?: () => void
}

function UpdateGoodsView({ record, refresh }: UpdateGoodsViewProps) {
  const { updateCommodit, loading } = useUpdateCommodityApi()
  const { hideModal } = useGlobalModal()
  // 新增数据
  const [data, setData] = useState<SAccessory[]>(() => {
    if (Array.isArray(record?.accessories)) {
      return [...(record?.accessories as SAccessory[])]
    }
    return []
  })
  // 商品表单
  const [form] = Form.useForm()

  // 表格表单
  const [tableForm] = Form.useForm()
  // 正在编辑的 item key 值
  const [editingKey, setEditingKey] = useState<string | undefined>('')
  // 判断是否是新增
  const [isAdding, setIsAdding] = useState(false)

  const onAdd = () => {
    // 正在编辑则取消
    if (editingKey) {
      return
    }

    tableForm.resetFields()

    // 默认赋值当前时间
    const id = new Date().getTime().toString()

    setData(d => {
      return [...d, { id }] as SAccessory[]
    })
    setIsAdding(true)
    setEditingKey(id)
  }

  // 编辑单元格
  const edit = useCallback(
    (id?: string) => {
      if (isAdding) {
        return
      }

      // 编辑时赋值
      tableForm.resetFields()
      // tableForm.setFieldsValue({ name: '', age: '', address: '' } as SAccessory)
      setIsAdding(false)
      setEditingKey(id)
    },
    [isAdding, tableForm]
  )

  // 取消编辑单元格
  const cancel = useCallback(
    key => {
      // 取消时，如果新增则删除，如果编辑则取消更改
      setEditingKey('')
      if (isAdding) {
        setData(d => d.filter(i => i?.id !== key))
        setIsAdding(false)
      }
    },
    [isAdding]
  )

  // 保存编辑单元格
  const save = useCallback(
    key => {
      const { label, material, model, sn } = tableForm.getFieldsValue()

      const [mid, mname] = getRealValue(material)

      setData(d =>
        d.map(i => {
          if (i?.id !== key) {
            return i
          }
          return {
            label,
            model,
            id: key,
            sn,
            material: {
              id: mid,
              name: mname,
            },
          } as SAccessory
        })
      )

      tableForm.resetFields()
      setEditingKey('')
    },
    [tableForm]
  )

  // 删除单元格
  const del = useCallback(key => {
    setData(d => d.filter(i => i?.id !== key))
  }, [])

  // 单元格逻辑
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
    [cancel, edit, save, del]
  )

  const onOk = async () => {
    const { code, commodity_type, warehouse } = form.getFieldsValue()
    const [cid] = getRealValue(commodity_type)
    const [wid] = getRealValue(warehouse)

    const uid = getLocalStore('userId')

    if (!uid || !record?.id) {
      message.error('数据错误')
      return
    }

    try {
      await form.validateFields()
      const flag = await updateCommodit(record?.id, {
        user: uid,
        code,
        commodity_type: cid,
        warehouse: wid,
        state: Enum_Commodity_State.In,
        accessories: data,
      })

      if (flag) {
        refresh?.()
        hideModal()
      }
    } catch {}
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length && e.target.value) {
      parseCsvDataToSAccessory(e.target.files[0], data, 'preferPrevious').then(res => {
        if (Array.isArray(res)) {
          setData(res)

          // 导入时取消编辑状态
          setEditingKey('')
          setIsAdding(false)
        }
      })
    }
  }

  return (
    <div>
      <div className={styles.title}>
        <span>商品编号: {record?.id || ''}</span>
        <span className={`${styles['title-right']} ${editingKey && styles['btn-disable']}`} onClick={onAdd}>
          <PlusSquareOutlined />
          添加
        </span>

        <label htmlFor='file-input' className={styles['title-right']}>
          <PlusSquareOutlined />
          导入
          <input type='file' accept='text/csv' id='file-input' onChange={onFileChange} hidden />
        </label>

        <span className={styles['title-right']}>
          <a href='/file/template.csv' target='_blank' download>
            模板文件
          </a>
        </span>
      </div>
      <div className={styles.content}>
        <GoodsForm form={form} record={record} />
        <div className={styles.horizontal} />
        <UpdateGoodsTable data={data} editingKey={editingKey} emit={emit} form={tableForm} />
        <ModalButtonGroup onOK={onOk} OKText='保存' className={styles.btns} position='left' loading={loading} />
      </div>
    </div>
  )
}

export default UpdateGoodsView
