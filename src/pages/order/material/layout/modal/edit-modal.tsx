import React from 'react'

import ModalView from './modal'
import { OrderMaterial } from '../../../../../services'
import { KTable, useGlobalModal } from '../../../../../components'
import modalColumns from '../table/edit-modal-column'
import EditForm, { RemarkFrom } from '../form/edit-from'
function EditModalView(): React.ReactElement {
  const { hideModal } = useGlobalModal()

  const onOK = () => {
    hideModal()
  }
  return (
    <ModalView orderId={'123'} OKText='编辑' onOK={onOK}>
      <EditForm />
      <KTable<OrderMaterial>
        data={[] as OrderMaterial[]}
        columns={modalColumns}
        total={10}
        currentPage={1}
        rowKey={item => item.id}
        pagination={false}
      />
      <RemarkFrom />
    </ModalView>
  )
}
export default EditModalView
