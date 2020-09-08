import React, { useState, ReactNode, useCallback } from 'react'

import CreateForm from '../form/creat-form'
import { useGlobalModal, message, getRealValue } from '../../../components'

import ModalView from './modal'
import { Material } from '../material.d'
import { useCreateOrderMaterialsApi, ActionType } from '../service'
import { MaterialsInput } from '../../../services'
import { useRouter } from 'next/router'
import CreateMaterialsTable, { CellEmit } from '../table/create-material-table'
import { Form } from 'antd'
export interface CreateModalViewProps {
  id?: string

  children?: ReactNode
}
function CreateModalView({ id }: CreateModalViewProps): React.ReactElement {
  const { hideModal } = useGlobalModal()
  const router = useRouter()
  const [data, setData] = useState<Material[]>([])

  const { submit, loading } = useCreateOrderMaterialsApi()

  // 表格表单
  const [tableForm] = Form.useForm()
  // 正在编辑的 item key 值
  const [editingKey, setEditingKey] = useState<string | undefined>('')

  // 编辑单元格
  const edit = useCallback(
    id => {
      // 编辑时赋值
      tableForm.resetFields()

      setEditingKey(id ?? '')
    },
    [tableForm]
  )

  // 取消编辑单元格
  const cancel = useCallback(() => {
    setEditingKey('')
  }, [])

  // 保存编辑单元格
  const save = useCallback(
    key => {
      const { amount, material, model } = tableForm.getFieldsValue()

      setData(d =>
        d.map(i => {
          if (i?.id !== key) {
            return i
          }
          return {
            amount: parseInt(amount),
            model,
            id: key,
            material,
          } as Material
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
          cancel()
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
  const onOK = () => {
    if (data && id) {
      const subData: MaterialsInput[] = data.map(item => {
        return {
          material: item.material,
          amount: item.amount,
          model: item.model,
          action: ActionType.Create,
        }
      })
      if (subData) {
        submit(subData, id)
          .then(() => {
            message.success('创建成功')

            hideModal()
            router.replace({
              pathname: router.pathname,
              query: router.query,
            })
          })
          .catch(() => {
            message.error('创建失败')
          })
      } else {
        message.info('请添加原材料信息')
      }
    }
  }
  const onSubmit = (values: Material) => {
    setData([...data, values])
  }

  return (
    <ModalView orderId={id ?? ''} OKText='创建' onOK={onOK} loading={loading}>
      <CreateForm onSubmit={onSubmit} />
      <CreateMaterialsTable data={data} editingKey={editingKey} emit={emit} form={tableForm} />
    </ModalView>
  )
}
export default CreateModalView
