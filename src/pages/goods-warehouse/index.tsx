import React from 'react'
import { withLayout } from '../../layout'
import GoodsWarehouseHeader from './layout/header'
import { KTable } from '../../components'
import columns from './layout/table/column'
function GoodsWarehouse() {
  return (
    <div>
      <GoodsWarehouseHeader />
      <KTable data={[]} columns={columns} total={10} currentPage={1} rowKey={item => item} />
    </div>
  )
}
export default withLayout(GoodsWarehouse)
