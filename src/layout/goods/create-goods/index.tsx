/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback, useRef } from 'react'
import { PlusSquareOutlined } from '@ant-design/icons'
import { Form, Popconfirm } from 'antd'
import PapaParse from 'papaparse'

import { ModalButtonGroup, getRealValue, message, useGlobalModal } from '../../../components'
import CreateGoodsTable, { CellEmit } from './goods-table'
import { SAccessory } from '../goods.d'
import GoodsForm from './goods-form'
import { useCreateCommodityApi } from '../service'
import { getLocalStore } from '../../../helpers/cookie'
import { Enum_Commodity_State } from '../../../services'

import styles from './index.module.scss'
import { useRouter } from 'next/router'

interface CreateGoodsViewProps {
  id?: string
  children?: React.ReactNode
}

// transfer ParseResult to SAccessory[]
const transfer = (res: PapaParse.ParseResult<unknown>) => {
  if (res.errors.length || res.data.length < 2) {
    // eslint-disable-next-line standard/no-callback-literal
    return [] as SAccessory[]
  } else {
    // 标记 id
    const now = new Date().getTime().toString()
    const headers = res.data[0] as string[]
    const keys = ['分类', '型号', '标示', '配件编号']
    const pos: { [p: string]: number } = {
      分类: 999,
      型号: 999,
      标示: 999,
      配件编号: 999,
    }

    // 获取 key 值对应的 index
    for (const k of keys) {
      const idx = headers.findIndex(h => h.includes(k))
      if (idx >= 0) {
        pos[k] = idx
      }
    }

    // 转换数据格式
    const transfered = res.data
      .map((o, i) => {
        // 排除错误数据 和 header 行
        if (!Array.isArray(o) || i === 0) {
          return null
        }

        // 排除空数据
        if (o[pos['分类']] || o[pos['型号']] || o[pos['标示']] || o[pos['配件编号']]) {
          return {
            id: `${now}-i-${i}`,
            material: { name: o[pos['分类']] },
            model: o[pos['型号']],
            label: o[pos['标示']],
            sn: o[pos['配件编号']],
          } as SAccessory
        }
        return null
      })
      .filter(Boolean) as SAccessory[]

    return transfered
  }
}

// 获取 csv 数据
//
// https://github.com/Bunlong/react-papaparse/blob/master/src/CSVReader.tsx
export function parseCsvDataToSAccessory(file: File, cb: (data: SAccessory[]) => void) {
  const reader = new window.FileReader()

  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (e.target?.result) {
      PapaParse.parse(e.target.result as string, {
        complete(res) {
          cb(transfer(res))
        },
      })
    }
  }

  reader.readAsText(file, 'utf-8')
}

function CreateGoodsView({ id }: CreateGoodsViewProps) {
  const { createCommodit, loading } = useCreateCommodityApi()
  const { hideModal } = useGlobalModal()
  const router = useRouter()
  // 新增数据
  const [data, setData] = useState<SAccessory[]>([])
  // 商品表单
  const [form] = Form.useForm()
  // 表格表单
  const [tableForm] = Form.useForm()
  // 正在编辑的 item key 值
  const [editingKey, setEditingKey] = useState<string | undefined>('')
  // 判断是否是新增
  const [isAdding, setIsAdding] = useState(false)

  const fileInputRef = useRef(null)

  const onAdd = () => {
    // 正在编辑则取消
    if (editingKey) {
      return
    }

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
      // 编辑时赋值
      tableForm.setFieldsValue({ name: '', age: '', address: '' } as SAccessory)
      setIsAdding(false)
      setEditingKey(id)
    },
    [tableForm]
  )

  // 取消编辑单元格
  const cancel = useCallback(
    key => {
      // 取消时，如果新增则删除，如果编辑则取消更改
      setEditingKey('')
      if (isAdding) {
        setData(d => d.filter(i => i?.id !== key))
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

    if (!uid || !id) {
      message.error('数据错误')
      return
    }

    try {
      await form.validateFields()
      const flag = await createCommodit({
        user: uid,
        order: id,
        code,
        commodity_type: cid,
        warehouse: wid,
        state: Enum_Commodity_State.In,
        accessories: data,
      })

      if (flag) {
        router.replace('/goods')
        hideModal()
      }
    } catch (errorInfo) {
      message.error('请先填写商品信息')
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length && e.target.value) {
      parseCsvDataToSAccessory(e.target.files[0], res => {
        if (res?.length) {
          setData(res)

          // 导入时取消编辑状态
          setEditingKey('')
          setIsAdding(false)
        }
      })
    }
  }

  const onImportClick = () => {
    ;(fileInputRef?.current as HTMLInputElement | null)?.click()
  }

  return (
    <div>
      <div className={styles.title}>
        <span>订单编号: {id || ''}</span>
        <span className={`${styles['title-right']} ${editingKey && styles['btn-disable']}`} onClick={onAdd}>
          <PlusSquareOutlined />
          添加
        </span>

        <Popconfirm
          placement='top'
          title='导入数据会替换当前编辑数据,是否继续?'
          onConfirm={onImportClick}
          okText='导入'
          cancelText='取消'
        >
          <span className={styles['title-right']}>
            <PlusSquareOutlined />
            导入
          </span>
        </Popconfirm>
        <span className={styles['title-right']}>
          <a href='/file/template.csv' target='_blank' download>
            模板文件
          </a>
        </span>
        <input ref={fileInputRef} type='file' accept='text/csv' id='file-input' onChange={onFileChange} hidden />
      </div>
      <div className={styles.content}>
        <GoodsForm form={form} />
        <div className={styles.horizontal} />
        <CreateGoodsTable data={data} editingKey={editingKey} emit={emit} form={tableForm} />
        <ModalButtonGroup onOK={onOk} OKText='保存' className={styles.btns} position='left' loading={loading} />
      </div>
    </div>
  )
}

export default CreateGoodsView
