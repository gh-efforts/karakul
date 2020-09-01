import React from 'react'

import CreateForm from '../form/creat-form'
import { KTable, useGlobalModal } from '../../../components'
import { OrderMaterial } from '../../../services'
import modalColumns from '../table/create-modal-column'
import ModalView from './modal'

function CreateModalView(): React.ReactElement {
  const { hideModal } = useGlobalModal()

  const onOK = () => {
    hideModal()
  }

  return (
    <ModalView orderId={'123'} OKText='创建' onOK={onOK}>
      <CreateForm />
      <KTable<OrderMaterial>
        data={[] as OrderMaterial[]}
        columns={modalColumns}
        total={10}
        currentPage={1}
        rowKey={item => item.id}
        pagination={false}
      />
    </ModalView>
  )
}
export default CreateModalView
