import React, { useState, useCallback } from 'react'

import ModalView from './modal'
import { useGlobalModal, message, getRealValue } from '../../../components'
import EditForm, { RemarkFrom } from '../form/edit-from'
import { Material } from '../material'
import { useRouter } from 'next/router'
import { MaterialsInput, UploadFile } from 'src/services'
import { useUpdateOrderMaterialsApi } from '../service'
import { Form } from 'antd'
import CreateMaterialsTable, { CellEmit } from '../table/create-material-table'

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
  const [editingKey, setEditingKey] = useState<string | undefined>('')
  // 判断是否是新增
  const [isAdding, setIsAdding] = useState(false)

  // 编辑单元格
  const edit = useCallback(
    (id?: string) => {
      // 编辑时赋值
      tableForm.setFieldsValue({ amount: '', material: '', model: '' } as Material)
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
      const { amount, material, model } = tableForm.getFieldsValue()

      const [mid, mname] = getRealValue(material)

      setData(d =>
        d.map(i => {
          if (i?.id !== key) {
            return i
          }
          return {
            amount,
            model,
            id: key,
            material: {
              id: mid,
              name: mname,
            },
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
  const onOK = () => {
    const { attachment, attachment_desc, remark } = form.getFieldsValue()

    const normalizeAttachment = attachment?.map((file: UploadFile) => file.id)

    if (data && id) {
      const subData: MaterialsInput[] = data.map(item => {
        return {
          id: item.id,
          material: item.material,
          amount: parseInt(item.amount),
          model: item.model,
          action: item.action,
        }
      })

      if (subData) {
        submit(subData, id, normalizeAttachment, attachment_desc, remark)
          .then(() => {
            message.success('修改成功')
            router.push(`/order/material/${id}`)
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
      {/* <KTable<Material>
        data={(data ?? []) as Material[]}
        columns={modalColumns}
        total={10}
        currentPage={1}
        rowKey={item => item.id}
        pagination={false}
      /> */}
      <CreateMaterialsTable data={data} editingKey={editingKey} emit={emit} form={tableForm} />
      <RemarkFrom form={form} />
    </ModalView>
  )
}
export default EditModalView
