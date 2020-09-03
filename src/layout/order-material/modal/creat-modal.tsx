import React, { useState, ReactNode } from 'react'

import CreateForm from '../form/creat-form'
import { KTable, useGlobalModal, message } from '../../../components'
import modalColumns from '../table/create-modal-column'
import ModalView from './modal'
import { Material } from '../material'
import { useCreateOrderMaterialsApi } from '../service'
import { MaterialsInput } from 'src/services'
import { useRouter } from 'next/router'
export interface CreateModalViewProps {
  id?: string
  children?: ReactNode
}
function CreateModalView({ id }: CreateModalViewProps): React.ReactElement {
  const { hideModal } = useGlobalModal()
  const router = useRouter()
  const [data, setData] = useState<Material[]>([])
  const [current, setCurrent] = useState(1)

  const { submit, loading } = useCreateOrderMaterialsApi()
  const onOK = () => {
    if (data && id) {
      const subData: MaterialsInput[] = data.map(item => {
        return {
          material: item.material,
          amount: parseInt(item.amount),
          model: item.model,
          action: item.action,
        }
      })
      if (subData) {
        submit(subData, id)
          .then(() => {
            message.success('创建成功')
            router.push(`/order/material/${id}`)
            hideModal()
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
  const onPageChange = (page: number) => {
    setCurrent(page)
  }
  return (
    <ModalView orderId={id ?? ''} OKText='创建' onOK={onOK} loading={loading}>
      <CreateForm onSubmit={onSubmit} />
      <KTable<Material>
        data={data}
        columns={modalColumns}
        total={data.length ?? 0}
        currentPage={current ?? 1}
        rowKey={item => item.id}
        pageSize={10}
        onPageChange={onPageChange}
      />
    </ModalView>
  )
}
export default CreateModalView
