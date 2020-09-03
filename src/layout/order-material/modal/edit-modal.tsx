import React, { useState } from 'react'

import ModalView from './modal'
import { KTable, useGlobalModal, message } from '../../../components'
import modalColumns from '../table/edit-modal-column'
import EditForm, { RemarkFrom } from '../form/edit-from'
import { Material, Remark } from '../material'
import { useRouter } from 'next/router'
import { MaterialsInput } from 'src/services'
import { useUpdateOrderMaterialsApi } from '../service'
import { Form } from 'antd'
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

  const onOK = () => {
    const { attachment, attachment_desc, remark } = form.getFieldsValue()

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
        submit(subData, id, attachment, attachment_desc, remark)
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
      <KTable<Material>
        data={(data ?? []) as Material[]}
        columns={modalColumns}
        total={10}
        currentPage={1}
        rowKey={item => item.id}
        pagination={false}
      />
      <RemarkFrom form={form} />
    </ModalView>
  )
}
export default EditModalView
