import React, { useState, useCallback } from 'react'

import ModalView from './modal'
import { useGlobalModal, message, getRealValue } from '../../../components'
import EditForm, { RemarkFrom } from '../form/edit-from'
import { Material } from '../material.d'
import { useRouter } from 'next/router'
import { MaterialsInput, UploadFile } from '../../../services'
import { useUpdateOrderMaterialsApi, ActionType } from '../service'
import { Form } from 'antd'

import EditMaterialsTable, { CellEmit } from '../table/edit-material-table'

export interface EditModalViewProps {
  id?: string
  children?: React.ReactNode
}
function EditModalView({ id }: EditModalViewProps): React.ReactElement {
  const [form] = Form.useForm()
  const { hideModal } = useGlobalModal()
  const router = useRouter()

  const [data, setData] = useState<Material[]>([])
  const { submit, loading } = useUpdateOrderMaterialsApi()
  // 表格表单
  const [tableForm] = Form.useForm()
  // 正在编辑的 item key 值
  const [editingKey, setEditingKey] = useState<number | undefined>()

  // 编辑单元格
  const edit = useCallback(
    (record?: Material, index?: number) => {
      // 编辑时赋值
      tableForm.setFieldsValue({
        id: record?.id,
        amount: record?.amount,
        material: `${record?.id?.trim() ?? ''}__${record?.material?.trim() ?? ''}`,
        model: record?.model,
        action: record?.action as ActionType,
      } as Material)

      setEditingKey(index)
    },
    [tableForm]
  )

  // 取消编辑单元格
  const cancel = useCallback(() => {
    // 取消时，如果新增则删除，如果编辑则取消更改
    setEditingKey(undefined)
  }, [])

  // 保存编辑单元格
  const save = useCallback(
    (id, index) => {
      const { amount, material, action } = tableForm.getFieldsValue()

      const [mname, model] = getRealValue(material)

      setData(d =>
        d.map((i, _index) => {
          if (_index !== index) {
            return i
          }
          return {
            amount,
            model,
            id,
            material: mname,
            action,
          } as Material
        })
      )

      tableForm.resetFields()
      setEditingKey(undefined)
    },
    [tableForm]
  )

  // 删除单元格
  const del = useCallback(index => {
    setData(d => d.filter((i, _index) => _index !== index))
  }, [])

  // 单元格逻辑
  const emit = useCallback<CellEmit>(
    (type, id, record, index) => {
      switch (type) {
        case 'edit':
          edit(record, index)
          break
        case 'cancel':
          cancel()
          break
        case 'del':
          del(index)
          break
        case 'save':
          save(id, index)
          break
        default:
          break
      }
    },
    [cancel, edit, save, del]
  )
  const onOK = () => {
    const { attachment, attachment_desc, remark } = form.getFieldsValue()

    const normalizeAttachment = attachment?.map((file: UploadFile) => file.id)

    if (data && id) {
      const subData: MaterialsInput[] = data.map(item => {
        return {
          id: item.id,
          material: item.material,
          amount: item.amount,
          model: item.model,
          action: item.action,
        }
      })

      if (subData) {
        submit(subData, id, normalizeAttachment, attachment_desc, remark)
          .then(() => {
            message.success('修改成功')
            router.replace({
              pathname: `/order/material/${id}`,
              query: { name: router.query.name },
            })
            hideModal()
          })
          .catch(() => {
            message.error('修改失败')
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
    <ModalView orderId={id ?? ''} OKText='编辑' onOK={onOK} loading={loading}>
      <EditForm orderId={id ?? ''} onSubmit={onSubmit} />
      <EditMaterialsTable data={data} editingKey={editingKey} emit={emit} form={tableForm} />
      <RemarkFrom form={form} />
    </ModalView>
  )
}
export default EditModalView
