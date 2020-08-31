import React from 'react'
import ProductTypesHeader from './layout/header'
import { withLayout } from '../../layout'
import { KTable } from 'src/components'
import columns from './layout/table/columns'
function ProductTypes() {
  return (
    <div>
      <ProductTypesHeader />
      <KTable data={[]} columns={columns} total={10} currentPage={1} rowKey={item => item} />
    </div>
  )
}
export default withLayout(ProductTypes)
