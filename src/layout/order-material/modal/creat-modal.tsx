import React, { useState, useCallback } from 'react'
import { Form, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import CreateForm from '../form/creat-form'
import { useGlobalModal } from '../../../components'
import ModalView from './modal'
import { MaterialsInput } from '../../../services'
import CreateMaterialsTable, { CellEmit } from '../table/create-material-table'
import { Dispatch, RootState, ActionType, Material } from '../../../store/type.d'

function CreateModalView() {
  const dispatch = useDispatch<Dispatch>()

  const { hideModal } = useGlobalModal()
  const { loading } = useSelector<RootState, RootState['orderMaterial']>(s => s.orderMaterial)

  const [data, setData] = useState<Material[]>([])

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
  const onOK = async () => {
    const subData: MaterialsInput[] = data?.map(item => {
      return {
        material: item.material,
        amount: item.amount,
        model: item.model,
        action: ActionType.Create,
      }
    })

    if (subData.length > 0) {
      const flag = await dispatch.orderMaterial.create(subData)
      if (flag) {
        message.success('创建成功')
        hideModal()
      } else {
        message.error('创建失败')
      }
    } else {
      message.info('请添加原材料信息')
    }
  }
  const onSubmit = (values: Material) => {
    setData([...data, values])
  }

  return (
    <ModalView OKText='创建' onOK={onOK} loading={loading}>
      <CreateForm onSubmit={onSubmit} />
      <CreateMaterialsTable data={data} editingKey={editingKey} emit={emit} form={tableForm} />
    </ModalView>
  )
}
export default CreateModalView
