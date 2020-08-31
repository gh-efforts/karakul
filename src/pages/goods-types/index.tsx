import React from 'react'
import GoodsTypesHeader from './layout/header'
import { withLayout } from '../../layout'
import { KTable } from 'src/components'
import columns from './layout/table/columns'
function GoodsTypes() {
  return (
    <div>
      <GoodsTypesHeader />
      <KTable data={[]} columns={columns} total={10} currentPage={1} rowKey={item => item} />
    </div>
  )
}
export default withLayout(GoodsTypes)
